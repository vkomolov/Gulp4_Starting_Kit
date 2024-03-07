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
import panini from "panini";
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import { deleteAsync } from "del";
import sync from "browser-sync";

const browserSync = sync.create();
const sass = gulpSass(sassAux);

const { src, dest } = gulp;

const srcPath = "src/";
const distPath = "dist/"

const path = {
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
    //images: `${ srcPath }assets/images/**/*`,
    images: `${ srcPath }assets/images/**/*.{jpg,png,svg,gif,ico,webp,xml,json,webmanifest}`,
    fonts: `${ srcPath }assets/fonts/**/*.{eot,woff,woff2,ttf}`,
  },
  watch: {
    html: `${ srcPath }*.html`,
    css: `${ srcPath }assets/scss/*.scss`,
    js: `${ srcPath }assets/js/*.js`,
    images: `${ srcPath }assets/images/**/*.{jpg,png,svg,gif,ico,webp,xml,json,webmanifest}`,
    fonts: `${ srcPath }assets/fonts/**/*.{eot,woff,woff2,ttf}`,
  },
  clean: `./${ distPath }`
};

export function handleHtml() {
  return src(path.src.html, { base: srcPath })
      .pipe(plumber())
      .pipe(dest(path.build.html));
}

export function handleCss() {
  return src(path.src.css, { base: `${ srcPath }assets/scss/` })
      .pipe(plumber())
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cssbeautify())
      .pipe(dest(path.build.css))
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
      .pipe(dest(path.build.css));
}

export function handleJs() {
  return src(path.src.js, { base: `${ srcPath }assets/js/` })
      .pipe(plumber())
      .pipe(rigger())
      .pipe(dest(path.build.js))
      .pipe(uglify())
      .pipe(rename({
        suffix: ".min",
        extname: ".js"
      }))
      .pipe(dest(path.build.js));
}

export function handleImages() {
  return src(path.src.images, { base: `${ srcPath }assets/images/` })
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
      .pipe(dest(path.build.images));
}

async function del(path) {
  return await deleteAsync(path);
}



/*import('gulp-autoprefixer').then(autoprefixer => {
  // теперь autoprefixer доступен здесь
  exports.html = html;
});*/

//exports.html = html;

