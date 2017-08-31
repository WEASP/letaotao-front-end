'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ltt = require('util/ltt.js');

$(function(){
    var type    = _ltt.getUrlParam('type') || 'default',
       $element   = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
});
