const syntax = 'scss';
const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

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
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
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

exports.default = sync;