const fs = require('fs');

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.nextId = 1;

      this.loadFromFile();
    }
  
    addProduct(title, description, price, thumbnail, code, stock) { 
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

  
  
  const productManager = new ProductManager('ruta_del_archivo.json');
  
  productManager.addProduct("Producto 1", "Descripción 1", 10.50, "imagen1.jpg", "P001", 40);
  productManager.addProduct("Producto 2", "Descripción 2", 12.50, "imagen2.jpg", "P002", 50);
  
  const allProducts = productManager.getProducts();
  console.log("Todos los productos:", allProducts);
  
  productManager.saveToFile();
  
  const productById = productManager.getProductById(1);
  console.log("Producto por ID:", productById);
  
  const nonExistingProduct = productManager.getProductById(4);
  