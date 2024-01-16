class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
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
      return  console.error('El Producto no ha sido encontrado. ID:', id)
    } 
    return product
     }
    }


  const productManager = new ProductManager();

  productManager.addProduct("Producto 1", 10.50, "imagen1.jpg", "P001", 40);
  productManager.addProduct("Producto 2", 12.50, "imagen2.jpg", "P002", 50);

  const allProducts = productManager.getProducts();
  console.log("Todos los productos:", allProducts);
  
  const productById = productManager.getProductById(1);
  console.log("Producto por ID:", productById);

  const nonExistingProduct = productManager.getProductById(4);