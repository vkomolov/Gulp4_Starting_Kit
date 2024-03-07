'use strict';

//to eliminate "type": "module" in package.json

const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const cssbeautify = require("gulp-cssbeautify");
const removeCssComments = require("gulp-strip-css-comments");
const rename = require("gulp-rename");
const sassAux = require("sass");
const gulpSass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const panini = require("panini");
const imagemin = require("gulp-imagemin");
const del = require("del");
const sync = require("browser-sync");

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

function html() {
  return src(path.src.html, { base: srcPath })
      .pipe(dest(path.build.html));
}

exports.html = html;