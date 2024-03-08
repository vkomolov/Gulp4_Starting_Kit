'use strict';

import gulp from "gulp";
import rigger from "gulp-rigger";
import autoprefixer from "gulp-autoprefixer";
import cssbeautify from "gulp-cssbeautify";
import removeCssComments from "gulp-strip-css-comments";
import rename from "gulp-rename";
import * as sassAux from "sass";
import gulpSass from "gulp-sass";
import cssnano from "gulp-cssnano";
import uglify from "gulp-uglify";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import htmlmin from "gulp-htmlmin";
import panini from "panini";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { deleteAsync } from "del";
import sync from "browser-sync";

const browserSync = sync.create();
const sass = gulpSass(sassAux);

const { src, dest } = gulp;

const srcPath = "src/";
const distPath = "dist/"

const pathData = {
  build: {
    html: distPath,
    css: `${ distPath }assets/css/`,
    js: `${ distPath }assets/js/`,
    images: `${ distPath }assets/images/`,
    fonts: `${ distPath }assets/fonts/`,
  },
  src: {
    html: `${ srcPath }*.html`,
    css: `${ srcPath }assets/scss/*.scss`,
    js: `${ srcPath }assets/js/*.js`,
    images: `${ srcPath }assets/images/**/*.{jpg,png,svg,gif,ico,webp,xml,json,webmanifest}`,
    fonts: `${ srcPath }assets/fonts/**/*.{eot,woff,woff2,ttf,otf}`,
  },
  watch: {
    html: `${ srcPath }*.html`,
    css: `${ srcPath }assets/scss/*.scss`,
    js: `${ srcPath }assets/js/*.js`,
    images: `${ srcPath }assets/images/**/*.{jpg,png,svg,gif,ico,webp,xml,json,webmanifest}`,
    fonts: `${ srcPath }assets/fonts/**/*.{eot,woff,woff2,ttf,otf}`,
  },
  clean: `./${ distPath }`
};

export function handleHtml() {
  panini.refresh();

  return src(pathData.src.html, { base: srcPath })
      .pipe(plumber({
        errorHandler: getErrorHandler("HTML Error")
      }))
      .pipe(panini({
        root: srcPath,
        layouts: srcPath + "templates/layouts/",
        partials: srcPath + "templates/partials/",
        data: srcPath + "templates/data/"
      }))
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(dest(pathData.build.html))
      .pipe(browserSync.reload({ stream: true }));
}

export function handleCss() {
  return src(pathData.src.css, { base: `${ srcPath }assets/scss/` })
      //.pipe(plumber())
      .pipe(plumber({
        errorHandler: getErrorHandler("SCSS Error")
      }))
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssbeautify())
      .pipe(dest(pathData.build.css))
      .pipe(cssnano({
        zindex: false,
        discardComments: {
          removeAll: true
        }
      }))
      .pipe(removeCssComments())
      .pipe(rename({
        suffix: ".min",
        extname: ".css"
      }))
      .pipe(dest(pathData.build.css))
      .pipe(browserSync.reload({ stream: true }));
}

export function handleJs() {
  return src(pathData.src.js, { base: `${ srcPath }assets/js/` })
      //.pipe(plumber())
      .pipe(plumber({
        errorHandler: getErrorHandler("JS Error")
      }))
      .pipe(rigger())
      .pipe(dest(pathData.build.js))
      .pipe(uglify())
      .pipe(rename({
        suffix: ".min",
        extname: ".js"
      }))
      .pipe(dest(pathData.build.js))
      .pipe(browserSync.reload({ stream: true }));
}

export function handleImages() {
  return src(pathData.src.images, { base: `${ srcPath }assets/images/` })
      .pipe(imagemin([
        gifsicle({interlaced: true}),
        mozjpeg({quality: 75, progressive: true}),
        optipng({optimizationLevel: 5}),
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: true
            },
            {
              name: 'cleanupIDs',
              active: false
            }
          ]
        })
      ]))
      .pipe(dest(pathData.build.images))
      .pipe(browserSync.reload({ stream: true }));
}

export function handleFonts() {
  return src(pathData.src.fonts, { base: `${ srcPath }assets/fonts/` })
      .pipe(dest(pathData.build.fonts))
      .pipe(browserSync.reload({ stream: true }));
}

export async function clean() {
  return await del(pathData.clean);
}

export const buildFiles = gulp.series(
    clean,
    gulp.parallel(
        handleHtml,
        handleCss,
        handleJs,
        handleImages,
        handleFonts
    )
);

export const watch = gulp.series(buildFiles, watchFiles);
gulp.task('default', watch);

function watchFiles() {
  gulp.watch(pathData.watch.html, handleHtml);
  gulp.watch(pathData.watch.css, handleCss);
  gulp.watch(pathData.watch.js, handleJs);
  gulp.watch(pathData.watch.images, handleImages);
  gulp.watch(pathData.watch.fonts, handleFonts);
}

async function del(path) {
  return await deleteAsync(path);
}

function getErrorHandler(errorTitle="Error") {
  return function (err) {
    notify.onError({
      title: errorTitle,
      message: "Error: <%- error.message %>",

    })(err);
    this.emit("end");
  }
}