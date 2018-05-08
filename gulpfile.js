var gulp = require('gulp');
var less = require('gulp-less'); // компиляция less файлов
var browserSync = require('browser-sync'); // создание и обновление локального сервера
var autoprefixer = require('autoprefixer');// расставляет префиксы в css файлах
var gulpAutoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var csscss = require('gulp-csscss')
var cleanCss=require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var htmlmin = require('gulp-htmlmin');
var htmlhint = require('gulp-htmlhint');
var imagemin = require('gulp-imagemin');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
// var uglifyjs = require('gulp-uglifyjs');
var uncss = require('gulp-uncss');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var shorthand= require('gulp-shorthand');
var cssnano = require('cssnano'); // минификатор сss в рамках postcss
var mQueries=require('gulp-group-css-media-queries');
var reload = browserSync.reload();
var paths = {

    styles: {
        src: 'app/less/*.less',
        dest: 'dist/css'
    },

};

gulp.task('imagemin', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(htmlhint())
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('dist'));

});

gulp.task('csso', function () {
    return gulp.src(['app/css/checkout1.css','app/css/index.css','app/css/product.css','app/css/shoping_cart.css','app/css/single_page.css'])
        //
        .pipe(uncss({
            html: ['app/*.html']
        }))
        .pipe(gulpAutoprefixer({browsers: ['cover 99.5%']}))
        .pipe(mQueries())
        .pipe(csso())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('autoprefixer', function () {
    return gulp.src('app/css/*.css')
        .pipe(gulpAutoprefixer({browsers: ['cover 99.5%']}))
        .pipe(gulp.dest('dist/css'));
});


gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css'));
});



gulp.task('exitServe', function () {
    browserSync.exit();
});
gulp.task('watch',function () {
 gulp.watch('app/less/*.less',['less'])
});


