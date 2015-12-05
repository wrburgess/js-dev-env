'use strict';

// Import modules
var gulp = require('gulp');

// Configuration
var config = {
  js: {
    src: './src/js/main.jsx',
    watch: './src/js/**/*',
    outputDir: './build/'
  },
  css: {
    src: './src/css/*.sass',
    watch: './src/css/**/*',
    outputDir: './build/'
  },
  html: {
    src: './src/html/*',
    watch: './src/html/**/*',
    outputDir: './build/'
  },
  images: {
    src: './src/images/*.sass',
    watch: './src/images/**/*',
    outputDir: './build/'
  },
  fonts: {
    src: './src/fonts/*.sass',
    watch: './src/fonts/**/*',
    outputDir: './build/'
  }
};

// Default task for Gulp
gulp.task('default', function() {
  var bundler = browserify(config.js.src, args)

  bundle(bundler);
});
