var gulp = require('gulp');

var less = require('gulp-less');
var path = require('path');
var slim = require('gulp-slim');

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
    .pipe(gulp.dest('./dist/'));
});

