const Redis = require('ioredis');

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
const CHANNEL = 'order:events';

let publisher = null;

function getPublisher() {
  if (!publisher) {
    publisher = new Redis(REDIS_URL);
    publisher.on('error', (err) => console.error('Redis publisher error:', err));
  }
  return publisher;
}

async function publishEvent(eventType, data) {
  try {
    const pub = getPublisher();
    const message = JSON.stringify({ type: eventType, data, timestamp: new Date().toISOString() });
    await pub.publish(CHANNEL, message);
    console.log(`[EventBus] Published ${eventType}`, { orderId: data.orderId });
  } catch (err) {
    console.error(`[EventBus] Failed to publish ${eventType}:`, err.message);
  }
}

async function publishOrderCreated(order) {
  await publishEvent('ORDER_CREATED', {
    orderId: order._id.toString(),
    orderCode: order.orderCode,
    userEmail: order.userEmail,
    customerName: order.shippingAddress?.fullName,
    total: order.total,
    paymentMethod: order.paymentMethod,
    items: order.items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
    shippingAddress: order.shippingAddress,
    createdAt: order.createdAt,
  });
}

async function publishOrderPaid(order) {
  await publishEvent('ORDER_PAID', {
    orderId: order._id.toString(),
    orderCode: order.orderCode,
    userEmail: order.userEmail,
    customerName: order.shippingAddress?.fullName,
    total: order.total,
    paymentMethod: order.paymentMethod,
    paymentTransactionId: order.paymentTransactionId,
    paidAt: order.paidAt,
  });
}

async function publishOrderDelivered(order) {
  await publishEvent('ORDER_DELIVERED', {
    orderId: order._id.toString(),
    orderCode: order.orderCode,
    userEmail: order.userEmail,
    customerName: order.shippingAddress?.fullName,
    deliveredAt: order.deliveredAt,
  });
}

async function publishOrderCancelled(order) {
  await publishEvent('ORDER_CANCELLED', {
    orderId: order._id.toString(),
    orderCode: order.orderCode,
    userEmail: order.userEmail,
    customerName: order.shippingAddress?.fullName,
    cancelReason: order.cancelReason,
    cancelledAt: order.cancelledAt,
  });
}

module.exports = {
  publishOrderCreated,
  publishOrderPaid,
  publishOrderDelivered,
  publishOrderCancelled,
};
