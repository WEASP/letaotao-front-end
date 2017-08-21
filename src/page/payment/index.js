/**
 * Created by JackHui on 2017/8/13.
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _ltt            =require('util/ltt.js');
var templateIndex   =require('./index.string');
var _payment           =require('service/payment-service.js');

//page逻辑部分
var page = {
    data:{
        orderNumber:_ltt.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        //加载detail数据
        this.loadPaymentInfo();
    },
    //加载订单列表
    loadPaymentInfo:function () {
        var _this = this,
           paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(_this.data.orderNumber,function (res) {
            //渲染Html
            paymentHtml = _ltt.renderHtml(templateIndex,res);
            $pageWrap.html(paymentHtml);
            _this.listenOrderStatus();
        },function (errMsg) {
            $pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    //监听订单状态
    listenOrderStatus:function () {
        var _this=this;
        this.paymentTimer = window.setInterval(function () {
            _payment.getPaymentStatus(_this.data.orderNumber,function (res) {
                if(res==true)
                {
                    window.location.href='./result.html?type=payment&orderNumber='
                        +_this.data.orderNumber;
                }
            });
        },5e3);
    }
};
$(function () {
    page.init();
});