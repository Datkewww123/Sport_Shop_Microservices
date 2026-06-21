const crypto = require('crypto');
const momoConfig = require('../config/momo');

function createSignature(rawSignature, secretKey) {
  return crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');
}

function verifyMoMoSignature(params, secretKey) {
  const receivedSignature = params.signature;

  const accessKey = params.accessKey || momoConfig.accessKey;
  const amount = params.amount !== undefined ? params.amount : '';
  const extraData = params.extraData !== undefined ? params.extraData : '';
  const message = params.message !== undefined ? params.message : '';
  const orderId = params.orderId !== undefined ? params.orderId : '';
  const orderInfo = params.orderInfo !== undefined ? params.orderInfo : '';
  const orderType = params.orderType !== undefined ? params.orderType : '';
  const partnerCode = params.partnerCode !== undefined ? params.partnerCode : '';
  const payType = params.payType !== undefined ? params.payType : '';
  const requestId = params.requestId !== undefined ? params.requestId : '';
  const responseTime = params.responseTime !== undefined ? params.responseTime : '';
  const resultCode = params.resultCode !== undefined ? params.resultCode : '';
  const transId = params.transId !== undefined ? params.transId : '';

  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&message=${message}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&partnerCode=${partnerCode}&payType=${payType}&requestId=${requestId}&responseTime=${responseTime}&resultCode=${resultCode}&transId=${transId}`;

  const expectedSignature = createSignature(rawSignature, secretKey);
  return expectedSignature === receivedSignature;
}

module.exports = { createSignature, verifyMoMoSignature };
