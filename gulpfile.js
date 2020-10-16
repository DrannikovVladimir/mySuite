const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

//Сборка в разрботку
gulp.task('sass', () => gulp.src('src/sass/style.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream()));

gulp.task('server', () => {
  browserSync.init({
    server: 'src'
  });

  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('start', gulp.series('sass', 'server'));
