var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    del = require('del'),
    spa=require('browser-sync-spa');
    
var browserSync = require('browser-sync').create();

gulp.task('styles', function () {
    return sass('src/styles/*.scss', { style: 'expanded' })
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('css'))
            
       
  

});
browserSync.use(spa({



    // Options to pass to connect-history-api-fallback.
    // If your application already provides fallback urls (such as an existing proxy server),
    // this value can be set to false to omit using the connect-history-api-fallback middleware entirely.
    history: {
        index: '/index.html'
    }
}));
gulp.task('watch',['styles'],function () {


    browserSync.init({
        server: {
            baseDir:'.',
            port:8081
        },
        port:8081
    });

    gulp.watch("src/styles/*.scss", ['styles']);
    gulp.watch("*.html").on('change', browserSync.reload);
     gulp.watch("views/*.html").on('change', browserSync.reload);
    gulp.watch("src/scripts/*.js").on('change',browserSync.reload);
     gulp.watch("css/*.css").on('change', browserSync.reload);

});
gulp.task('default', function () {


    gulp.start('watch');
});