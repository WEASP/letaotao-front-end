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
};

module.exports = _mm;