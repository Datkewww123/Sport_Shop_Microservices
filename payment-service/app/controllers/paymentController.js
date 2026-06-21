const momoConfig = require('../config/momo');
const { createSignature, verifyMoMoSignature } = require('../utils/signature');
const httpClient = require('../utils/httpClient');
const axios = require('axios');

const logger = require('../config/logger');

exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, orderInfo, redirectUrl, ipnUrl } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ success: false, message: 'Missing orderId or amount' });
    }

    const requestId = `${orderId}_${Date.now()}`;
    const orderGroupId = orderId;

    const rawSignature = `accessKey=${momoConfig.accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl || momoConfig.ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo || ''}&partnerCode=${momoConfig.partnerCode}&redirectUrl=${redirectUrl || momoConfig.redirectUrl}&requestId=${requestId}&requestType=captureWallet`;

    const signature = createSignature(rawSignature, momoConfig.secretKey);

    const momoPayload = {
      partnerCode: momoConfig.partnerCode,
      partnerName: 'SOAP Shop',
      storeId: 'SOAP',
      requestId,
      amount,
      orderId,
      orderInfo: orderInfo || `Payment for order ${orderId}`,
      redirectUrl: redirectUrl || momoConfig.redirectUrl,
      ipnUrl: ipnUrl || momoConfig.ipnUrl,
      lang: 'vi',
      extraData: '',
      requestType: 'captureWallet',
      signature,
      orderGroupId,
    };

    const momoResponse = await httpClient.post(momoConfig.endpoint, momoPayload);

    if (momoResponse.resultCode === 0) {
      return res.status(200).json({
        success: true,
        data: {
          payUrl: momoResponse.payUrl,
          deeplink: momoResponse.deeplink,
          qrCodeUrl: momoResponse.qrCodeUrl,
          orderId,
        },
      });
    }

    logger.warn('MoMo create payment failed', { resultCode: momoResponse.resultCode, message: momoResponse.message });
    return res.status(400).json({
      success: false,
      message: momoResponse.message || 'MoMo payment creation failed',
      resultCode: momoResponse.resultCode,
    });
  } catch (error) {
    logger.error('createPayment error', { error: error.message });
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.ipnHandler = async (req, res) => {
  try {
    const params = { ...req.body };

    logger.info('MoMo IPN received', { params });

    const isValid = verifyMoMoSignature(params, momoConfig.secretKey);

    if (!isValid) {
      logger.warn('Invalid MoMo signature');
      return res.status(200).json({ resultCode: 1, message: 'Invalid signature' });
    }

    const { orderId, resultCode, transId, amount } = params;

    const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3003/api/orders';
    const internalKey = process.env.INTERNAL_API_KEY || 'internal123';

    if (resultCode === 0) {
      await axios.patch(
        `${orderServiceUrl}/${orderId}/payment-status`,
        {
          paymentStatus: 'paid',
          paymentTransactionId: transId,
          paidAmount: amount,
        },
        { headers: { 'x-internal-key': internalKey } }
      );
      logger.info(`Payment success for order ${orderId}, transId: ${transId}`);
    } else {
      await axios.patch(
        `${orderServiceUrl}/${orderId}/payment-status`,
        {
          paymentStatus: 'unpaid',
          paymentTransactionId: transId,
          paidAmount: amount,
          failureReason: params.message || 'Payment failed',
        },
        { headers: { 'x-internal-key': internalKey } }
      );
      logger.warn(`Payment failed for order ${orderId}, resultCode: ${resultCode}`);
    }

    return res.status(200).json({ resultCode: 0, message: 'OK' });
  } catch (error) {
    logger.error('IPN handler error', { error: error.message });
    return res.status(200).json({ resultCode: 2, message: error.message });
  }
};

exports.paymentReturn = async (req, res) => {
  try {
    const { orderId, resultCode, message } = req.query;
    const params = { ...req.query };
    const isValid = verifyMoMoSignature(params, momoConfig.secretKey);

    if (!isValid) {
      return res.redirect(`/payment/return?status=failed&message=Invalid+signature`);
    }

    const status = resultCode === '0' ? 'success' : 'failed';
    return res.redirect(`/payment/return?status=${status}&orderId=${orderId}&message=${encodeURIComponent(message || '')}`);
  } catch (error) {
    logger.error('paymentReturn error', { error: error.message });
    return res.redirect(`/payment/return?status=failed&message=${encodeURIComponent(error.message)}`);
  }
};
