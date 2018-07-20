;(function App(){
    var btnNavbar =  $('btn-navbar');
    var nav = $(".nav");
    var dask = $(".dask");
    var bodyWidth = $('body').width();

    window.onresize = function(){
        (bodyWidth >= 640) ? nav.show() : nav.hide();
    };

    $(".btn-navbar").on("click",() => {
        let $this = $(this);
        nav.stop().slideToggle(function(){
            dask.css('height',$('body').height());
        });
        dask.toggle();
        daskFn(false);
    });
    
    function daskFn(type){
        let body = $("body");
        if(type){
            body.css('overflow','');
        }else{
            body.css('overflow','hidden');
        }
    }

    dask.click(function(){
        nav.slideUp();
        $(this).hide();
        daskFn(true);
    })

    nav.on('click', 'li',function(){
        let $this = $(this);
        $this.siblings().removeClass('active');
        $this.addClass('active');
        bodyWidth >= 640 ? '' : nav.slideUp();
        console.log(bodyWidth >= 640)
        dask.hide();
        daskFn(true);
    })

    $("textarea").change(function(){
        var val = $(this).val()
        console.log(JSON.stringify(val).replace(/&nbsp;/g, ' ').replace(/\<br\/\>/g, '\n\n'))

    })
})();