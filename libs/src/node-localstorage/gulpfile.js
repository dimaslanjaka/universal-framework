const gulp = require("gulp");
const exec = require("child_process").exec;
var coffee = require("gulp-coffee");

gulp.task("watch", function () {
  gulp.watch("./LocalStorage.coffee", function () {
    exec("coffee -c LocalStorage.coffee");
  });
});

gulp.task("build", async function () {
  gulp
    .src("./*.coffee")
    .pipe(coffee({ bare: true }))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("default", gulp.series("watch"));
