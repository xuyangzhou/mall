// 如果没有openid需要重新登录
function isOpenid(openid){
    if(openid){
        return false;
    }else{
        window.location.href = "login.html";
    }
}

function versoinNum(){
    var v = "1.5.0"
    return v;
}

// 本月签呈申请次数
function applyNum(type,style,callback){
    // type 1->查当月记录 2->查全部记录
    // style 1:普通签呈 2:出差签呈 3:核销签呈
    $.ajax({
        type:'POST',
        url:getPort() + 'petitionPoolController/getPetitionFrequency.do',
        data:{
            addCustomerId:getCookie('id'),
            type:type, 
            classify:style
        },
        // async:false,
        dataType:"JSON",
        success:function(data){
            // console.log(data)
            callback(data); // 回调函数
        }
    });
}

// 查询未读抄送数目
function copyNum(cb){
    $.ajax({
        type: "POST",
        url: getPort() + 'petitionPoolController/getNoReadForwardingNum.do',
        data: {
            customerId: getCookie('id')
        },
        dataType: "JSON",
        success: function (data) {
            // console.log(data)
            cb(data); // 回调函数
        }
    });
}

// 查询未读系统公告数目
function noticeNum(cb){
    $.ajax({
        type: "POST",
        url: baseUrl + "NoticeReadInfoController/selectNoReadNumInNotice.do",
        data: {
            userId: getCookie('id'),
            readDepCode: getCookie('departmentCode')
        },
        dataType: "JSON",
        success: function (data) {
            // console.log(data)
            cb(data); // 回调函数
        }
    })
}

// 查询待审批数目
function pendingNum(cb){
    $.ajax({
        type:"POST",
        data:{
            approvalId:getCookie('id')
        },
        // async:false,
        url:getPort()+"petitionPoolController/selectWaitAuditNumByApprovalId.do",
        dataType:"JSON",
        success:function(data){
            // console.log(data);
            cb(data); // 回调函数
        }
    });
}

