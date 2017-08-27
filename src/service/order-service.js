/**
 * Created by JackHui on 2017/8/10.
 */

'use strict';
var _ltt    =  require('util/ltt.js');
var _order = {
    //获取商品列表
    getProductList:function (resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/get_order_cart_product.do'),
            success:resolve,
            error:reject
        });
    },
    //提交订单
    createOrder:function (orderInfo,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/create.do'),
            data:orderInfo,
            success:resolve,
            error:reject
        });
    },
    //获取订单列表
    getOrderList:function (listParam,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/list.do'),
            data:listParam,
            success:resolve,
            error:reject
        });
    },
    //获取订单详情
    getOrderDetail:function (orderNumber,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/detail.do'),
            data:{
                orderNo:orderNumber
            },
            success:resolve,
            error:reject
        });
    },
    //取消订单
    cancelOrder:function (orderNumber,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/cancel.do'),
            data:{
                orderNo:orderNumber
            },
            success:resolve,
            error:reject
        });
    }
}
module.exports = _order;