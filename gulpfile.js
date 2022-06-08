const { src, dest, parallel, watch, series } = require('gulp');

const connect = require('gulp-connect');
const open = require('gulp-open');
// CSS-Sass
const sass = require('gulp-sass')(require('sass'));
const nano = require('gulp-cssnano');
const uncss = require('gulp-uncss');
// JS
const concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// HTML
const htmlValidator = require('gulp-w3c-html-validator');
const prettify = require('gulp-html-prettify');
const extender = require('gulp-html-extend');

const del = require('del');
const configuration = {
  environment: 'develop',
  extension: {
    html: '.html',
    sass: '.scss',
    css: '.css',
    js: '.js',
    pug: '.pug'
  },
  configFiles: [
    './service-worker.js',
    './manifest.json',
  ],
  assets: {
    directory: {
      root: 'assets/',
      images: 'assets/images',
    },
    js: [
      'scripts/**/*.js'
    ],
    css: [
      'scss/style.scss',
      'html/components/**/**/*.scss'
    ]
  },
  folders: {
    src: {
      html: 'html/',
      css: 'scss/',
      js: 'scripts/'
    },
    dest: './dist/',
    demo: './dist/demo/'
  },
  server: {
    port: 8001
  }
};

const connectServer = () => {
  return connect.server({
    root: 'dist/demo',
    port: configuration.server.port,
    livereload: true
  });
}
const openServer = () => {
  return src('dist/demo/index.html')
    .pipe(open({uri: 'http://localhost:' + configuration.server.port + '/'}));
}

const copyFolder = () => {
  return src([configuration.assets.directory.root + '**/*']).pipe(dest(configuration.folders.dest + 'assets'));
}

const html = {
  validate() {
    return src(configuration.folders.demo + '**/*' + configuration.extension.html)
      .pipe(htmlValidator({skipWarnings: true}))
      .pipe(htmlValidator.reporter())
      .pipe(connect.reload());
  },
  prettify() {
    return src(configuration.folders.demo + '*' + configuration.extension.html)
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(dest(configuration.folders.demo))
    .pipe(connect.reload());
  },
  extend() {
    return src(configuration.folders.src.html + '**/*' + configuration.extension.html)
        .pipe(extender({annotations:true,verbose:false, root: './'})) // default options
        .pipe(dest(configuration.folders.demo))
        .pipe(connect.reload());
  },
  htmlClean() {
    return del([
      `${configuration.folders.demo}base`,
      `${configuration.folders.demo}components`
    ]);
  },
  destClean() {
    return del([
      `${configuration.folders.dest}`
    ]);
  },

}

const css = () => {
  return src(configuration.assets.css)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.min' + configuration.extension.css))
    .pipe(nano())
    .pipe(dest(configuration.folders.demo))
    .pipe(connect.reload());
}

const unCss = () => {
  return src(configuration.folders.demo + 'style.min' + configuration.extension.css)
  .pipe(uncss({
    html: [configuration.folders.demo + '/**/*.html']
  }))
  .pipe(nano())
  .pipe(dest(configuration.folders.demo))
}

const js = () => {
  return src(configuration.assets.js)
    .pipe(concat('app.min' + configuration.extension.js))
    .pipe(uglify())
    .pipe(dest(configuration.folders.demo))
    .pipe(connect.reload());
}

const watchAssets = () => {
  watch(configuration.folders.src.html + '**/*' + configuration.extension.html, this.html);
  // watch(configuration.folders.src.css + '**/*' + configuration.extension.sass, css);
  watch([configuration.folders.src.css + '**/*' + configuration.extension.sass, configuration.assets.css[2]], css);
  watch(configuration.folders.src.js + '**/*' + configuration.extension.js, js);
}

const copyConfigFiles = () => {
  return src(configuration.configFiles).pipe(dest(configuration.folders.dest));
}

const copyScssFiles = () => {
  return src(configuration.folders.src.css + '**/*').pipe(dest(configuration.folders.dest + configuration.folders.src.css));
}

exports.html = series(html.prettify, html.extend, html.htmlClean);

exports.default = series(html.destClean, parallel(css, js, this.html), unCss, copyFolder);
exports.watch = series(this.default, parallel(connectServer, watchAssets, openServer));
exports.build = series(html.destClean, parallel(css, js), this.html, unCss, copyFolder, copyConfigFiles, copyScssFiles);
exports.deploy = series(html.destClean, parallel(css, js), copyFolder, copyConfigFiles, copyScssFiles);
