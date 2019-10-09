
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const rigger = require('gulp-rigger');
const browserSync = require('browser-sync').create();

/*function sassCompile(){
    return gulp.src('./src/scss/!**!/!*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error',sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/css'))
}

function styles(){
    return gulp.src('./src/css/!**!/!*.css')
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie7',
            level: 2
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}*/

function styles(){
    //return gulp.src('./src/scss/main.scss')
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(concat('all.css'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            compatibility: 'ie7',
            level: 2
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

function scripts(){
    return gulp.src('./src/js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}


function html(){
    return gulp.src('./src/html/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

function files() {
    return gulp.src('./src/files/**/*')
        .pipe(gulp.dest('./build/files'))
}

function watch(){
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    //gulp.watch('./src/scss/**/*.scss', sassCompile);
    gulp.watch('./src/scss/**/*.scss', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./src/html/**/*.html', html);
    gulp.watch('./*.html', browserSync.reload);
}

function clean(){
    return del(['build/*']);
}

//gulp.task('sass',sassCompile);
gulp.task('styles',styles);
gulp.task('scripts',scripts);
gulp.task('files',files);
gulp.task('watch',watch);
gulp.task('build', gulp.series(clean,
    gulp.parallel(files,styles,scripts,html))
);
gulp.task('dev', gulp.series('build', 'watch'));