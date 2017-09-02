/**
 * Created by 高子峰 on 2017/8/8.
 */
'use strict';

var _mm               = require('util/mm.js');
var _cities          = require('util/cities/index.js');
var _address          = require('service/address-service.js');
var templateAddressModal  = require('./address-modal.string');

var addressModal = {
    show : function(option){
        //option的绑定
        this.option = option;
        this.option.data = option.data || {};
        this.$modalWrap = $('.modal-wrap'); //外层容器的选择器
        //渲染页面
        this.loadModal();
        //绑定事件
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //省份和城市的二级联动
        this.$modalWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //提交收货地址
        this.$modalWrap.find('.address-btn').click(function(){

            var receiverInfo = _this.getReceiverInfo(),
                isUpdate	 = _this.option.isUpdate;
            //使用新地址，且验证通过
            if(!isUpdate && receiverInfo.status){
                _address.save(receiverInfo.data,function(res){
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    //执行回调函数，看onSuccess是否是function,如果是则_this.option.onSuccess(res)
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //更新收件人，并且验证通过
            else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function(res){
                    _mm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            //验证不通过
            else{
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
            }
        });
        //点击叉号或者蒙版区，关闭弹窗
        this.$modalWrap.find('.close').click(function(){
            _this.hide();
        });
        //保证点击modal内容区的时候不关闭弹窗
        this.$modalWrap.find('.modal-container').click(function(e){
            //DOM对象中Event对象的stopPropagation()方法
            e.stopPropagation();
        });
    },
    //渲染页面
    loadModal : function () {
        // 加载/回填 除省份、城市外的信息
        var addressModalHtml = _mm.renderHtml(templateAddressModal,{
            isUpate : this.option.isUpdate,
            data    : this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        //加载/回填 省份、城市
        this.loadProvince();
    },
    //加载省份信息
    loadProvince : function () {
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province'); //find() 方法获得当前元素集合中每个元素的后代。
        $provinceSelect.html(this.getSelectOption(provinces));
        //如果是更新地址，并且有省份的信息，做省份的回填
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
            this.loadCities(this.option.data.receiverProvince);
        }
    },
    //加载城市信息
    loadCities : function(provinceName){
        var cities = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        //如果是更新地址，并且有城市的信息，做城市的回填
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity); //va() 方法返回或设置被选元素的值。如果该方法未设置参数，则返回被选元素的当前值。
        }
    },
    //获取表单中收件人信息,并且做表单的验证
    getReceiverInfo : function(){
        var receiverInfo = {},
            result       = {
                status : false
            };
        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity     = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiver-address').val());
        receiverInfo.receiverPhone    = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zip').val());
        //receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiver-zipCode').val());
        if(this.option.isUpdate){
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        //表单验证
        if(!receiverInfo.receiverName){
            result.errMsg = '请输入收件人姓名';
        }else if(!receiverInfo.receiverProvince){
            result.errMsg = '请选择收件人所在省份';
        }
        else if(!receiverInfo.receiverCity){
            result.errMsg = '请选择收件人所在城市';
        }
        else if(!receiverInfo.receiverAddress){
            result.errMsg = '请输入详细地址';
        }
        else if(!receiverInfo.receiverPhone){
            result.errMsg = '请输入11位手机号';
        }
        else if(11 !== receiverInfo.receiverPhone.length){
            console.log(receiverInfo.receiverPhone.length)
            result.errMsg = '请输入11位手机号';
        }
        //所有验证都通过了
        else{
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    //获取select框的选项，输入：array,输出：HTML
    getSelectOption : function (optionArray) {
        var html = '<option value="">请选择</option>';
        for(var i= 0,length = optionArray.length;i<length;i++){
            html += '<option value="'  + optionArray[i] +  '">' + optionArray[i] + '</option>';
        }
        return html;
    },
    //关闭弹窗
    hide : function(){
        this.$modalWrap.empty();    //empty() 方法从被选元素(包括被选元素)移除所有内容，包括所有文本和子节点。
    }
};
/*$(function(){
    page.init();
})*/
//这里不用init了，输出这个模块就行
module.exports = addressModal;