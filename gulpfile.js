var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var jade = require('gulp-jade');
var connect = require('gulp-connect');
var del = require('del');

gulp.task('clean', function () {
  del(['./build'], function (err, deletedFiles) {
      console.log('Files deleted:', deletedFiles.join(', '));
  });
});

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src/bower_components/bootstrap/less') ]
    }))
    .pipe(gulp.dest('./build/style/'));
});

gulp.task('jade', function() {
  gulp.src('./src/jade/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('connect', function() {
  connect.server({
    root: './build/',
    livereload: true
  });
});

gulp.task('reload', function () {
  gulp.src(['./build/**/*.html']).pipe(connect.reload());
});

gulp.task('copy', function() {
   gulp.src('./src/bower_components/**/*.*')
   .pipe(gulp.dest('./build/vendors/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/jade/**/*.jade'], ['jade']);
  gulp.watch(['./src/less/**/*.less'], ['less']);
  gulp.watch(
    [
      './build/**/*.html',
      './build/**/*.css',
      './build/**/*.js',
    ],
    ['reload']);
});

gulp.task('default', ['jade', 'less', 'copy', 'watch', 'connect']);
