/**
 * Created by 高子峰 on 2017/8/10.
 */

'use strict';
require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init :function(){
        this.onLoad();
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            if(window.confirm('确实要取消该订单?')){
                _order.cancelOrder(_this.data.orderNumber,function(res){
                    _mm.successTips('取消订单成功');
                    _this.loadDetail(); //重新加载一下页面信息
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    onLoad:function(){
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();

    },
    //加载订单详情
    loadDetail : function(){
        var orderDetailHtml = "",
            _this = this,
            $content = $('.content');

        _order.getOrderDetail(this.data.orderNumber,function(res){
            _this.dataFilter(res);
            //渲染html
            orderDetailHtml = _mm.renderHtml(templateIndex,res);
            $content.html(orderDetailHtml);

        },function(errMsg){
            $content.html('<p class="err-tip>'+ errMsg +'</p>"');
        });

    },
    //数据的适配
    dataFilter : function(data){
        data.needPay         = data.status == 10 ;  //用来判断data.status是不是10，“10”是订单状态，表示提交了订单并且在支付之前
        data.isCancelable    = data.status == 10 ;
        //console.log(data.isCancelable)
    }
};

$(function(){
    page.init();
});
