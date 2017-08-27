
/**
 * Created by JackHui on 2017/8/2.
 */
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ltt=require('util/ltt.js');

$(function () {
    var type = _ltt.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
        $element.show();
    if(type === 'payment')
    {
        var orderNumber = _ltt.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href',$orderNumber.attr('href')+$orderNumber);
    }
        })