var baseUrl = getPort().baseUrl;
var imgUrl = getPort().imgUrl;

$('.btn').on('click',function(){
    var username = $("#username").val();
    var password = $("#password").val();

    console.log(username,password);

    if(username && password){
        $.ajax({
            type:"POST",
            url: baseUrl + '/userBasicInfoController/mallLogin',
            data:{
                vipNo:username,
                vipPw:password
            },
            dataType:'JSON',
            success:function(data){
                console.log(data)
                if (data.statusCode === 1){
                    sessionStorage.setItem('userId',data.map.user_id);
                    location.replace('index.html');
                }else {
                    layer.open({
                        content: data.message,
                        skin: "msg",
                        time: 3
                    })
                }
            }
        })
    }else if(!username){
        layer.open({
            content:"账号不能为空",
            skin:"msg",
            time:3
        })
    }else if(!password){
        layer.open({
            content: "密码不能为空",
            skin: "msg",
            time: 3
        })
    }

})