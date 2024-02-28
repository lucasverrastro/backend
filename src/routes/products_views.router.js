const express = require("express");
const router = express.Router();
const socket = require("socket.io");
const ProductManagerDb = require("../controller/productManagerDb");
const productManagerDb = new ProductManagerDb();

router.use(express.static("./src/public"));

router.get("/", async (req, res) => {
  const products = await productManagerDb.getProductsLean();
  res.render("products",  {products: products, active: {products: true }} );
});

// Se agrega al req desde app.js la variable httpServer. Se toma aca de manera
// que solo se inicia la conexion con el websocker en esta ruta.
router.get("/realtimeproducts", async (req, res) => {
  var httpServer = req.httpServer;
  const io = socket(httpServer);

  // controller de fs comentado, se reemplazo por el manager de mongoDb
  // const productManager = new ProductManager("./src/models/products.json");

  try {
    io.on("connection", async (socket) => {
      console.log("Initiating websocket connection");
      // Mandar productos
      socket.emit("products", await productManagerDb.getProducts());

      // Borrar productos
      socket.on("deleteProduct", async (id) => {
        await productManagerDb.deleteProduct(id);
        io.sockets.emit("products", await productManagerDb.getProducts());
      });

      // Agregar productos
      socket.on("addProduct", async (newProduct) => {
        const addResponse = await productManagerDb.addProduct(newProduct);
        if (addResponse == "Product code already exists, Product code must be unique") {
          io.sockets.emit("products", false);
        }
        const newProducts = await productManagerDb.getProducts() 
        io.sockets.emit("products", newProducts);
      });
    });
    res.render("realtimeproducts", {active: {rProducts: true }});
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});


module.exports = router;