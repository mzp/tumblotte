var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var fs = require("fs");

gulp.task('build', function() {
  browserify({ entries: ['app/js/main.js'] })
    .transform(babelify, {
      "presets": ["es2015", "stage-0", "react"]
    })
    .bundle()
    .pipe(fs.createWriteStream("bundle/main.js"));
});

gulp.task('default', ['build']);
