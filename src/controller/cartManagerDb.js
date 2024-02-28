const CartModel = require("../models/cart.model.js");
const ProductModel = require("../models/product.model.js");

class CartManagerDb {
  async createCart() {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      return newCart;
    } catch (err) {
      console.log("Error la crear cart:", err);
      throw err;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartModel.findById(cartId)
        .populate("products.product")
        .exec();
      if (!cart) {
        console.log("No se encontro el carrito por id");
        throw "Cart not found";
      }
      console.log("Cart encontrado");
      return cart;
    } catch (err) {
      console.log("Error al buscar cart por id:", err);
      throw err;
    }
  }

  async addToCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      if (!cart) {
        throw "Cart to update not found";
      }
      const productExists = cart.products.find(
        (product) => product.product.toString() == productId
      );
      if (productExists) {
        productExists.quantity++;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
      cart.markModified("products");
      await cart.save();
      return cart;
    } catch (err) {
      console.log("Error al agregar al cart:", err);
      throw err;
    }
  }
}

module.exports = CartManagerDb;