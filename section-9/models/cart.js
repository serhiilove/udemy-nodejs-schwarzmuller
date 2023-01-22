const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) throw err;
            let cart = JSON.parse(data.toString());

            const productIndex = cart.products.findIndex(p => p.id === id);
            const existingProduct = cart.products[productIndex];
            let updatedProduct;

            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products[productIndex] = updatedProduct;
            } else {
                updatedProduct = { id, qty: 1 };
                cart.products = [ ...cart.products, updatedProduct ];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, data) => {
            if (err) throw err;

            let cart = JSON.parse(data.toString());
            console.log('cart type: ', typeof cart);
            const product = cart.products.find(prod => prod.id === id);
            if (product) {
                console.log('pr: ', product);
                cart.products = cart.products.filter(prod => prod.id !== id);
                cart.totalPrice = cart.totalPrice - product.qty * productPrice;
            }
            console.log('cart: ', cart);
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        })
    }
}
