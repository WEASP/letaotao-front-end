/**
 * Created by JackHui on 2017/8/2.
 */
'use strict';
require('./index.css');
var _ltt        = require('util/ltt.js');
//通用页面头部
var header= {
    init : function () {
        this.onload();
        this.bindEvent();
    },
    onload:function () {
      var keyword=_ltt.getUrlParam('keyword');
      //keyword存在,则回填输入框
      if(keyword)
      {
        $('#search-input').val(keyword);
      }
    },
    bindEvent:function () {
        //点击搜索按钮以后，做搜索提交
        var _this=this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-btn').keyup(function (e) {
            //13是回车键keycode
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    //搜索提交
    searchSubmit:function () {
       var keyword=$.trim($('#search-input').val());
       //如果提交有错，跳转到list也
       if(keyword) {
            window.location.href='./list.html?keyword='+keyword;
        }
        //如果keyword为空，直接返回主页
        else {
            _ltt.goHome();
        }
    }
};

header.init();