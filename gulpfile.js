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
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/' + syntax + '/**/*.' + syntax, cssStyle);
};

function cssStyle() {
  return src('app/' + syntax + '/**/*.' + syntax)
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.write('./'))
  .pipe(dest("app/css"))
  .pipe(browserSync.stream());
};

exports.default = sync;