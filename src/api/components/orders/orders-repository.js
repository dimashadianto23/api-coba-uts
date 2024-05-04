const { Order } = require('../../../models');

async function createOrder(customerName, product, quantity, createdAt) {
  return Order.create({ customerName, product, quantity, createdAt });
}

async function getOrders() {
  return Order.find({});
}

module.exports = {
  createOrder,
  getOrders,
};