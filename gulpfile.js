// Initialize modules - importing all the necessary npm packages for our Gulp tasks
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

// Sass Task - compiles SCSS to CSS, adds vendor prefixes, minifies the CSS, and generates source maps
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }))
}

// JavaScript Task - transpiles ES6+ code to ES5 using Babel, minifies the JavaScript, and generates source maps
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }))
}

// BrowserSync Task - initializes BrowserSync for live reloading and sets up a local server
function browserSyncServe(cb) {
    browserSync.init({
        server: {
            baseDir: '.'
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0'
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browserSync.reload();
    cb();
}

// Watch Task - watches for file changes and triggers corresponding tasks and browser reloads
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(
        ['app/scss/**/*.scss', 'app/js/**/*.js'],
        series(scssTask, jsTask, browserSyncReload)
    );
}

// Default Gulp Task 
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
