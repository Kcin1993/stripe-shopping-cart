var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Order = require('../models/order'); //import schma for order use in profile page
var Cart = require('../models/cart'); //Loop the cart items if user login

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) { //Use current user to fliter and match db data
        if(err) {
            return res.write('Error! In user data');
        }
        var cart;
        orders.forEach(function(order){
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/profile', {orders: orders});
    });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
   next();
});

router.get('/signup', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true,
}), function(req, res, next){ //If signup success redirect to current page
    if(req.session.oldUrl) {
        var oldUrl = req.session.oldUrl; //save oldUrl first and then clean the session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        req.redirect('/user/profile');
    }
});

router.get('/signin', function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res, next){ //If signin success redirect to current page
    if(req.session.oldUrl) {
        var oldUrl = req.session.oldUrl; //save oldUrl first and then clean the session.oldUrl
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        req.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}