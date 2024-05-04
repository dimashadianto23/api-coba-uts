const { Product } = require('../../../models');

/**
 * Create new product
 * @param {string} name - Product Name
 * @param {string} description - Product Description
 * @param {number} price - Product Price
 * @param {string} category - Product Category
 * @param {number} quantity - Product Quantity
 * @returns {Promise}
 */
async function createProduct(name, description, price, category, quantity) {
  return Product.create({
    name,
    description,
    price,
    category,
    quantity
  });
}

/**
 * Get a list of products
 * @returns {Promise}
 */
async function getProducts() {
  return Product.find({});
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function getProduct(id) {
  return Product.findById(id);
}

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {string} name - Product Name
 * @param {string} description - Product Description
 * @param {number} price - Product Price
 * @param {string} category - Product Category
 * @param {number} quantity - Product Quantity
 * @returns {Promise}
 */
async function updateProduct(id, name, description, price, category, quantity) {
  return Product.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        description,
        price,
        category,
        quantity,
      },
    }
  );
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
};