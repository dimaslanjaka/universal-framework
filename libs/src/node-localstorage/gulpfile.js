const gulp = require("gulp");
const exec = require("child_process").exec;

gulp.task("watch", function () {
  gulp.watch("./LocalStorage.coffee", function () {
    exec("coffee -c LocalStorage.coffee");
  });
});

gulp.task("default", gulp.series("watch"));
