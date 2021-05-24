// noinspection RegExpDuplicateAlternationBranch
import "../../js/_Prototype-Array";
import "../node-localstorage/src/index";
import * as gulp from "gulp";
import process from "../compiler/process";
import * as fs from "fs";
import { createApp, multiMinify, views } from "./gulpfile-app";
import { doc } from "./gulpfile-doc";
import { fixDeps } from "./func";
import { gulpWatch, gulpWatch2 } from "./gulpfile-watch";

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
gulp.task("watch", gulp.series(gulpWatch));
gulp.task("watch2", gulp.series(gulpWatch2));

gulp.task("compile-view", function (done) {
    multiMinify(views());
    done();
});

gulp.task("default", gulp.series(["build", "watch"]));

/**
 * Create Documentation of javascript's
 */
gulp.task("doc", doc);
