import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from ".routes/views.router.js";
import { Server } from "socket.io";

const app = express();
const httpServer = app.listen(8080,()=>console.log("Escuchando a traves del puerto 8080"));


const socketServer = new Server(httpServer);

app.engine("handlebars",handlebars.engine());
app.set("views",__dirname+"/views");
app.set("views engine","handlebars");
app.use(express.static(__dirname+"/src"));
app.use("/",viewsRouter);


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


socketServer.on("connection",socket=>{
    console.log("Nuevo cliente conectado")
})