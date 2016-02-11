var gulp = require('gulp');

var appdmg = require('gulp-appdmg');
var babelify = require('babelify');
var browserify = require('browserify');
var fontAwesome = require('node-font-awesome');
var mocha = require('gulp-mocha');
var packager = require('electron-packager');
var preprocessify = require('preprocessify');
var source = require( 'vinyl-source-stream' );
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');

function compile(debug) {
  browserify({ entries: ['src/main.js'], debug: debug })
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

gulp.task('test', function() {
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      require: 'test/bootstrap',
      compilers: {
        js: require('babel-core/register')
      }
    }));
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
   'app-bundle-id': 'jp.mzp.tumblotte',
   'app-version': '0.1.0',
   arch: 'x64',
   dir: 'app',
   icon: 'assets/icons/icon.icns',
   name: 'Tumblotte',
   out: 'package',
   overwrite: true,
   platform: 'darwin',
   sign: 'Developer ID Application: HIROKI MIZUNO (VG2YYSKSHY)',
   version: '0.36.2',
 }, function (err, path) {
   done();
 });
});

gulp.task('dmg', ['package'], function() {
  function pad(n){return n<10 ? '0'+n : n.toString(); }
  var date = new Date();
  var name = pad(date.getFullYear())
    + pad(date.getMonth() + 1)
    + pad(date.getDate());

  return gulp.src([])
    .pipe(appdmg({
      source: 'assets/dmg/appdmg.json',
      target: 'Tumblotte-' + name + '.dmg'
    }));
});

gulp.task('build', ['build:css', 'build:font', 'build:js']);
gulp.task('default', ['build']);
