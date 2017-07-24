var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
  var successMsg = req.flash('success')[0];
  Product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
        productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
  });
});

/* Get add to cart page */
router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
      if(err) {
        return res.redirect('/');
      }
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(req.session.cart);
      res.redirect('/');
    });
});

/* Get shopping-cart page */
router.get('/shopping-cart', function(req, res, next) {
  if(!req.session.cart) { //If nothing in session
    return res.render('shop/shopping-cart', {products: null});
  }
  var cart = new Cart(req.session.cart); //If something in session, passing data of session to shopping-cart page
  res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice})
})


/* Get Check page */
router.get('/checkout', function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg})
})

/* Post Check page */
router.post('/checkout', function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")(
    "sk_test_UyQ0n038FqH4gxJtJigxGKPt"
  );
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // the stripe we create in the checkout.js
    description: "Stripe charge example"
  }, function(err, charge) {
    if(err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user, //passport save the user
      cart: cart, //var cart = new Cart(req.session.cart)
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id, //stripe
    })
    order.save(function(err, result) { //save to mongodb with a callback
      console.log(err);
      req.flash('success', '交易成功');
      req.session.cart = null; //Clean the cart in session after trade scccess
      res.redirect('/');
    });
  });
});

module.exports = router;