// 处理换行符
function dealLine(str){
    var str1 = str.replace(/^\n+/g,"").replace(/\n+/g,"\n");
    var newString = str1.replace(/\n/g, '_@_').replace(/\r/g, '_#_');
    newString = newString.replace(/_#___@/g, '<br/>');//IE7-8
    newString = newString.replace(/_@_/g, '<br/>');//IE9、FF、chrome
    newString = newString.replace(/\s/g, '&nbsp;');//空格处理
    return newString;
}

// 处理签呈类型
function stemp(str){
    var text;
    var newStr = str.toString();
    var color1 = '#25a3fd';
    var color2 = '#21d9b4';
    var color3 = '#ffa300';
    var color4 = '#ff5500';
    switch(newStr){
        case '1' : text = "事务签呈";color = color1;break; 
        case '2' : text = "出差申请";color = color2;break; 
        case '3': text = "出差核销"; color = color3; break; 
        case '4': text = "其他办公"; color = color4; break; 
        case '10': text = "请假申请"; color = '#16c195'; break; 
        case '11': text = "加班申请"; color = '#2690ff'; break; 
        case '12' : text = "外出申请";color = '#ff7e77';break; 
    }
    return {
        text:text,
        color:color
    };
}

// 文级提示信息
function help(ele){
    ele.click(function(){
        layer.open({
            content:"<h4>文级级别（签呈审批节点通知获悉方式）</h4>\
            <ul  style='margin:0.5rem 2rem;'>\
            <li style='text-align:left;'>1、正常：微信推送</li>\
            <li style='text-align:left;'>2、紧急：勿扰时间外短信推送</li>\
            <li style='text-align:left;'>3、特急：全天候短信推送</li>\
            </ul>",
            btn:'我知道了'
        })
    });
}

// 处理时间戳函数
function formatTime(time){
    
    var hA = Math.floor( time / 3600 );
    var mA = Math.floor( time % 3600 / 60 );
    var sA = Math.floor( time % 60 );
    //时
    var hs = Math.floor( hA / 10 );
    var hg = Math.floor( hA % 10 );
    //分
    var ms = Math.floor( mA / 10 );
    var mg = Math.floor( mA % 10 );
    //秒
    var ss = Math.floor( sA / 10 );
    var sg = Math.floor( sA % 10 );
    var obj;
    var col;
    if(hs.toString()+hg >= 4){
        col = "#c72759";
    }else{
        col = "green";
    }
    obj = {
        col:col,
        // time:hs.toString()+hg+"小时"+ms+mg+"分"+ss+sg+"秒"
        time:hs.toString()+hg+":"+ms+mg+":"+ss+sg
    }
    return obj;
}

// 上传附件控件
function imgUpload(file1,file2,file3,file4,file5){
    //第一个附件
    file1.bind("change",function(){
        var type = $(this)[0].files[0].type.split('/');
        
        if(type[0] == "image"){
            num = 1;
            var src = window.URL.createObjectURL($(this)[0].files[0]);
            file2.removeAttr("disabled");
            affix.eq(1).removeClass("hidden");
            $(this).parent().find('img').attr('src',src);
        }else{
            layer.open({
                content:"V1.5版本仅支持图片附件",
                skin:"msg",
                time:3
            });
        }
    });

    // 第二个file控件
    file2.bind("change",function(){
        var type = $(this)[0].files[0].type.split('/');
        
        if(type[0] == "image"){
            num = 2;
            var src = window.URL.createObjectURL($(this)[0].files[0]);
            $(this).parent().find('img').attr('src',src);
            file3.removeAttr("disabled");
            affix.eq(2).removeClass("hidden");
        }else{
            layer.open({
                content:"V1.5版本仅支持图片附件",
                skin:"msg",
                time:3
            });
        }
    });
    // 第三个file控件
    file3.bind("change",function(){
        var type = $(this)[0].files[0].type.split('/');
        
        if(type[0] == "image"){
            num = 3;
            file4.removeAttr("disabled");
            affix.eq(3).removeClass("hidden");
            var src = window.URL.createObjectURL($(this)[0].files[0]);
            $(this).parent().find('img').attr('src',src);
        }else{
            layer.open({
                content:"V1.5版本仅支持图片附件",
                skin:"msg",
                time:3
            });
        }    
    });

    // 第四个file控件
    file4.bind("change",function(){
        var type = $(this)[0].files[0].type.split('/');
        
        if(type[0] == "image"){
            num = 4;
            file5.removeAttr("disabled");
            affix.eq(4).removeClass("hidden");
            var src = window.URL.createObjectURL($(this)[0].files[0]);
            $(this).parent().find('img').attr('src',src);
        }else{
            layer.open({
                content:"V1.5版本仅支持图片附件",
                skin:"msg",
                time:3
            });
        }
    });

    // 第五个file控件
    file5.bind("change",function(){
        var type = $(this)[0].files[0].type.split('/');
        
        if(type[0] == "image"){
            num = 5;
            var src = window.URL.createObjectURL($(this)[0].files[0]);
            $(this).parent().find('img').attr('src',src);
        }else{
            layer.open({
                content:"V1.0版本仅支持图片附件",
                skin:"msg",
                time:3
            });
        }
    });
}

// 获取滚动条高度
function getScrollTop() {
    var scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

// 处理签呈审批操作状态
function OperatStatus(state){
    var str,color;
    var newState = state.toString();
    var obj;
    var color1 = '#eea236';
    var color2 = '#5cb85c';
    var color3 = '#d9534f';
    var color4 = '#46b8da';
    switch(newState){
        case '0' : str = "待审批";color = color1;break; //#eea236
        case '1' : str = "同意";color = color2;break; //#5cb85c
        case '2' : str = "退回";color = color3;break; //#d9534f
        case '3' : str = "加签";color = color4;break; //#46b8da
    }
    return {
        str:str,
        color:color
    };
};

// 处理签呈审批状态
function status(enadopt,state){
    var str,color,pic,mark;
    var newState = state.toString();
    var newEnadopt = enadopt.toString();
    var obj;
    var color0 = '#7f8c8d';
    var color1 = '#3498db';
    var color2 = '#d9534f';
    var color3 = '#5cb85c';
    var color4 = '#e67e22';
    if(newEnadopt == '0'){
        pic = 0;
        color = color0;
        str = "待审核";
        mark = 'wait';
    }else if(newEnadopt == '1'){
        switch(newState){
            // case '0' : str = "待审核";color = color0;break;
            case '1' : str = "审批中";pic = 1;color = color1;mark = "approval";break;
            case '2' : str = "已退回";pic = 2;color = color2;mark = "back";break;
            case '3' : str = "已通过";pic = 3;color = color3;mark = "success";break;
            case '4' : str = "加签";  pic = 4;color = color4;mark = "signup";break;
        }
    }else if(newEnadopt == '2'){
        pic = 6;
        color = color2;
        str = "审核不通过";
        mark = "back"; // fail
    }
    
    return {
        str:str,
        color:color,
        pic:pic,
        mark:mark
    };
};

// 处理签呈文级
function level(level){
    var str;
    var newLevel = level.toString();
    switch(newLevel){
        case '1' : str = "正常";break;
        case '2' : str = "紧急";break;
        case '3' : str = "特急";break;
    }
    return str;
};

// 处理今天的时间
function isToday(str) {
    var m = new Date(str).getMonth() + 1;
    var d = new Date(str).getDate();
    var h = new Date(str).getHours();
    var s = new Date(str).getMinutes();
    m = isZero(m)
    d = isZero(d);
    h = isZero(h);
    s = isZero(s);
    if (new Date(str).toDateString() === new Date().toDateString()) {
        //今天
        return h + ":" + s;
        console.log("当天",h,s);
        
    } else if (new Date(str) < new Date()){
        //之前
        return m + '-' + d + " " + h + ":" + s;
        console.log("以前的日期",m,d,h,s);
    }
    function isZero(str1){
        return str1 = str1 > 9 ? str1 : ('0' + str1);
    }
} 

// 通过后缀名判断类型
function dugeType(type) {
    var suffix;
    var type = type.toLowerCase();
    switch (type) {
        case "dot": case "docx": case "dotm": case "doc":
            suffix = "word";
            break;
        case "jpg": case "png": case "jpeg": case "gif":
            suffix = "image";
            break;
        case "pdf":
            suffix = "pdf";
            break;
        case "xls": case "xlsx":
            suffix = "excel";
            break;
        case "txt":
            suffix = "txt";
            break;
        case "ppt": case "pptx":
            suffix = "ppt";
            break;
        // case "zip": case "rar":
        //     suffix = "zip";
        //     break;
        default:
            suffix = 'other'
            break;
    }
    return suffix;
}

//获取url传递的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * 收藏操作
 **/
var mark;
function collect(_this) {
    var $this = $(_this);
    var customerId = getCookie('id'); // 当前用户id
    var poolId = GetRequest()['id']; // 签呈id
    $this.toggleClass("active");
    if ($this.hasClass("active")) { // 收藏
        layer.open({
            type:0,
            content:"<input type='text' name='mark' id='mark' placeholder='请输入收藏标签' style='border:1px solid #eee;padding:0.3rem;border-radius:0.3rem;' />",
            btn: ['确定', '取消'], 
            yes: function (index) {
                var mark = $("#mark").val();
                $this.find('.iconfont').removeClass('icon-favor').addClass('icon-favorfill');
                console.log(mark);
                addCollect(poolId, customerId,mark);
            }
        })
        
    } else { // 取消收藏
        $this.find('.iconfont').removeClass('icon-favorfill').addClass('icon-favor');
        cancelCollect(poolId, customerId);
    }
};

/**
 * 添加收藏接口 
 */
function addCollect(poolId, customerId, mark) {
    $.ajax({
        url: baseUrl + 'PetitionInfoController/addPetitionCollection.do',
        data: {
            poolId: poolId,
            customerId: customerId,
            mark:mark
        },
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            // console.log(data);
            if(data.statusCode === 1){
                layer.open({
                    content: data.message,
                    skin: 'msg',
                    time: 2
                })
            }
        }
    })
};

/**
 * 取消收藏接口 
 */
function cancelCollect(poolId, customerId) {
    $.ajax({
        url: baseUrl + 'PetitionInfoController/deletePetitionCollection.do',
        data: {
            poolId: poolId,
            customerId: customerId
        },
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            // console.log(data)
            if (data.statusCode === 1){
                layer.open({
                    content: data.message,
                    skin: 'msg',
                    time: 2
                })
                var beforeData = JSON.parse(sessionStorage.getItem('qcData'));
                var afterData = beforeData.filter(function(v,i){
                    return v.id !== poolId;
                });
                sessionStorage.setItem('qcData',JSON.stringify(afterData));
            }
        }
    })
};

