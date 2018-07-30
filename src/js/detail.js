var baseUrl = getPort().baseUrl;
var imgUrl = getPort().imgUrl;

$.ajax({
    type: "POST",
    url: baseUrl + '/commodityInfoController/selectCommodityInfoById',
    data: {
        commodityBasicId:'931E690676AE4FE6B3A754B06CABA17A'
    },
    dataType: 'JSON',
    success: function (data) {
        console.log(data)
    }
})