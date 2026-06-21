const axios = require('axios');
const momoConfig = require('../config/momo');
const httpClient = require('../utils/httpClient');
const { createSignature, verifyMoMoSignature } = require('../utils/signature');
const logger = require('../config/logger');

exports.createPayment = async (req, res) => {
  try {
    const { orderId, amount, orderInfo, redirectUrl, ipnUrl } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ success: false, message: 'Missing orderId or amount' });
    }

    // ALWAYS return the mock URL in development mode for instant local testing!
    if (process.env.NODE_ENV === 'development') {
      logger.info('Development mode: Redirecting directly to local Mock Payment URL');
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      return res.status(200).json({
        success: true,
        data: {
          payUrl: `${frontendUrl}/payment/mock?orderId=${orderId}&amount=${amount}`,
          orderId,
        }
      });
    }

    const requestId = `${orderId}_${Date.now()}`;
    const finalOrderInfo = orderInfo || `Payment for order ${orderId}`;
    const finalIpnUrl = ipnUrl || momoConfig.ipnUrl;
    const finalRedirectUrl = redirectUrl || momoConfig.redirectUrl;

    const rawSignature = [
      `accessKey=${momoConfig.accessKey}`,
      `amount=${Number(amount)}`,
      `extraData=`,
      `ipnUrl=${finalIpnUrl}`,
      `orderId=${orderId}`,
      `orderInfo=${finalOrderInfo}`,
      `partnerCode=${momoConfig.partnerCode}`,
      `redirectUrl=${finalRedirectUrl}`,
      `requestId=${requestId}`,
      `requestType=captureWallet`
    ].join('&');

    const signature = createSignature(rawSignature, momoConfig.secretKey);

    const momoPayload = {
      partnerCode: momoConfig.partnerCode,
      requestId,
      amount: Number(amount),
      orderId,
      orderInfo: finalOrderInfo,
      redirectUrl: finalRedirectUrl,
      ipnUrl: finalIpnUrl,
      lang: 'vi',
      extraData: '',
      requestType: 'captureWallet',
      signature,
    };

    const momoResponse = await httpClient.post(momoConfig.endpoint, momoPayload);

    if (momoResponse && momoResponse.resultCode === 0) {
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
    
    if (process.env.NODE_ENV === 'development') {
      logger.info('MoMo returned error code. Falling back to local Mock Payment URL for development.');
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      return res.status(200).json({
        success: true,
        data: {
          payUrl: `${frontendUrl}/payment/mock?orderId=${orderId}&amount=${amount}`,
          orderId,
        },
      });
    }

    return res.status(400).json({
      success: false,
      message: momoResponse.message || 'MoMo payment creation failed',
      resultCode: momoResponse.resultCode,
      data: momoResponse,
    });
  } catch (error) {
    logger.error('createPayment error', { error: error.message });
    if (process.env.NODE_ENV === 'development') {
      logger.info('Falling back to local Mock Payment URL for development testing');
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
      return res.status(200).json({
        success: true,
        data: {
          payUrl: `${frontendUrl}/payment/mock?orderId=${orderId}&amount=${amount}`,
          orderId,
        }
      });
    }
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.ipnHandler = async (req, res) => {
  try {
    const params = { ...req.body };
    logger.info('MoMo IPN received', { params });

    let isValid = verifyMoMoSignature(params, momoConfig.secretKey);
    if (process.env.NODE_ENV === 'development') {
      logger.info('Development mode: bypassing MoMo signature verification');
      isValid = true;
    }

    if (!isValid) {
      logger.warn('Invalid MoMo signature');
      return res.status(200).json({ resultCode: 1, message: 'Invalid signature' });
    }

    const { orderId, resultCode, transId, amount } = params;

    const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3003/api/orders';
    const internalKey = process.env.INTERNAL_API_KEY || 'internal123';

    if (resultCode === 0 || resultCode === '0') {
      try {
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
      } catch (err) {
        logger.error('Failed to update payment status in order-service:', err.message);
      }
    } else {
      try {
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
      } catch (err) {
        logger.error('Failed to update payment status in order-service:', err.message);
      }
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
    let isValid = verifyMoMoSignature(params, momoConfig.secretKey);
    if (process.env.NODE_ENV === 'development') {
      logger.info('Development mode: bypassing MoMo Return signature verification');
      isValid = true;
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';

    if (!isValid) {
      logger.warn('Invalid MoMo Return signature');
      return res.redirect(`${frontendUrl}/payment/return?status=failed&message=Invalid+signature`);
    }

    const status = resultCode === 0 || resultCode === '0' ? 'success' : 'failed';
    const transId = req.query.transId;
    const amount = req.query.amount;

    const orderServiceUrl = process.env.ORDER_SERVICE_URL || 'http://order-service:3003/api/orders';
    const internalKey = process.env.INTERNAL_API_KEY || 'internal123';

    try {
      await axios.patch(
        `${orderServiceUrl}/${orderId}/payment-status`,
        {
          paymentStatus: status === 'success' ? 'paid' : 'unpaid',
          paymentTransactionId: transId,
          paidAmount: amount,
          failureReason: status === 'failed' ? message : undefined,
        },
        { headers: { 'x-internal-key': internalKey } }
      );
    } catch (err) {
      logger.error('Failed to update payment status in order-service during return:', err.message);
    }

    return res.redirect(`${frontendUrl}/payment/return?status=${status}&orderId=${orderId}&message=${encodeURIComponent(message || '')}`);
  } catch (error) {
    logger.error('paymentReturn error', { error: error.message });
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:8080';
    return res.redirect(`${frontendUrl}/payment/return?status=failed&message=${encodeURIComponent(error.message)}`);
  }
};
