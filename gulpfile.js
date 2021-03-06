var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var purgecss = require('gulp-purgecss');

// Purge that nasty Bootstrap CSS
gulp.task('purgecss', () => {
    return gulp.src('docs/css/*.css')
        .pipe(purgecss({
            content: ['docs/*.html']
        }))
        .pipe(gulp.dest('docs/purecss'))
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("docs/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("docs/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./docs/"
    });

    gulp.watch("docs/scss/*.scss", gulp.series('sass'));
    gulp.watch("docs/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));