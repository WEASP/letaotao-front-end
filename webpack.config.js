/**
 * Created by 高子峰 on 2017/8/19.
 */

var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置，dev / online  用来区分是线上还是我们的开发环境(判断写在将近最下面)。这是nodejs的机制
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        //这些参数的配置可以去看这个插件的官方文档
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        favicon  : './favicon.ico',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    }
}

//webpack.config
var config = {
    entry: {
        'common'              : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
    },
    output: {
        path     : __dirname + '/dist/',     //存放文件的路径
        publicPath : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mall-fe/dist',    //配置的是访问文件时的路径，如果没配的话会默认为 /，注意没有 .，因为这个根是根据url来的
        filename: 'js/[name].js'        //filename是指目标文件的位置，以上面的path为相对路径，下面的filename也是
    },
    externals : {
        'jquery' : 'window.jQuery'
    },

    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },

            //图片文件大小小于100的话，会被弄成Base64直接保存在css文件中，大于这个值会以文件的形式保存到指定路径
            //|woff|svg|eot|ttf是字体的格式
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },

            {
                test: /\.string$/,
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                    //minimize告诉html-loader在加载文件时做最小化压缩
                    //removeAttributeQuetes用来设置是否移除引号
                }
            }
        ]
    },

    resolve : {
        alias : {
            //__dirname是node的全局对象，指的是当前目录的位置
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },


    plugins : [
        //独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),

        //把css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),

        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        
    ]
};


//判断是否是开发模式，不是的话就执行线上模式
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;