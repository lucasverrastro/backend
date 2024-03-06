const ProductModel = require("../models/product.model");

class ProductManagerDb {
  async addProduct(product) {
    try {
      if (!this.checkNewProduct(product)) {
        throw "All fields are required. Product invalid";
      }
      const productExists = await ProductModel.findOne({ code: product.code });
      if (productExists) {
        return "Product code already exists, Product code must be unique";
      }
      const newProduct = new ProductModel({
        ...product,
        status: true,
        thumbnails: product.thumbnails || [],
      });
      newProduct.save();
      return newProduct;
    } catch (err) {
      console.log("Error al agregar un producto:", err);
      throw err;
    }
  }

  async getProducts() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (err) {
      throw err;
    }
  }

  async getProductsLean() {
    try {
      const products = await ProductModel.find().lean();
      return products;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        throw "Product not found";
      }
      console.log("Producto encontrado");
      return product;
    } catch (err) {
      console.log("Error al buscar producto:", err);
      throw err;
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const newProduct = await ProductModel.findByIdAndUpdate(
        id,
        updatedProduct
      );
      if (!newProduct) {
        throw "Product to update not found";
      }
      console.log("Producto actualizado");
      return newProduct;
    } catch (err) {
      console.log("Error al actualizar producto:", err);
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);
      if (!deleteProduct) {
        throw "Product to delete not found";
      }
      console.log("Producto eliminado");
    } catch (err) {
      console.log("Error al actualizar producto:", err);
      throw err;
    }
  }

  checkNewProduct(product) {
    const fields = [
      "title",
      "description",
      "price",
      "code",
      "stock",
      "category",
    ];
    if (
      fields.every((e) => {
        return !!product[e];
      })
    ) {
      return true;
    }
    return false;
  }
}

module.exports = ProductManagerDb;
