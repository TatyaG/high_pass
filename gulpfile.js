const { src, dest, series, watch } = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const image = require('gulp-image');
const notify = require('gulp-notify');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const sourcemaps = require('gulp-sourcemaps');

const del = require('del')
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();

let prod = false;

const isProd = (done) => {
  prod = true;
  done();
}

const clean = () => {
  return del(['dist'])
}

const styles = () => {
 return src('src/css/**/*.css')
  .pipe(gulpif(!prod, sourcemaps.init()))
  .pipe(concat('main.css'))
  .pipe(autoprefixer({
    cascade: false
  }))
  .pipe(gulpif(prod, cleanCSS({
    level: 2
  })))
  .pipe(gulpif(!prod, sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const htmlMinify = () => {
 return src('src/**/*.html')
 .pipe(gulpif(prod, htmlMin({
  collapseWhitespace: true,
 })))
 .pipe(dest('dist'))
 .pipe(browserSync.stream())
}

const scripts = () => {
  return src('src/**/*.js')
  .pipe(gulpif(!prod, sourcemaps.init()))
  .pipe(gulpif(prod, babel({
    presets: ['@babel/env']
  })))
  .pipe(concat('app.js'))
  .pipe(gulpif(prod, uglify().on('error', notify.onError())))
  .pipe(gulpif(!prod, sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const fonts = () => {
  return src('src/fonts/*')
  .pipe(dest('dist/fonts'))
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.png',
    'src/img/**/*.svg',
    'src/img/**/*.jpeg',
  ])
  .pipe(image())
  .pipe(dest('dist/img'))
}

watch('src/**/*.html', htmlMinify)
watch('src/css/**/*.css', styles)
watch('src/js/**/*.js', scripts)


exports.dev = series(clean, styles, htmlMinify, scripts, images, fonts, watchFiles)
exports.build = series(isProd, clean, styles, htmlMinify, scripts, images, fonts)
