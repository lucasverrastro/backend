const ProductManager = require("./productManager");
const fs = require('fs');
const manager = new ProductManager('./src/products.json');
  
async function cargarArchivos(){
  await manager.addProduct("Producto 1", "Descripción 1", 10.50, "imagen1.jpg", "P001", 40);
  await manager.addProduct("Producto 2", "Descripción 2", 12.50, "imagen2.jpg", "P002", 50);
}
cargarArchivos();

const limit = parseInt(req.query.limit);
let products = manager.getProducts();

if (!isNaN(limit)) {
  products = products.slice(0, limit); 
}
res.json(products)

server.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid)
    const product = productManager.getProductById(productId)

    if (product) {
      res.json({ product })
    } else {
      res.status(404).json({ error: 'Producto no encontrado' })
    }
  } catch (error) {
    console.error('Error al obtener producto:', error.message)
    res.status(500).json({ error: 'Server Error' })
  }
}) 


const carritoJSON = fs.readFileSync('carrito.json');
const carrito = JSON.parse(carritoJSON);

const nuevoProducto = {
  "id": 3,
  "quantity":1
};

carrito.carrito.push(nuevoProducto);


fs.writeFileSync('carrito.json', JSON.stringify(carrito, null, 2));

console.log('Producto agregado al carrito con éxito.');


const allProducts = manager.getProducts();
console.log("Todos los productos:", allProducts);

manager.saveToFile();

const productById = manager.getProductById(1);
console.log("Producto por ID:", productById);

const nonExistingProduct = manager.getProductById(4);