'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/slider/index.js');

// require('page/common/footer/index.css');
// require('page/common/layout.css');
var _ltt            = require('util/ltt.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
$(function() {
    var bannerHtml  = _ltt.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    $('.banner').unslider();
    var $slider     = $('.banner').unslider({
        dots: true
    });
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
// navSide.init({
//    name : 'user-center'
// });
// var html = '<div>{{data}}</div>';
// var data = {
//     data : 'test'
// };
// console.log(_mm.renderHtml(html,data));
// console.log(_mm.getUrlParam('test'));
// _mm.request({
//     url:  './test.do',
//     success: function(res){
//         console.log(res);

//     },
//     error: function(errMsg){
//         console.log(errMsg);

//     }
// });
