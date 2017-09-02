/**
 * Created by 高子峰 on 2017/8/1.
 */
'use strict';
require('./index.css');

var _mm = require('util/mm.js');
//通用页面头部
var header={
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    //参数回填
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);//使用jQuery的选择器

        }
    },
    bindEvent : function() {
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });
        //输入回车后，做搜索提交
        $('#search-input').keyup(function (e) {
            if(e.keyCode === 13){//13是回车键的keyCode，这是ASCII码值
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit : function(){
        var keyword= $.trim($('#search-input').val());//trim是去掉前后的空格
        //如果提交的时候有keyword，正常跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        //如果keyword为空，直接返回首页
        else{
            _mm.goHome();
        }
    }
};

header.init();