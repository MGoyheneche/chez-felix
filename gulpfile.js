var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var del = require('del');

gulp.task('clean', function () {
  del(['./dist'], function (err, deletedFiles) {
      console.log('Files deleted:', deletedFiles.join(', '));
  });
});

gulp.task('less', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/style/'));
});

gulp.task('jade', function() {
  gulp.src('./src/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
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

gulp.task('default', ['jade', 'less', 'watch', 'connect']);
