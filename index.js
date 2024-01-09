class ProductManager {
    static id = 0; 
    constructor (products){
       
        this.products= products;
        ProductManager.id++
        this.id = ProductManager.id;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
}
console.log (ProductManager)