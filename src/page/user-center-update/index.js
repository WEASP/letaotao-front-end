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
        this.bindEvent();
    },
    onload: function () {
        //初始化左侧菜单
        navSide.init({
            name:'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    bindEvent:function () {
        var _this=this;
        $(document).on('click','.btn-submit',function () {
          var userInfo={
              phone         :$.trim($('#phone').val()),
              email         :$.trim($('#email').val()),
              question      :$.trim($('#question').val()),
              answer        :$.trim($('#answer').val())
          },
        validateResult  = _this.validateForm(userInfo);
        if(validateResult.status){
            //更改用户信息
            _user.updateUserInfo(userInfo,function (res,msg) {
                _ltt.successTips(msg);
                window.location.href = './user-center.html';
            },function (errMsg) {
                _ltt.errorTips(validateResult.msg);
                });
        }
        else{
            _ltt.errorTips(validateResult.msg);
        }
    });
},
    //加载用户信息
    loadUserInfo:function () {
        var userHtml   ='';
        _user.getUserInfo(function (res) {
            userHtml = _ltt. Html(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function (errMsg) {
            _ltt.errorTips(errMsg);
        });
    },
    validateForm:function (formData) {
        var result = {
            status:false,
            msg:''
        };
        //验证手机号
        if(!_ltt.validata(formData.phone,'phone'))
        {
            result.msg='手机号格式不正确';
            return result;
        }
        //验证邮箱格式是否正确
        if(!_ltt.validata(formData.email,'email'))
        {
            result.msg='邮箱格式不正确';
            return result;
        }
        //验证密码提示问题
        if(!_ltt.validata(formData.question,'require'))
        {
            result.msg='密码提示问题不能为空';
            return result;
        }
        //验证提示问题答案是否为空
        if(!_ltt.validata(formData.answer,'require'))
        {
            result.msg='密码提示问题答案不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status   =   true;
        result.msg      = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});