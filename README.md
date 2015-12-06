# Recipe for setting up a React development environment on Mac/OSX 10.11.1 (El Capitan) 

* A set of instructions for getting started with a Gulp-based development environment for React with Browserify, Sass, and BrowserSync on Mac/OSX 10.11.1 El Capitan

## Author

* Randy Burgess, wrburgess, wrburgess@gmail.com
* Mobile, Web, and TV apps Developer
* All Aboard Apps, LLC, USA

## Last Updated

* 2015-12-05

## Ingredients

* Gulp
* Browserify
* Babel
* React
* Sass 
* BrowserSync

## Steps

### Create project directory

* Create directory with `mkdir [dir name]`
* Move into your new directory with `cd [dir name` 

### Install base libraries

* Note: *Problems with npm on Mac with brew? Check out this [article](https://gist.github.com/wrburgess/7e18472f146a812625c1)* or this [one](http://www.johnpapa.net/how-to-use-npm-global-without-sudo-on-osx/)

1. Check and/or install latest node
  * `node -v` *version 5.1.1 as of last update*
  * If you need to install, use brew with `brew install node`
  * If you need to update, use brew with `brew upgrade node`
1. Check latest npm
  * `npm -v` *version 3.5.1 as of last update*
  * If you need to update, run `npm install -g npm@latest`

### Set up git

1. Initialize git with `git init`
1. Create a .gitignore file in your root with these contents:

```
.DS_Store
/.cache
/.sass-cache
/build
/node_modules
```

### Set up npm

* Initialize npm with `npm init` and follow process to create `package.json` file
* Note: *Answers to console questions are largely unimportant and can be changed later in your `package.json` file*

### Set up your dev directory structure

* Note: *Your choices here are largely your own, but lots of folks follow the `src` and `build` structures.
* Use `mkdir` to create your directories and `touch` to create files.
* Your dev env should look like this:

```
.
|-- build
|-- node_modules
|-- src
  |-- css
  |-- fonts
  |-- html
  |-- images
  |-- js
.gitignore
gulpfile.js
package.json
README.md
```

### Install Gulp

run commands:

```
npm install --save-dev gulp
npm install --save-dev gulp-util
npm install --save-dev gulp-rename
npm install --save-dev gulp-duration
npm install --save-dev chalk
```

edit `gulpfile.js` file:

```
'use strict';

// Import modules
var gulp = require('gulp');
var gulputil = require('gulp-util');
var duration = require('gulp-duration');
var rename = require('gulp-rename');
var chalk = require('chalk');

// Configuration
var config = {
  css: {
    srcPath: './src/css/*.sass',
    watchPath: './src/css/**/*',
    buildPath: './build/'
  },
  html: {
    srcPath: './src/html/*',
    watchPath: './src/html/**/*',
    buildPath: './build/'
  },
  images: {
    srcPath: './src/images/*.sass',
    watchPath: './src/images/**/*',
    buildPath: './build/'
  },
  js: {
    srcPath: './src/js/main.jsx',
    watchPath: './src/js/**/*',
    buildPath: './build/'
  },
  fonts: {
    srcPath: './src/fonts/*.sass',
    watchPath: './src/fonts/**/*',
    buildPath: './build/'
  }
};

// Default task for Gulp
gulp.task('default', function() {

});

```

### Install Babelify, Babel Presets, and React

run commands:

```
npm install --save-dev babelify
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react
npm install --save-dev browserify
```

Add to `gulpfile.js` in *Import modules* section

```
var babelify = require('babelify');
var browserify = require('browserify');
```

### Install Vinyl support

run commands:

```
npm install --save-dev vinyl-source-stream
npm install --save-dev vinyl-buffer
```

Add to `gulpfile.js` in *Import modules* section

```
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
```

### Install Sass processing

run commands:

```
npm install --save-dev gulp-sass
npm install --save-dev gulp-minify-css
npm install --save-dev gulp-autoprefixer
```

Add to `gulpfile.js` in *Import modules* section

```
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
```

### Add better error messaging

Add to `gulpfile.js` below config:

```
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
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}
```

### Add js bundler function

Add to `gulpfile.js` below `mapError` function:

```
function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError)
    .pipe(source(config.js.srcFile))
    .pipe(buffer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.js.buildPath))
    .pipe(bundleTimer)
}
```

### Add js task

Add below `default` gulp task:

```
// Process JavaScript
gulp.task('js', function() {
  var bundler = browserify(config.js.src, args)
    .transform(babelify, {presets: ['es2015', 'react']});
  bundle(bundler);
});
```

### Install Gulp Notify

run commands:

```
npm install --save-dev gulp-notify
```

Add to `gulpfile.js` in *Import modules* section

```
var notifier = require('node-notifier'); // Doesn't need to be installed
var notify = require('gulp-notify');
```

Sprinkle where necessary:

```
.pipe(notify({ message: 'Text to say: <%= dynamic.stuff %>' }))

or

notifier.notify({ message: 'Text to say: <%= dynamic.stuff %>' })
```

npm install --save-dev watchify
npm install --save-dev browser-sync
```

### Install BrowserSync

run commands:

```
npm install --save-dev browser-sync
```

setup task:

```
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});
```

## References

### libraries

* [node](https://nodejs.org)
* [npm](https://www.npmjs.com)
* [gulp](http://gulpjs.com/)
* [react](https://facebook.github.io/react/)
* [babel](https://babeljs.io/)
* [browserify](http://browserify.org/)
* [BrowserSync](http://www.browsersync.io/)

### npm quick reference

* `npm install` - installs a package, and any packages that it depends on
* `npm install -g` - installs a package as a global package
* `npm install --save-dev` - package will appear in your devDependencies
* `npm update -g` - update all the packages globally installed to the latest version
* `npm update --dev` - update all the packages in devDependencies to the latest version
* `npm prune` - remove packages not listed on parents packages' dependency list
* `npm prune --production` - remove the packages specified in your devDependencies

### links

* [Faster Gulp, Browserify, Babelify, Watchify and React build process explained](http://mikevalstar.com/post/fast-gulp-browserify-babelify-watchify-react-build/)


