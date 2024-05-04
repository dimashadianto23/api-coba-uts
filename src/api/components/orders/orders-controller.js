const orderService = require('./orders-service');

async function createOrder(req, res, next) {
  try {
    const { customerName, product, quantity } = req.body;
    const createdAt = new Date();

    const order = await orderService.createOrder(customerName, product, quantity, createdAt);
    
    if (!order) {
      return res.status(400).json({ message: 'Failed to place order. Product may not exist or insufficient quantity' });
    }

    res.status(201).json({ message: 'Order placed successfully', createdAt, product, quantity });
  } catch (error) {
    next(error);
  }
}

async function listOrders(req, res, next) {
  try {
    const orders = await orderService.listOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  listOrders,
};