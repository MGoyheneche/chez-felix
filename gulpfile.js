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
  return gulp.src('./src/less/main.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'src/bower_components/bootstrap/less') ]
    }))
    .pipe(gulp.dest('./build/style/'));
});

gulp.task('js', function(){
  gulp.src('./src/js/**/*.js').pipe(gulp.dest('./build/js'));
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
   gulp.src('./src/images/**/*.*')
   .pipe(gulp.dest('./build/images/'));
});

// conf more modulable here rather than in bootstrap/variables.less
gulp.task('glyphicons', function() {
   gulp.src('./src/bower_components/bootstrap/fonts/**/*.*')
   .pipe(gulp.dest('./build/fonts'));
});


gulp.task('watch', function () {
  gulp.watch(['./src/jade/**/*.jade'], ['jade']);
  gulp.watch(['./src/less/**/*.less'], ['less']);
  gulp.watch(['./src/js/**/*.less'], ['js']);
  gulp.watch(
    [
      './build/**/*.html',
      './build/**/*.css',
      './build/**/*.js',
    ],
    ['reload']);
});

gulp.task('default', ['jade', 'js', 'less', 'glyphicons', 'copy', 'watch', 'connect']);
