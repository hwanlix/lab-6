const Product = require("./Product");

class Cart {
  constructor() {}

  static #items = [];

  static add(productName) {
    const product = Product.findByName(productName);

    if (!product) {
      throw new error(`Product '${productName}' not found.`);
    }

    if (!this.#items.length) {
      this.#items.push({ product, quantity: 1 });

      return;
    }

    const existingProduct = this.#items.find(
      (item) => item.product.name === productName
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.#items.push({ product, quantity: 1 });
    }
  }

  static getItems() {
    return this.#items;
  }

  static getProductsQuantity() {
    if (!this.#items?.length) {
      return 0;
    }

    return this.#items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  static getTotalPrice() {
    return this.#items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  }

  static clearCart() {
    this.#items = [];
  }
}

module.exports = Cart;
