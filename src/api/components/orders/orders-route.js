const express = require('express');
const ordersController = require('./orders-controller');
const ordersValidator = require('./orders-validator');
const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');

const route = express.Router();

module.exports = (app) => {
  app.use('/orders', route);

  route.post('/', authenticationMiddleware, celebrate(ordersValidator.createOrder), ordersController.createOrder);
  route.get('/', authenticationMiddleware, ordersController.listOrders);

};