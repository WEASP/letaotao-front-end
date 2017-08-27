/**
 * Created by JackHui on 2017/8/10.
 */
'use strict';
var _ltt    =  require('util/ltt.js');
var _address = {
    //获取地址列表
    getAddressList:function (resolve,reject) {
        _ltt.request({
            url:_ltt.getServerUrl('/shipping/list.do'),
            data: {
                pageSize : 50
            },
            success:resolve,
            error:reject
        });
    },
    //新建收件人
    save:function (addressInfo,resolve,reject) {
        _ltt.request({
            url     :_ltt.getServerUrl('/shipping/add.do'),
            data    :addressInfo,
            success :resolve,
            error   :reject
        });
    },
    //更新收件人
    update:function (addressInfo,resolve,reject) {
        _ltt.request({
            url     :_ltt.getServerUrl('/shipping/update.do'),
            data    :addressInfo,
            success :resolve,
            error   :reject
        });
    },
    //获取单条地址信息
    getAddress:function (shippingId,resolve,reject) {
        _ltt.request({
            url     :_ltt.getServerUrl('/shipping/select.do'),
            data    :{
                shippingId:shippingId
            },
            success :resolve,
            error   :reject
        });
    },
    //删除收件人
    deleteAddress:function (shippingId,resolve,reject) {
        _ltt.request({
            url     :_ltt.getServerUrl('/shipping/del.do'),
            data    :{
                shippingId:shippingId
            },
            success :resolve,
            error   :reject
        });
    }
}
module.exports = _address;