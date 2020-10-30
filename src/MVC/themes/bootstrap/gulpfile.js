var gulp = require("gulp"),
  sass = require("gulp-sass"),
  del = require("del"),
  uglify = require("gulp-uglify"),
  cleanCSS = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  merge = require("merge-stream"),
  htmlreplace = require("gulp-html-replace"),
  autoprefixer = require("gulp-autoprefixer"),
  browserSync = require("browser-sync").create();

gulp.task("do-something", function () {
  var vendorScripts1 = gulp
    .src("fontawesome-5/*.css")
    .pipe(/* I want to do something*/);

  var vendorScripts2 = gulp
    .src("js/*.js")
    .pipe(/* I want to do something else here*/);

  return merge(vendorScripts1, vendorScripts2).pipe(/*bla bla bla*/);
});
