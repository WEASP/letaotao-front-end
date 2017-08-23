/**
 * Created by JackHui on 2017/8/4.
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _ltt            =require('util/ltt.js');
var navSide         =require('page/common/nav-side/index.js');
var templateIndex   =require('./index.string');
var _user           =require('service/user-service.js');
//page逻辑部分
var page = {
    init: function () {
        this.onload();
    },
    onload: function () {
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo:function () {
        var userHtml   ='';
        _user.getUserInfo(function (res) {
            userHtml = _ltt.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
            },function (errMsg) {
            _ltt.errorTips(errMsg);
        });
    }
};
$(function () {
    page.init();
});