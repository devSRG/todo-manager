var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass');

gulp.task('clean', function() {

});

gulp.task('build_pug', function() {
  gulp.src(['src/views/*.pug', 'src /components/*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build/html'));
});

gulp.task('build_sass', function() {
  gulp.src(['src/css/styles.sass', 'src/css/login.sass'])
    .pipe(sass({
      pretty: true,
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('build_js', function() {
  gulp.src('src/**/*.js')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['build_pug', 'build_sass', 'build_js']);

gulp.task('watch', function() {
  gulp.watch(['src/views/**/*.pug', 'src/js/components/*.pug'], ['pug']);
  gulp.watch('src/css/*.sass', ['sass']);
});
