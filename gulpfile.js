var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var fs = require("fs");
var source     = require( 'vinyl-source-stream' );

gulp.task('build', function() {
  browserify({ entries: ['app/js/main.js'], debug: true })
    .transform(babelify, {
      presets: ['stage-0', 'es2015', 'react']
    })
    .bundle()
    .pipe( source( 'main.js' ) )
    .pipe( gulp.dest( './app/bundle' ));
});

gulp.task('default', ['build']);
