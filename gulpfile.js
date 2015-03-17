var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var slim = require('gulp-slim');
var connect = require('gulp-connect');

gulp.task('less', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/style/'));
});

gulp.task('slim', function(){
  gulp.src('./src/**/*.slim')
    .pipe(slim({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: './dist/',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./dist/**/*.html']).pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['./src/**/*.slim'], ['slim']);
  gulp.watch(['./src/**/*.less'], ['less']);
  gulp.watch(['./dest/'], ['reload']);
});

gulp.task('default', ['slim', 'less', 'watch', 'connect']);
