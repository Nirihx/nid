const { src, dest, task, watch, series, parallel, lastRun } = require('gulp');

const sourcemaps    = require('gulp-sourcemaps');
const sass          = require('gulp-sass');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const replace       = require('gulp-replace');
const babel         = require('gulp-babel');
const fileinclude   = require('gulp-file-include');
const strip         = require('gulp-strip-comments');
const image         = require('gulp-image');

// File source paths
// const projetSource = 'src'
const projetSourceName = 'src'

const files = { 
    imgPath: projetSourceName + '/img/**/*',
    scssPath: projetSourceName + '/scss/**/*.scss',
    jsPath: projetSourceName + '/js/**/*.js',
    htmlPath: projetSourceName + '/**/*.html',
    faFontPath: 'node_modules/@fortawesome/fontawesome-free/webfonts/*'
}

// File destination paths
// const projetDestName = 'ny'
const projetDestination = 'dist' 

const destination = {
    projetDist: projetDestination
}

// Sass task
function scssTask(){    
    return src([files.scssPath,])
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass()) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest(destination.projetDist + '/css')
    ); // put final CSS in dist folder
}
task(scssTask)

// JS task
function jsTask(){
    return src([
            files.jsPath
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(destination.projetDist + '/js')
    );
}

// html Cachebust
function cacheBustTask(){
    // var cbString = new Date().getTime();
    return src([
        projetSourceName + '/index.html', 
    ])
    // .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(strip())
    .pipe(dest(destination.projetDist));
}

// Watch task
function watchTask(){
    watch([files.jsPath, files.htmlPath],        
        {interval: 200, usePolling: true}, //Makes docker work
        series(
            parallel(jsTask),
            cacheBustTask
        )
    );
}

function fontTask(){
    return src([files.faFontPath])
    .pipe(dest(destination.projetDist + '/fonts'));
}
task(fontTask)

// image task
function imageTask(){    
    return src(files.imgPath, { since: lastRun(imageTask) })
        .pipe(image()) 
        .pipe(dest(destination.projetDist + '/img')
    ); 
}
task(imageTask);

// Export the default Gulp task
exports.default = series(
    parallel(scssTask, jsTask), 
    cacheBustTask,
    watchTask
);

// // build task
function build(){
    return src([files.scssPath, files.jsPath, files.htmlPath, files.faFontPath, files.imgPath],        
        {interval: 200, usePolling: true}, //Makes docker work
        series(
            parallel(scssTask, jsTask),
            cacheBustTask, imageTask, fontTask 
        )
    );
}
task(build);
// // Export the default Gulp task
// exports.default = series(
//     parallel(scssTask, jsTask), 
//     cacheBustTask,
//     watchTaskScss
// );