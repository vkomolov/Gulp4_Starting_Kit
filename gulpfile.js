'use strict';

//plugins
let gulp = require('gulp'),
    browserSync = require("browser-sync").create(),
    del = require('del');

// utils
let path = require('./src/utils/pathMap');
let init = require('./src/utils/funcCollection');

//scripts
gulp.task('clean', function (cb) {
    del(
        [
            path.clean.html,
            path.clean.img,
            path.clean.js,
            path.clean.style,
            path.clean.php
        ], cb()
    );
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
        gulp.parallel(buildJs, buildHtml, buildStyles, buildImg, buildPhp),
        'serve'
    )
);

gulp.task('watch', gulp.series(
        'clean',
        gulp.parallel(watchJs, watchHtml, watchStyles, watchImg, watchPhp),
        'serve'
    )
);

gulp.task('default', gulp.parallel('watch'));


function buildJs(cb) {
    init.bundleJs(browserSync);
    cb();
}

function watchJs(cb) {
    init.bundleJs(browserSync, true);
    cb();
}

function buildHtml(cb) {
    init.pipeHtml(browserSync);
    cb();
}

function watchHtml(cb) {
    init.pipeHtml(browserSync, true);
    cb();
}

function buildStyles(cb) {
    init.pipeStyle(browserSync);
    cb();
}

function watchStyles(cb) {
    init.pipeStyle(browserSync, true);
    cb();
}

function buildImg(cb) {
    init.pipeImg(browserSync);
    cb();
}

function watchImg(cb) {
    init.pipeImg(browserSync, true);
    cb();
}

function buildPhp(cb) {
    init.pipePhp(browserSync);
    cb();
}

function watchPhp(cb) {
    init.pipePhp(browserSync, true);
    cb();
}