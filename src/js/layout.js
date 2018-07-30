var baseUrl = getPort().baseUrl;
var imgUrl = getPort().imgUrl;
var btnNavbar = $('btn-navbar');
var nav = $(".nav");
var dask = $(".dask");

window.onresize = function () {
    var bodyWidth = $('body').width();
    if (bodyWidth >= 640) {
        nav.show();
        dask.hide();
    } else {
        nav.hide();
    }
};
var index = 0;
$(".btn-navbar").on("click", () => {
    let $this = $(this);

    index++;
    console.log(index, index % 2 === 0)
    nav.stop().slideToggle(function () {
        dask.css('height', $('body').height());
    });
    dask.toggle();
    daskFn((index % 2 === 0));
});

function daskFn(type) {
    let body = $("body");
    if (type) {
        body.css('overflow', '');
    } else {
        body.css('overflow', 'hidden');
    }
};

dask.click(function () {
    nav.slideUp();
    $(this).hide();
    daskFn(true);
    index = 0;
});

nav.on('click', 'li', function () {
    let $this = $(this);
    $this.siblings().removeClass('active');
    $this.addClass('active');
    var bodyWidth = $('body').width();
    bodyWidth >= 640 ? '' : nav.slideUp();
    console.log(bodyWidth >= 640)
    dask.hide();
    daskFn(true);
});