//时间格式化
function timeFormat(){
    template.defaults.imports.dateFormat = function (date, format) {
        
        date = new Date(date);
    
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            var v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            } else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    };
}

// 控制只能输入数字或者两位小数
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
        obj.value = parseFloat(obj.value);
    }
}

// 控制只能整数或者小数点后1位 为0或者5
function clearNoInt(obj) {
    var reg = /^[0-9]{1,8}([\.][0,5]{1})?$/g;
    if(reg.test(obj.value)){
        reg.lastIndex = 0;
        console.log('reg.test('+obj.value+')',reg.test(obj.value));
    }else if(obj.value !== ''){
        obj.value = '';
        layer.open({
            content:'格式不正确！',
            skin:'msg',
            time:2
        })
    }
}

/**
 * floatTool 包含加减乘除四个方法，能确保浮点数运算不丢失精度
 *
 * 我们知道计算机编程语言里浮点数计算会存在精度丢失问题（或称舍入误差），其根本原因是二进制和实现位数限制有些数无法有限表示
 * 以下是十进制小数对应的二进制表示
 *      0.1 >> 0.0001 1001 1001 1001…（1001无限循环）
 *      0.2 >> 0.0011 0011 0011 0011…（0011无限循环）
 * 计算机里每种数据类型的存储是一个有限宽度，比如 JavaScript 使用 64 位存储数字类型，因此超出的会舍去。舍去的部分就是精度丢失的部分。
 *
 * ** method **
 *  add / subtract / multiply /divide
 *
 * ** explame **
 *  0.1 + 0.2 == 0.30000000000000004 （多了 0.00000000000004）
 *  0.2 + 0.4 == 0.6000000000000001  （多了 0.0000000000001）
 *  19.9 * 100 == 1989.9999999999998 （少了 0.0000000000002）
 *
 * floatObj.add(0.1, 0.2) >> 0.3
 * floatObj.multiply(19.9, 100) >> 1990
 *
 */
