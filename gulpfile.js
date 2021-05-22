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
fs.writeFileSync(
  path.join(__dirname, "libs/src/compiler/config.ts"),
  "export const config = " + JSON.stringify(siteConfig)
);

gulp.task("ts-watch", function () {
  gulp.watch(["./libs/**/*.{js|ts}"], function () {});
});
