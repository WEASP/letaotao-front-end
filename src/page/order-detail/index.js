/**
 * Created by JackHui on 2017/8/11.
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _ltt            =require('util/ltt.js');
var navSide         =require('page/common/nav-side/index.js');
var templateIndex   =require('./index.string');
var _order           =require('service/order-service.js');

//page逻辑部分
var page = {
    data:{
        orderNumber:_ltt.getUrlParam('orderNumber')
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        //初始化左侧菜单
        navSide.init({
            name:'order-list'
        });
        //加载detail数据
        this.loadDetail();
    },
    bindEvent:function () {
        var _this=this;
        $(document).on('click','.order-cancel',function () {
            if(window.confirm('确实要取消该订单么？')){
            _order.cancelOrder(_this.data.orderNumber,function (res) {
               _ltt.successTips('该订单取消成功');
               _this.loadDetail();
           },function (errMsg) {
               _ltt.errorTips(errMsg);
           });
            }
        });
    },
    //加载订单列表
    loadDetail:function () {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(_this.data.orderNumber,function (res) {
            _this.dataFilter(res);
            //渲染Html
            orderDetailHtml = _ltt.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);
        },function (errMsg) {
            $content.html('<p class="err-tip">'+errMsg+'</p>');
        });
    },
    //数据的适配
    dataFilter:function (data) {
        data.needPay        = data.status ==10;
        data.isCancelable   = data.status ==10;
    }
};
$(function () {
    page.init();
});