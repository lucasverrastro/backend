const express = require("express")

const server = express();

server.get("/", (req, res)=>{
    res.send("Hola Mundo")
})

server.get("/products", (req, res) => {
    const limit = req.query.limit;

    let productsToSend = productManager.getProducts(limit);
    res.json(productsToSend);
})

server.listen(8080, ()=>console.log("El servidor está corriendo en el puerto 8080"))

server.get("/products", (req, res)=>{
    let objeto = {title, description, price, thumbnail, code, stock}
    res.send()
})