var floatTool = function() {
    
    /*
        * 判断obj是否为一个整数
        */
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }

    /*
        * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
        * @param floatNum {number} 小数
        * @return {object}
        *   {times:100, num: 314}
        */
    function toInteger(floatNum) {
        var ret = {times: 1, num: 0}
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi  = floatNum + ''
        var dotPos = strfi.indexOf('.')
        var len    = strfi.substr(dotPos+1).length
        var times  = Math.pow(10, len)
        var intNum = parseInt(floatNum * times + 0.5, 10)
        ret.times  = times
        ret.num    = intNum
        return ret
    }

    /*
        * 核心方法，实现加减乘除运算，确保不丢失精度
        * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
        *
        * @param a {number} 运算数1
        * @param b {number} 运算数2
        * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
        * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
        *
        */
    function operation(a, b, op) {
        var o1 = toInteger(a)
        var o2 = toInteger(b)
        var n1 = o1.num
        var n2 = o2.num
        var t1 = o1.times
        var t2 = o2.times
        var max = t1 > t2 ? t1 : t2
        var result = null
        switch (op) {
            case 'add':
                if (t1 === t2) { // 两个小数位数相同
                    result = n1 + n2
                } else if (t1 > t2) { // o1 小数位 大于 o2
                    result = n1 + n2 * (t1 / t2)
                } else { // o1 小数位 小于 o2
                    result = n1 * (t2 / t1) + n2
                }
                return result / max
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2)
                } else {
                    result = n1 * (t2 / t1) - n2
                }
                return result / max
            case 'multiply':
                result = (n1 * n2) / (t1 * t2)
                return result
            case 'divide':
                return result = function() {
                    var r1 = n1 / n2
                    var r2 = t2 / t1
                    return operation(r1, r2, 'multiply')
                }()
        }
    }

    // 加减乘除的四个接口
    function add(a, b) {
        return operation(a, b, 'add')
    }
    function subtract(a, b) {
        return operation(a, b, 'subtract')
    }
    function multiply(a, b) {
        return operation(a, b, 'multiply')
    }
    function divide(a, b) {
        return operation(a, b, 'divide')
    }

    // exports
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }
}();