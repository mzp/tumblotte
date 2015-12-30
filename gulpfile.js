var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var fs = require("fs");

gulp.task('build', function() {
  browserify({ entries: ['app/js/main.js'] })
    .transform(babelify, {
      presets: ['stage-0', 'es2015', 'react']
    })
    .bundle()
    .pipe(fs.createWriteStream("bundle/main.js"));
});

gulp.task('default', ['build']);
