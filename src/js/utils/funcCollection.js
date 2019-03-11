'use strict';

//plugins
let gulp = require('gulp'),
    htmlMin = require('gulp-htmlmin'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    watch = require('gulp-watch'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rename = require('gulp-rename'),
    getSize = require('gulp-filesize'),
    uglify = require('gulp-uglify'),
    exorcist = require('exorcist'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin");

// utils
let path = require('./pathMap');

exports.bundleJs = ( browserSync, watching=false ) => {

    let bundler = browserify(path.src.js, { debug: true })
        .transform(babelify.configure(
            {
                presets: ['@babel/preset-env']
            }
        ));

    if ( watching ) {
        console.log("=> watching JS");

        let watcher = watchify(bundler);
        watcher.on('update', () => {
            return rebundle(watcher)
                .pipe(browserSync.stream({once: true}));
        });

    } else {
        console.log('=> building JS');
    }

    return rebundle(bundler)
        .pipe(browserSync.stream({once: true}));

    function rebundle(bundler) {
        return bundler.bundle()
            .on('error', function(err) {
                browserSync.notify(`Browserify Error! ${err}`);
                this.emit('end');
            })
            .pipe(exorcist(`${path.build.js}bundle.js.map`)) //separate file
            .pipe(source('bundle.js'))  //outcome file
            .pipe(buffer())             //convert streaming vinyl files
            .pipe(getSize())            //getting size before uglify()
            .pipe(gulp.dest(path.build.js))
            .pipe(rename({suffix: ".min"})) //separate bundle.min.js
            .pipe(uglify())
            .pipe(getSize())            //getting size after uglify()
            .pipe(gulp.dest(path.build.js))
    }
};

exports.pipeHtml = ( browserSync, watching=false ) => {
    if ( watching ) {
        console.log("=> watching HTML");

        watch(path.watch.html, () => {
            return processHtml()
                .pipe(browserSync.stream({once: true}));
        });
    } else {
        console.log("=> building HTML");
    }
    return processHtml()
        .pipe(browserSync.stream({once: true}));

    function processHtml() {
        return gulp.src(path.src.html)
            .pipe(getSize())                //getting size before htmlMin()
            .pipe(htmlMin({ collapseWhitespace: true }))
            .pipe(getSize())            //getting size after htmlMin()
            .pipe(gulp.dest(path.build.html));
    }
};

exports.pipeStyle = ( browserSync, watching=false ) => {
    if ( watching ) {
        console.log("=> watching Style");

        watch(path.watch.style, () => {
            return processStyle()
                .pipe(browserSync.stream({once: true}));
        });
    } else {
        console.log("=> building Style");
    }
    return processStyle()
        .pipe(browserSync.stream({once: true}));

    function processStyle() {
        return gulp.src(path.src.style)
            .pipe(getSize())                //getting size before processing
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false,
                grid: "no-autoplace"
            }))
            .pipe(gulp.dest(path.build.style))
            .pipe(rename({suffix: ".min"})) //renaming bundle.min.css
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(getSize())                //getting size after processing
            .pipe(gulp.dest(path.build.style));
    }
};

exports.pipeImg = ( browserSync, watching=false ) => {
    if ( watching ) {
        console.log("=> watching Img");

        watch(path.watch.img, () => {
            return processImg()
                .pipe(browserSync.stream({once: true}));
        });
    } else {
        console.log("=> building Style");
    }
    return processImg()
        .pipe(browserSync.stream({once: true}));

    function processImg() {
        return gulp.src(path.src.img)
            .pipe(getSize())                //getting size before processing
            .pipe(newer(path.build.img))    //checking for newer files
            .pipe(imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 5 }),
                    imagemin.svgo({
                        plugins: [
                            {
                                removeViewBox: false,
                                collapseGroups: true
                            }
                        ]
                    })
                ]
            ))
            .pipe(getSize())                //getting size after processing
            .pipe(gulp.dest(path.build.img));
    }
};
