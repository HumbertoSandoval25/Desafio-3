import express from "express";
import ProductManager from "./productManager.js"

// Crear una instancia de ProductManager
const productManager = new ProductManager();

productManager.addProduct('Producto Prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);
productManager.addProduct('Producto Prueba2','Este es un producto prueba2',300,'Sin imagen','abc1234',35);
productManager.addProduct('Producto Prueba3','Este es un producto prueba3',400,'Sin imagen','abc12345',45);
productManager.addProduct('Producto Prueba4','Este es un producto prueba4',500,'Sin imagen','abbc12345',55);


const app = express();

//Endpoint para obtener un limite de products recibido como query
app.get('/products', (req,res) => {
    let limit = req.query.limit;
    const products = productManager.getProducts()

    if(limit){
        const limitedProducts = products.slice(0,parseInt(limit));
        res.json(limitedProducts)
    }else{
        res.json(products)
    }
})

//Enpoint para obtener un producto por su ID recibido por param
app.get('/products/:pid', (req,res) => {
    const products = productManager.getProducts()
    let idProduct = req.params.pid;
    let product = products.find(p => p.id == idProduct)
    if(!product)return res.send({error:"Producto no encontrado"})
    res.send(product)

})


app.listen(8080, () => console.log('Estamos listos'))