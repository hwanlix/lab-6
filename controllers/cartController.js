const Product = require("../models/Product");
const Cart = require("../models/Cart");

const { STATUS_CODE } = require("../constants/statusCode");

exports.addProductToCart = (request, response) => {
  Product.add(request.body);
  Cart.add(request.body.name);

  response.status(STATUS_CODE.FOUND).redirect("/products/new");
};

exports.getProductsCount = () => {
  return Cart.getProductsQuantity();
};
