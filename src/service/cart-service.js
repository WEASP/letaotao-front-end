/**
 * Created by JackHui on 2017/8/2.
 */
'use strict';
var _ltt = require('util/ltt.js');
var _cart = {
    // 获取购物车数量
    getCartCount : function(resolve, reject){
        _ltt.request({
            url     : _ltt.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function(productInfo, resolve, reject){
        _ltt.request({
            url     : _ltt.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _cart;