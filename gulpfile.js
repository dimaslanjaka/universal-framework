require("./dist/src/compiler/gulpfile");

const fs = require("fs");
const path = require("path");
const siteConfig = require("./config.json");
const webConfig = {
  google: {
    key: siteConfig.google.key,
    recaptcha: {
      key: siteConfig.google.recaptcha.key,
    },
    analystics: {
      id: siteConfig.google.analystics.id,
    },
  },
};

fs.writeFileSync(path.join(__dirname, "/libs/js/_conf.ts"), "const siteConfig = " + JSON.stringify(webConfig));

/*
const gulp = require("gulp");
var typedoc = require("gulp-typedoc");
gulp.task("typedoc", function () {
  return gulp.src(["libs/js/*.ts"]).pipe(
    typedoc({
      out: "docs/js/",
      name: "My project title",
      exclude: "libs/src/smartform/dist/**",
    })
  );
});
*/
