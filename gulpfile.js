require("./dist/src/compiler/gulpfile");
const gulp = require("gulp");
var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function () {
  return gulp.src(["libs/src/js/*.ts"]).pipe(
    typedoc({
      out: "docs/js/",
      name: "My project title",
    })
  );
});
