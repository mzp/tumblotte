var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  browserify({ entries: ['app/js/main.js'] })
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('bundle/'));
});

gulp.task('default', ['build']);
