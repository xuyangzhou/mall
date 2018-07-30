;(function App(){
    var baseUrl = getPort().baseUrl;
    var imgUrl = getPort().imgUrl;

    // 商品列表
    projectList();
    function projectList(){
        $.ajax({
            type:"POST",
            url: baseUrl + '/commodityInfoController/selectCommodityInfosByCondition',
            data:{
                commodityName:'',
                commodityCode:'',
                orderType:'' 
            },
            dataType:"JSON",
            success(data){
                console.log(data)
                if(data.result.statusCode === 1){
                    data.list.length & data.list.forEach(function(v,i){
                        v.pic_path = imgUrl + v.pic_path;
                    });

                    $(".product").html(template('lists',data))
                }
            }
        })
    }

    // detail
    $(".product").on('click','li',function(){
        var $this = $(this);
        var id = $this.data('id');
        console.log(id)

        location.href = './detail.html?id=' + id;
    })
    
})();   