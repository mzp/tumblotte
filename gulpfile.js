var gulp = require('gulp');

var babelify = require('babelify');
var browserify = require('browserify');
var del = require('del');
var eslint = require('gulp-eslint');
var fontAwesome = require('node-font-awesome');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');
var react_jade = require('react-jade');
var source = require( 'vinyl-source-stream' );
var sourcemaps = require('gulp-sourcemaps');
var stylus = require('gulp-stylus');

// ============================================================
// Build
// ============================================================
function compile(debug) {
  return browserify({ entries: ['src/main.js'], debug: debug })
    .transform(babelify, {
      presets: ['stage-0', 'es2015', 'react']
    })
    .transform(react_jade)
    .bundle()
    .pipe( source( 'bundle.js' ) )
    .pipe( gulp.dest( './app/' ));
};

gulp.task('build:js', function() {
  compile(true)
    .pipe(livereload());
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

gulp.task('build', ['build:css', 'build:font', 'build:js']);
gulp.task('default', ['build']);

// ============================================================
// Clean
// ============================================================
gulp.task('clean', function(done) {
  del(['app/css', 'package', 'app/fonts', 'app/*.js'], done);
});

// ============================================================
// Test
// ============================================================
gulp.task('test', function() {
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      reporter: 'nyan',
      require: 'test/bootstrap',
      compilers: {
        js: require('babel-core/register')
      }
    }))
    .on('error', console.log);;
});

gulp.task('test:travis', function() {
  gulp.src(['test/**/*.js'], { read: false })
    .pipe(mocha({
      require: 'test/bootstrap',
      compilers: {
        js: require('babel-core/register')
      }
    }));
});

// ============================================================
// Lint
// ============================================================
function lintOption(mocha) {
  return {
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "node": true,
      "es6":true,
      "mocha": mocha
    },
    "plugins": [ "react" ],
    "parserOptions": { "ecmaFeatures": { "jsx": true } },
    "rules": {
      "react/jsx-uses-vars": 1 ,
      "no-unused-vars": [1, {"varsIgnorePattern": "React"}]
    }
  };
}

gulp.task('lint:src', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint(lintOption()))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:test', function () {
  return gulp.src(['test/**/*.js'])
    .pipe(eslint(lintOption(true)))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint', ['lint:src', 'lint:test']);

// ============================================================
// Package
// ============================================================
gulp.task('package', ['build:css', 'build:font', 'build:js:release'], function(done) {
  var packager = require('electron-packager');
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
    version: '0.36.2'
  }, function (err, path) {
    done();
  });
});

gulp.task('dmg', ['package'], function() {
  var appdmg = require('gulp-appdmg');
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

// ============================================================
// Watch
// ============================================================
gulp.task('watch:src', ['build'], function(){
  livereload.listen();
  gulp.watch('./src/**/*.js', ['build:js']);
  gulp.watch('./src/**/*.jade', ['build:js']);
  gulp.watch('./assets/stylesheets/*.styl', ['build:css']);
});

gulp.task('watch:test', ['test'], function(){
  gulp.watch('./src/**/*.js', ['test']);
  gulp.watch('./src/**/*.jade', ['test']);
  gulp.watch('./test/**/*.js', ['test']);
});
