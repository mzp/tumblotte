var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var fontAwesome = require('node-font-awesome');
var source = require( 'vinyl-source-stream' );
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');
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

gulp.task('build:js', function() {
  compile(true);
});

gulp.task('build:js:release', function() {
  compile(false);
});

gulp.task('build:font', function () {
  gulp.src(fontAwesome.fonts)
    .pipe(gulp.dest('./app/fonts'));
});

gulp.task('build:css', function () {
  gulp.src('./assets/stylesheets/main.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      'paths' : [
        'node_modules/purecss/build/',
        'node_modules/font-awesome/css'
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/css'));
});

gulp.task('package', ['build:css', 'build:font', 'build:js:release'], function(done) {
 packager({
   dir: 'app',
   out: 'package',
   name: 'Tumblotte',
   arch: 'x64',
   platform: 'darwin',
   version: '0.36.2',
   overwrite: true
 }, function (err, path) {
   done();
 });
});

gulp.task('build', ['build:css', 'build:font', 'build:js']);
gulp.task('default', ['build']);
