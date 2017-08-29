/**
 * Created by 高子峰 on 2017/8/20.
 */
'use strict';


var Hogan = require('hogan');
var conf = {
    //因为接口地址和当前的静态文件地址是一样的，所以为空即可
    serverHost : ''
}

var _mm = {
    //网络请求
    request: function (param){
        var _this = this;   //让ajax里能取到mm对象
        $.ajax({
            type        : param.method || 'get',
            url         : param.url    || '',
            dataType    : param.type   || 'json',
            data        : param.data   || '',
            success     : function(res){
                //请求成功
                if(0===res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();    //由于这块在ajax里面，直接的话取不到mm对象，所以在外面有弄了个_this
                }
                //请求数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);  //error里面就没有data了
                }
            },
            error       : function (err) {//该函数的参数是一个error的对象
                ////看param.error是否是function,如果是则param.error(err.statusText)
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数       name即为想要获取的参数
    getUrlParam : function(name){
        //假设路径为：happymmmall.com/product/list?keyword=XXX&page=1
        var reg     = new RegExp('(^|&)' + name +'=([^&]*)(&|$)');//直接new一个正则
        //window.location.search代表的是？后面的那一段字符串，substr去掉？,然后用match判断是否匹配
        var result  = window.location.search.substr(1).match(reg);

        //要先用decodeURIComponent对result进行解码，因为传参的时候是有个urlencode的的
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板（用hogan组件）        传入模板和数据，通过该函数进行拼接
    renderHtml : function(htmlTemplate,data){
        //第一步：编译
        var template = Hogan.compile(htmlTemplate),
            //第二步：输出
            result   = template.render(data);

        return result;
    },
    //成功提示
    successTips : function (msg) {
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips : function (msg) {
        alert(msg || '哪里不对了！');
    },
    //字段验证，支持非空、手机、邮箱的判断
    validate : function(value,type){
        var value = $.trim(value);// $.trim()是jQuery提供的函数,用于去掉字符串首尾的空白字符，返回字符串
        //非空验证
        if('require' === type){
            return !!value; //将value强制转成布尔类型，value如果有值则返回值是ture，若空字符串则返回false
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value); //test() 方法是js中RegExp对象的用于检测一个字符串是否匹配某个模式
        }
        //邮箱验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },

    //统一登录处理
    doLogin : function(){
        //用encodeURIComponent将window.location.href传的地址完全编码，防止地址里面有特殊字符而被截断的情况
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //跳转返回首页
    goHome : function(){
        window.location.href = './index.html';//window.location.href表示重新定向到新页面，同时刷新打开的这个页面
    }
};

module.exports = _mm;