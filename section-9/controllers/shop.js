const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId, product => {
    if (!product) {
      res.redirect('/');
    }
    res.render('shop/product-detail', {
      product,
      pageTitle: 'Product detail',
      path: `/products/${productId}`
    })
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    const cartProducts = [];

    Product.fetchAll(products => {
      for (const product of products) {
        const cartProduct = cart.products.find(prod => prod.id === product.id)
        if (cartProduct) {
          cartProducts.push({ ...product, qty: cartProduct.qty });
        }
      }

      console.log('cartProducts: ', cartProducts);

      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });


  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('prodId: ', prodId);

  Product.findById(prodId, (product) => {
    console.log('product: ', product);
    Cart.addProduct(prodId, product.price);
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
