$(function () {

  'use strict';
  console.log($("#province1"))
  $("#province1").change(function(){
    console.log($(this).val());
  })
  // var $distpicker = $('#distpicker');

  // $distpicker.distpicker(function(data){
  //   console.log(data)
  // });

  // $('#reset').click(function () {
  //   $distpicker.distpicker('reset');
  // });

  // $('#reset-deep').click(function () {
  //   $distpicker.distpicker('reset', true);
  // });

  // $('#destroy').click(function () {
  //   $distpicker.distpicker('destroy');
  // });

  // $('#distpicker1').distpicker();

  // $('#distpicker2').distpicker({
  //   province: '---- 所在省 ----',
  //   city: '---- 所在市 ----',
  //   district: '---- 所在区 ----'
  // });

  // $('#distpicker3').distpicker({
  //   province: '浙江省',
  //   city: '杭州市',
  //   district: '西湖区'
  // });

  // $('#distpicker4').distpicker({
  //   placeholder: false
  // });

  // $('#distpicker5').distpicker({
  //   autoSelect: false
  // });

});
