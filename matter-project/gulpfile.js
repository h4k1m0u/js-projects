const {
  src,
  dest,
  series,
  watch,
} = require('gulp');
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const del = require('del');
const minify = require('gulp-minify');
const sync = require('browser-sync').create();

function clean() {
  return del('dist');
}

function generateHTML() {
  return src('src/views/main.ejs')
    .pipe(ejs({ title: 'My page title' }))
    .pipe(rename({ basename: 'index', extname: '.html' }))
    .pipe(dest('dist'));
}

function generateCSS() {
  return src('src/scss/style.scss')
    .pipe(sass())
    .pipe(dest('dist'));
}

function generateJS() {
  return src('src/*.js')
    .pipe(minify())
    .pipe(dest('dist'));
}

function watchFiles() {
  sync.init({
    server: {
      baseDir: './dist/',
      index: 'index.html',
    },
  });

  watch('src/views/*.ejs', { ignoreInitial: false }, generateHTML)
    .on('change', sync.reload);
  watch('src/scss/*.scss', { ignoreInitial: false }, generateCSS)
    .on('change', sync.reload);
  watch('src/*.js', { ignoreInitial: false }, generateJS)
    .on('change', sync.reload);
}

module.exports = {
  default: watchFiles,
  build: series(clean, generateHTML, generateCSS, generateJS),
};
