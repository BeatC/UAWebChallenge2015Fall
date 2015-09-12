// Package loading BEGIN

var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');

// Package loading END

// Paths definition BEGIN

var paths = {
    markup: "src/markup/",
    styles: "src/styles/",
    scripts: "src/scripts/",
    images: "src/images/"
};

// Paths definition END

// Jade files compilation and server reloading task
gulp.task('jade', function () {
    gulp.src(paths.markup  + '**/*')
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

// SCSS files compilation, sourcemaps generation and server reloading task
gulp.task('sass', function () {
    gulp.src(paths.styles + '**/*')
        .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'compressed'
            }))
            .pipe(autoprefixer())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
});

// JS uglifying, sourcemaps generation and server reloading task
gulp.task('js', function () {
    gulp.src(paths.scripts + '**/*')
        .pipe(sourcemaps.init())
            .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

// Image compressing and automating spritesheet generation task
gulp.task('spritesheet', function () {
    // TODO: Implement sprite generation
});

// Server config task
gulp.task('server', function () {
    connect.server({
        root: 'dist/',
        livereload: true,
        port: 1337
    });
});

// HTML and CSS linter task
gulp.task('lint', function () {
    // TODO: Implement task for HTML and CSS linters
});

// Gulp watcher
gulp.task('watch', function () {
    gulp.watch(paths.markup, ['jade', 'lint']);
    gulp.watch(paths.styles, ['sass', 'lint']);
    gulp.watch(paths.scripts, ['js', 'lint']);
    gulp.watch(paths.images, ['spritesheet']);
});

// Default development set of tasks
gulp.task('dev', ['server', 'jade', 'sass', 'js', 'spritesheet', 'lint']);

// Default set of tasks
gulp.task('default', ['server']);
