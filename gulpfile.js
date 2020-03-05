const syntax = 'scss';
const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');

function sync() {
  cssStyle();
  browserSync.init({
      server: {
          baseDir: "app"
      }
  });
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/' + syntax + '/**/*.' + syntax, cssStyle);
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

exports.default = sync;