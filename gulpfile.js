'use strict';

// Import modules
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var chalk = require('chalk');
var duration = require('gulp-duration');
var gulp = require('gulp');
var gutil = require('gulp-util');
var minifycss = require('gulp-minify-css');
var notifier = require('node-notifier');
var notify = require('gulp-notify');
var react = require('react');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var watchify = require('watchify');

var reload = browserSync.reload;

// Configuration
var config = {
  css: {
    srcPath: './src/css/*.scss',
    watchPath: './src/css/**/*',
    buildPath: './build/'
  },
  html: {
    srcPath: './src/html/*.html',
    watchPath: './src/html/**/*',
    buildPath: './build/'
  },
  images: {
    srcPath: './src/images/*',
    watchPath: './src/images/**/*',
    buildPath: './build/'
  },
  js: {
    srcFile: 'main.jsx',
    srcPath: './src/js/',
    watchPath: './src/js/**/*',
    buildFile: 'main.min.js',
    buildPath: './build/'
  },
  fonts: {
    srcPath: './src/fonts/*.scss',
    watchPath: './src/fonts/**/*',
    buildPath: './build/'
  }
};

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    browserSync.notify("Browserify Error!");
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// Completes the final file outputs
function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError)
    .pipe(source(config.js.srcFile))
    .pipe(buffer())
    .pipe(rename(config.js.buildFile))
    .pipe(gulp.dest(config.js.buildPath))
    .pipe(bundleTimer)
    .pipe(reload({ stream: true }));
}

// Default task for Gulp
gulp.task('default', ['html', 'images', 'fonts', 'css', 'js', 'serve'], function() {
  notifier.notify({
    "subtitle": "Project web site",
    "message": "Click to open project site",
  });
});


gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

// Process JavaScript
gulp.task('js', function() {
  var bundler = browserify(config.js.srcPath + config.js.srcFile)
    .transform(babelify, { presets: ['es2015', 'react'] });
  bundle(bundler)
});

gulp.task('css', function() {
  gulp.src(config.css.srcPath)
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(config.css.buildPath))
    .pipe(reload({ stream: true }));
});

gulp.task('images', function() {
  gulp.src(config.images.srcPath)
    .pipe(gulp.dest(config.images.buildPath));
});

gulp.task('fonts', function() {
  gulp.src(config.fonts.srcPath)
    .pipe(gulp.dest(config.fonts.buildPath));
});

gulp.task('html', function() {
  gulp.src(config.html.srcPath)
    .pipe(gulp.dest(config.html.buildPath))
    .pipe(reload({ stream: true }));
});
