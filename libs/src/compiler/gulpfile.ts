// noinspection RegExpDuplicateAlternationBranch
import "../../js/_Prototype-Array";
import "../node-localstorage/src/index";
import * as gulp from "gulp";
import framework from "../compiler/index";
import process from "../compiler/process";
import * as fs from "fs";
import { createApp } from "./gulpfile-app";
import { doc } from "./gulpfile-doc";
import { fixDeps } from "./func";
import { gulpWatch, watch2 } from "./gulpfile-watch";

const root = process.root;

localStorage.removeItem("compile");
console.clear();

/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task("build", function () {
  return build();
});

gulp.task("build-clear", function () {
  return build(true);
});

/**
 * Build Project
 * @param withoutApp
 */
export function build(withoutApp?: boolean) {
  return createApp(withoutApp);
}

export function reorderPkg() {
  try {
    const packageJson = root + "/package.json";
    if (fs.existsSync(packageJson)) {
      const json_pkg = JSON.parse(fs.readFileSync(packageJson).toString());
      fixDeps(json_pkg).then(function (json) {
        fs.writeFileSync(root + "/package.json", JSON.stringify(json, null, 2), {
          encoding: "utf-8",
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}

// watch libs/js/**/* and views
gulp.task("watch", gulpWatch);

gulp.task("assets-compile", function () {
  function filter(views: any[]) {
    return views
      .filter(function (item) {
        return (
          /\.(js|scss|css|sass|less)$/.test(item) &&
          !/\.min\.(js|css)$/.test(item) &&
          !/-ori|-original|-backup|\.bak/s.test(item)
        );
      })
      .map(function (asset) {
        return framework.normalize(asset);
      });
  }

  let css = framework.readdir(root + "/assets/css");
  // noinspection JSUnusedAssignment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  css = filter(css);
  let js = framework.readdir(root + "/assets/js");
  // noinspection JSUnusedAssignment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  js = filter(js);
});

gulp.task("default", gulp.series(["build", "watch"]));

/**
 * Create Documentation of javascript's
 */
gulp.task("doc", doc);
