var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat')
    // rename = require('gulp-rename');

gulp.task('default', function(){
    gulp.watch('./sass/*.scss', ['sass']);
    // gulp.watch('./css/normal/*.css', ['minifycss']);
});
// gulp.task('minifycss', function(){
//     gulp.src('./css/normal/*.css')
//         .pipe(concat('all.min.css'))
//         .pipe(minifycss())
//         .pipe(gulp.dest('./css/min'))
// });

gulp.task('sass', function(){
    console.log(333);
    gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/normal'))
        .pipe(concat('all.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./css/min'));
});
