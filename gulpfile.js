var path = require('path');
var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var insert = require('gulp-insert');
var rimraf = require('rimraf');

var PATH = {
    BUILD: path.resolve('build'),
    BUILD_HTML: path.resolve('build/html'),
    BUILD_CSS: path.resolve('build/css'),
    BUILD_ASSETS: path.resolve('build/assets'),
    BUILD_LOCALES: path.resolve('build/locales'),
    BUILD_LIB: path.resolve('build/lib'),
    PUG: path.resolve('src/views/**/*.pug'),
    SASS: path.resolve('src/css/*.sass'),
    JS: path.resolve('src/**/*.js'),
    ASSETS: path.resolve('assets/*'),
    LOCALES: path.resolve('locales/*.json'),
    LIB: path.resolve('lib/**/*')
};

function clean(dir, cb) {
    rimraf(dir, {}, cb);
}

function buildViews() {
    return gulp.src(PATH.PUG)
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.resolve(PATH.BUILD_HTML)));
}

function buildCSS() {
    return gulp.src(PATH.SASS)
    .pipe(sass({
        pretty: true,
        outputStyle: 'expanded'
    }))
    .pipe(gulp.dest(PATH.BUILD_CSS));
}

function buildJS() {
    return gulp.src(PATH.JS)
        .pipe(concat('build.js'))
        .pipe(insert.wrap('(function(angular) {\n', '\n})(angular)'))
        .pipe(gulp.dest(PATH.BUILD));
}

function copySources() {
    var sources = [PATH.JS, PATH.ASSETS, PATH.LOCALES, PATH.LIB];
    var targets = [PATH.BUILD, PATH.BUILD_ASSETS, PATH.BUILD_LOCALES, PATH.BUILD_LIB];

    return sources.map(function(source, index) {
        gulp.src(source)
            .pipe(gulp.dest(targets[index]));
    });
}

gulp.task('build-views', function() {
    buildViews();
});

gulp.task('build-css', function() {
    buildCSS();
});

gulp.task('build-js', function() {
    buildJS();
});

gulp.task('copy-js', function() {
    copySources();
});

gulp.task('build', function() {
    // clean(PATH.BUILD, function () {
        buildViews();
        buildCSS();
        // copySources();
    // });
});

gulp.task('watch', function() {
    gulp.watch(PATH.PUG, buildViews);
    gulp.watch(PATH.SASS, buildCSS);
});
