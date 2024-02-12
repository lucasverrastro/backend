// Importar Express y crear una instancia de la aplicación
const express = require('express');
const app = express();
const PORT = 8080; 


app.use(express.json());


let products = [
    { id: 1, title: 'Product 1', description: "", code:"", price, status, stock, category, thumbnails },
    { id: 2, title: 'Product 2', description: "", code:"", price, status, stock, category, thumbnails },
    { id: 3, title: 'Product 3', description: "", code:"", price, status, stock, category, thumbnails }
];

let cart = [];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/cart/add', (req, res) => {
    const productId = req.body.productId;
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        res.status(201).json({ message: 'Producto añadido al carrito', cart });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

app.get('/cart', (req, res) => {
    res.json(cart);
});

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
