'use strict';

//plugins
let gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    del = require('del');

// utils
let path = require('./src/js/utils/pathMap');
let init = require('./src/js/utils/funcCollection');

//scripts
gulp.task('clean', function (cb) {
    del([path.clean.html, path.clean.js, path.clean.style], cb());
});

gulp.task('serve', function (cb) {
    browserSync.init({
        server: {
            baseDir: path.build.html
        },
        port: 3000
    });
    cb();
});

gulp.task('build', gulp.series(
        'clean',
        gulp.parallel(buildJs, buildHtml, buildStyles, buildImg),
        'serve'
    )
);

gulp.task('watch', gulp.series(
        'clean',
        gulp.parallel(watchJs, watchHtml, watchStyles, watchImg),
        'serve'
    )
);

gulp.task('default', gulp.parallel('watch'));


function buildJs() {
    return init.bundleJs(browserSync);
}

function watchJs() {
    return init.bundleJs(browserSync, true);
}

function buildHtml() {
    return init.pipeHtml(browserSync);
}

function watchHtml() {
    return init.pipeHtml(browserSync, true);
}

function buildStyles() {
    return init.pipeStyle(browserSync);
}

function watchStyles() {
    return init.pipeStyle(browserSync, true);
}

function buildImg() {
    return init.pipeImg(browserSync);
}

function watchImg() {
    return init.pipeImg(browserSync, true);
}