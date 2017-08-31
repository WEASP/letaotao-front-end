'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ltt    =require('util/ltt.js');
var _user   =require('service/user-service.js');

//表单里错误提示
var formError = {
   show:function (errMsg) {
       $('.error-item').show().find('.err-msg').text(errMsg);
   },
   hide:function (errMsg) {
        $('.error-item').hide().find('.err-msg').text('');
    },
}
//page逻辑部分
var page = {
    init:function () {
        this.bindEvent();
    },
    bindEvent:function () {
        var _this=this;
        //登录按钮点击
        $('#submit').click(function () {
                _this.submit();
        });
        //如果按下回车，也进行提交
        $('.user-content').keyup(function (e) {
            if(e.keyCode===13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit:function () {
        var formData={
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        //表单验证结果
        validateResult=this.formValidate(formData);
        //验证成功
        if(validateResult.status)
    {
        //提交
        _user.login(formData,function (res) {
            window.location.href=_ltt.getUrlParam('redirect') || './index.html';
        },function (errMsg) {
            formError.show(errMsg);
        });
    }
    //验证失败
    else
    {
        formError.show(validateResult.msg);
    }
        },
    formValidate:function (formData) {
        var result = {
            status:false,
            msg:''
        };
        if(!_ltt.validata(formData.username,'require'))
        {
            result.msg='用户名不能为空';
            return result;
        }
        if(!_ltt.validata(formData.password,'require'))
        {
            result.msg='密码不能为空';
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