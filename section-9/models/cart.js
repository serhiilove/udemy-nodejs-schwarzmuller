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
}
