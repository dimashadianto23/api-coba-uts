const orderRepository = require('./orders-repository');
const productRepository = require('../products/products-repository');

async function createOrder(customerName, product, quantity) {
  const existingProduct = await productRepository.getProduct(product);

  if (!existingProduct) {
    return null;
  }

  if (existingProduct.quantity < quantity) {
    return null;
  }

  existingProduct.quantity -= quantity;

  await existingProduct.save();

  return orderRepository.createOrder(customerName, product, quantity);
}

async function listOrders() {
  return orderRepository.getOrders();
}

module.exports = {
  createOrder,
  listOrders,
};