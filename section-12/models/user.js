const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
        .then(result => console.log(result))
        .catch(error => console.log(error));
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());

    let newQuantity = 1;
    const updatedCartItems = [ ...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({ productId: new mongodb.ObjectId(product._id), quantity: newQuantity });
    }

    const updatedCart = {
        items: updatedCartItems
    }

     const db = getDb();
     return db.collection('users').updateOne(
         { _id: mongodb.ObjectId(this._id) },
         { $set: {
                 cart: updatedCart
             }
         });
  }

  deleteItemFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter(i => i.productId.toString() !== prodId.toString());

    const db = getDb();
    return db.collection('users').updateOne({
        _id: new mongodb.ObjectId(this._id)
    }, {
        $set: { cart: { items: updatedCartItems } }
    });
  }

  getCart() {
      const productIds = this.cart.items.map(i => i.productId);

      const db = getDb();
      return db.collection('products').find({ _id: { $in: productIds }})
          .toArray()
          .then(products => {
              return products.map(p => ({ ...p, quantity: this.cart.items.find(i =>  {
                      return i.productId.toString() === p._id.toString();
                  }).quantity
              }));
          })
          .catch(error => console.log(error));
  }

  addOrder() {
      const db = getDb();
      return db.collection('orders').insertOne(this.cart)
          .then(result => {
              this.cart = { items: [] };

              return db.collection('users').updateOne({
                  _id: new mongodb.ObjectId(this._id)
              }, {
                  $set: { cart: { items: [] } }
              });
          })
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId)})
        .then(result => {
          console.log(result);
          return result;
        })
        .catch(error => console.log(error));
  }
}

module.exports = User;
