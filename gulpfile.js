const syntax = 'scss';
const {src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const htmlreplace = require('gulp-html-replace');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const postUncss = require('postcss-uncss');

function sync() {
  cssStyle();
  browserSync.init({
      server: {
          baseDir: "app"
      }
  });
  watchFiles();
};

function cssStyle() {
  return src('app/' + syntax + '/**/*.' + syntax)
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(dest("app/css"))
  .pipe(browserSync.stream());
};

function watchFiles() {
  watch('app/' + syntax + '/**/*.' + syntax, cssStyle);
  watch('app/**/*.html', reloadBrowser);
  watch('app/**/*.php', reloadBrowser);
  watch('app/js/**/*.js', reloadBrowser);
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function buildHtml(done) {
  src('app/index.html')
    .pipe(htmlreplace({
        'js': 'js/main.min.js',
        'css': 'css/main.min.css'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist'));
  done();
}

function buildPhp(done) {
  src('app/*.php').pipe(dest('dist/'));
  src('app/phpmailer/**/*', {dot:true}).pipe(dest('dist/phpmailer'));
  done();
}

function buildCss(done) {
  var plugins = [
    postUncss({
      html: ['app/index.html'],
      ignore: [/\.swiper-.*/, /\.modal.*/, /\.overlay.*/, /\.slider.*/]
    })
  ];
  src('app/css/**/*.css')
  .pipe(postcss(plugins))
  .pipe(cleanCSS({
    compatibility: 'ie8'
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(dest('dist/css'));
  done();
}

function  buildJs(done) {
  src(['app/js/libs/*.js', 'app/js/main.js'])
    .pipe(concat('main.js'))
    .pipe(minify({
      ext: {
        min: '.min.js'
      },
      noSource: true
    }))
    .pipe(dest('dist/js'));
  done();
}

function buildFonts(done) {
  src('app/fonts/**/**')
    .pipe(dest('dist/fonts'));
  done();
}

function buildImg(done) {
  src('app/img/**/**')
    .pipe(imagemin({progressive: true}))
    .pipe(dest('dist/img'));
  done();
}

exports.default = sync;
exports.build = series(buildHtml, buildPhp, buildCss, buildJs, buildFonts, buildImg);