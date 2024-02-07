const fs = require('fs');


class ProductManager {
  static id = 0;
    constructor(path) {
      this.path = path;
      this.products = [];
      this.nextId = 1;

      this.loadFromFile();
    }
  
   async addProduct(title, description, price, thumbnail, code, stock) { 

      let content = await fs.promises.readFile(this.path, "utf-8");
      let {products} = JSON.parse(content);

      product.id = ++ProductManager.id;
      products.push(products);

      await fs.promises.writeFile(this.path, JSON.stringify(products));

      if (!title || !description || !price || !thumbnail || !code || !stock){
          console.error("Todos los campos son obligatorios.");
          return;
      }
  
      if (this.products.some(product => product.code === code)) {
          console.error("El código ya está en uso. Introduce un código único.");
          return;
      }
  
      const newProduct = {
          id: this.nextId++,
          title,
          description,
          price,
          thumbnail,
          code,
          stock
      };
  
      this.products.push(newProduct);
      console.log("El Producto ha sido agregado correctamente:", newProduct);
    }
  
    getProducts() {
      return this.products;
    }


  
    getProductById(id) {
      const product = this.products.find(product => product.id === id)
      if (!product) {
        console.error('El Producto no ha sido encontrado. ID:', id);
        return null;
      } 
      return product;
    }
  
    saveToFile() {

      const data = JSON.stringify(this.products, null, 2);
      
      fs.writeFileSync(this.path, data, 'utf8');
      console.log(`Datos guardados en el archivo: ${this.path}`);
    }
  
    loadFromFile() {
  
      try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
        console.log(`Datos cargados desde el archivo: ${this.path}`);
      } catch (error) {
        console.error('Error al cargar datos desde el archivo:', error.message);
      }
      
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
    
        if (index === -1) {
          console.error('El Producto no ha sido encontrado. ID:', id);
          return;
        }
    
        const deletedProduct = this.products.splice(index, 1)[0];
        console.log('Producto eliminado:', deletedProduct);
    
        this.saveToFile();
      }
      
      updateProduct(id, updatedData){
      const productIndex = this.products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        console.error('El Producto no ha sido encontrado. ID:', id);
        return;
      }
  
      const updatedProduct = { ...this.products[productIndex], ...updatedData };
      this.products[productIndex] = updatedProduct;
  
      console.log('Producto actualizado:', updatedProduct);
  
      this.saveToFile();
    }
    }
      
  module.exports = ProductManager;