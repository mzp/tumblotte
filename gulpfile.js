var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var fs = require("fs");
var source = require( 'vinyl-source-stream' );
var packager = require('electron-packager');
var preprocessify = require('preprocessify');

function compile(debug) {
  browserify({ entries: ['src/main.js'], debug })
    .transform(preprocessify({"DEBUG": debug }))
    .transform(babelify, {
      presets: ['stage-0', 'es2015', 'react']
    })
    .bundle()
    .pipe( source( 'bundle.js' ) )
    .pipe( gulp.dest( './app/' ));
};

gulp.task('build', function() {
  compile(true);
});

gulp.task('build:release', function() {
  compile(false);
});

gulp.task('package', ['build:release'], function(done) {
 packager({
   dir: 'app',
   out: 'package',
   name: 'Tumblr',
   arch: 'x64',
   platform: 'darwin',
   version: '0.36.2',
   overwrite: true
 }, function (err, path) {
   done();
 });
});

gulp.task('default', ['build']);
