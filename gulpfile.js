let gulp = require('gulp');//1
let less = require('gulp-less'); // компиляция less файлов
let BS = require('browser-sync'); // создание и обновление локального сервера
let autoPrefix = require('gulp-autoprefixer');
let cssMinify = require('gulp-csso');
let htmlmin = require('gulp-htmlmin');
let htmlhint = require('gulp-htmlhint');
let imagemin = require('gulp-imagemin');
let rename = require('gulp-rename');
let uncss = require('gulp-uncss');
let shorthand = require('gulp-shorthand');
let reload = BS.reload();
let minifyJs = require('gulp-minify');
let babel = require('gulp-babel');
let delFiles = require('del');

gulp.task('html', function () {
    gulp.src(['./app/*.html'])
        .pipe(htmlhint())
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});
gulp.task('css', function () {
    gulp.src(['./app/css/**/*.css'])
        .pipe(autoPrefix({browsers: ['cover 99.5%']}))
        .pipe(cssMinify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('js', function () {
    gulp.src(['./app/script/**/*.js'])
        .pipe(babel())
        .pipe(minifyJs())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'));
});
gulp.task('img', function () {
    gulp.src(['./app/img/**/*'])
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('server', function () {
    BS.init({
        server: {
            baseDir: './app'
        }
    });
});
gulp.task('delFilesDist', function () {
    delFiles('./dist/*');
});
gulp.task('less', function () {
    delFiles('./app/css/*');
    gulp.src(['./app/less/**/*'])
        .pipe(less())
        .pipe(gulp.dest('./app/css'))
        .pipe(BS.stream());
});
gulp.task('serve', ['less'], function () {

    BS.init({
        server: "./app"
    });
    // gulp.watch("app/less/*.less", ['less']);
    gulp.watch("app/css/*.css").on('change', BS.reload);
    gulp.watch("app/*.html").on('change', BS.reload);
});
gulp.task('watch', function () {
    // gulp.watch(['./app/html/index.html'], ['html']);
    gulp.watch('./app/less/**/*.less', ['less']);
    // gulp.watch('./app/js/**/*.js', ['js']);
});