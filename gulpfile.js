//引入gulp和gulp插件
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    less = require('gulp-less'), // less->css
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    autoprefixer = require('gulp-autoprefixer'), // 自动添加兼容性前缀
    clean = require('gulp-clean'), // 清理
    uglify = require('gulp-uglify'), // js压缩
    imagemin = require('gulp-imagemin'), // 图片压缩
    cache = require('gulp-cache'),
    babel = require('gulp-babel'), // es6 -> es5
    fileinclude = require('gulp-file-include'), 
    htmlmin = require('gulp-htmlmin'), // 压缩html
    minifyCss = require('gulp-minify-css'); // css压缩

// 定义css、js源文件路径
var cssSrc = './src/css/*.css', // css 路径
    lessSrc = './src/less/*.less', // less路径
    imgSrc = 'src/img/**/*', // 图片路径
    libSrc = 'src/lib/*', // layer.css
    fontSrc = 'src/font/*', // font 
    jsSrc = './src/js/*.js'; // js 路径

// CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function () {
    return gulp.src(cssSrc)
        .pipe(rev())                                //给文件添加hash编码
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/css'));
});

// less转化为css
gulp.task('revLess',function(){
    return gulp.src(lessSrc)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(rev())
        .pipe(gulp.dest('./dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/less'))
})

// less 
gulp.task('orignalLess',function(){
    return gulp.src('./src/less/*.css')
        .pipe(rev())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/less'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/less'));
})

// js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function () {
    return gulp.src(jsSrc)
        .pipe(rev())                                //给文件添加hash编码
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({

            mangle: true,//类型：Boolean 默认：true 是否修改变量名

            compress: true,//类型：Boolean 默认：true 是否完全压缩

            // preserveComments: 'all'//保留所有注释

        }))
        // .pipe(concat('login.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rev.manifest())                       //生成rev-mainfest.json文件作为记录
        .pipe(gulp.dest('./rev/js'));
});

// 只需要移动的文件夹
gulp.task('move',function(){
    var images = gulp.src(imgSrc)
        // .pipe(cache(imagemin({
        //     optimizationLevel: 3, // 类型：Number  默认：3  取值范围：0-7（优化等级）
        //     progressive: true, // 类型：Boolean 默认：false 无损压缩jpg图片
        //     interlaced: true, // 类型：Boolean 默认：false 隔行扫描gif进行渲染
        //     multipass: true // 类型：Boolean 默认：false 多次优化svg直到完全优化
        // })))
        .pipe(gulp.dest('./dist/img'));

    var need = gulp.src(libSrc)
        .pipe(gulp.dest('./dist/lib'))

    var font = gulp.src(fontSrc)
        .pipe(gulp.dest('./dist/font'))

    return merge(images, need, font);
})

// Html替换css、js文件版本
gulp.task('revHtml', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    return gulp.src(['./rev/*/*json', './src/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(htmlmin(options))
        .pipe(revCollector())                         // 替换html中对应的记录
        .pipe(gulp.dest('./dist'));                   // 输出到该文件夹中
});

// 清理文件
gulp.task('clean', function () {
    return gulp.src(['./dist'], { read: false })
        .pipe(clean());
});

// 开发构建
gulp.task('default',['clean'], function (done) {
    condition = false;
    //依次顺序执行
    runSequence(
        ['revCss'],
        ['orignalLess'],
        ['revJs'],
        ['move'],
        ['revHtml'],
        done);
});








// var gulp = require('gulp'),
//     concat = require('gulp-concat'),//文件合并
//     uglify = require('gulp-uglify'),//js压缩
//     minifyCss = require('gulp-minify-css'),//css压缩
//     rev = require('gulp-rev'),//对文件名加MD5后缀
//     clean = require('gulp-clean'),//清理
//     revCollector = require('gulp-rev-collector');//路径替换

// //css处理任务
// gulp.task('mini-css', function () {
//     gulp.src(['./src/css/*.css'])
//         .pipe(minifyCss())
//         .pipe(rev())
//         .pipe(gulp.dest('./dist/css'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('./rev/css'));
// });
// //js处理任务
// gulp.task('mini-js', function () {
//     gulp.src(['./src/js/*.js'])
//         .pipe(uglify({
//             //mangle: true,//类型：Boolean 默认：true 是否修改变量名
//             mangle: true
//         }))
//         .pipe(rev())
//         .pipe(gulp.dest('./dist/js'))
//         .pipe(rev.manifest())
//         .pipe(gulp.dest('./rev/js'));
// });
// //路径替换任务
// gulp.task('rev', function () {
//     gulp.src(['./rev/*/*json', './src/*.html'])
//         .pipe(revCollector())
//         .pipe(gulp.dest('./dist'));
// });
// //清理文件
// gulp.task('clean', function () {
//     return gulp.src(['./dist'], { read: false })
//         .pipe(clean());
// });
// //图片处理，
// gulp.task('images', function () {
//     return gulp.src('src/img/**/*')
//         .pipe(gulp.dest('./dist/img'));
// });

// // gulp.task('default', ['mini-css', 'mini-js', 'images', 'rev']);

// gulp.task('default', ['clean'],function(){
//     gulp.start('mini-css', 'mini-js', 'images', 'rev');
// });