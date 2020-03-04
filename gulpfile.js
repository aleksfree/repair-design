const syntax = 'scss';
const {src, dest, watch} = require('gulp');
const sass = require('gulp-sass');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

function sync() {
  console.log('app/' + syntax + '/**/*.' + syntax);
  serveSass();
  browserSync.init({
      server: {
          baseDir: "app"
      }
  });
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/*.html').on('change', browserSync.reload);
  watch('app/' + syntax + '/**/*.' + syntax, serveSass);
};

function serveSass() {
  return src('app/' + syntax + '/**/*.' + syntax)
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(dest("app/css"))
  .pipe(browserSync.stream());
};

exports.default = sync;