'use strict';

var server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
var CartModel = require('*/cartridge/models/cart');

server.get('Start', function (req, res, next) {
	var basket = BasketMgr.currentBasket;
    var basketModel = new CartModel(basket);
    res.render('cart/cart', basketModel);
    next();
   
	
});

module.exports = server.exports();