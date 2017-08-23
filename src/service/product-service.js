/**
 * Created by JackHui on 2017/8/5.
 */
'use strict';
var _ltt    =  require('util/ltt.js');
var _product = {
    //获取商品列表
    getProductList:function (listParam,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/product/list.do'),
            data:listParam,
            success:resolve,
            error:reject
        });
    },
    //获取商品详细信息
    getProductDetail:function (productId,resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/product/detail.do'),
            data:{
                productId:productId
            },
            success:resolve,
            error:reject
        });
    }
}
module.exports = _product;