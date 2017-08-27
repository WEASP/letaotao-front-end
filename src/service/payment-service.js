/**
 * Created by JackHui on 2017/8/13.
 */
'use strict';
var _ltt    =  require('util/ltt.js');
var _payment = {
    //获取支付信息
    getPaymentInfo:function (orderNumber,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/pay.do'),
            data:{
                orderNo:orderNumber
            },
            success:resolve,
            error:reject
        });
    },
    //获取订单状态
    getPaymentStatus:function (orderNumber,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/order/query_order_pay_status.do'),
            data:{
                orderNo:orderNumber
            },
            success:resolve,
            error:reject
        });
    },
}
module.exports = _payment;