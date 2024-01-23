const ProductManager = require("./productManager");

const manager = new ProductManager('./src/products.json');
  
async function cargarArchivos(){
  await manager.addProduct("Producto 1", "Descripción 1", 10.50, "imagen1.jpg", "P001", 40);
  await manager.addProduct("Producto 2", "Descripción 2", 12.50, "imagen2.jpg", "P002", 50);
}
cargarArchivos();

const allProducts = manager.getProducts();
console.log("Todos los productos:", allProducts);

manager.saveToFile();

const productById = manager.getProductById(1);
console.log("Producto por ID:", productById);

const nonExistingProduct = manager.getProductById(4);