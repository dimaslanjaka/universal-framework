// noinspection RegExpDuplicateAlternationBranch
import "../../js/_Prototype-Array";
import "../node-localstorage/src/index";
import * as gulp from "gulp";
import framework from "../compiler/index";
import process from "../compiler/process";
import * as fs from "fs";
import { createApp, multiMinify, views } from "./gulpfile-app";
import { doc } from "./gulpfile-doc";
import { fixDeps } from "./func";
import { watch3 } from "./gulpfile-watch";
import filemanager from "./filemanager";

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
gulp.task("watch", gulp.series(watch3));

gulp.task("assets-compile", function (done) {
    function filter(views: any[]) {
        return views
            .filter(function (item) {
                return (
                    /\.(js|scss|css|sass|less|ts)$/.test(item) &&
                    !/\.min\.(js|css)$/.test(item) &&
                    !/-ori|-original|-backup|\.bak/s.test(item)
                );
            })
            .map(function (asset) {
                return framework.normalize(asset);
            });
    }

    let css = filemanager.readdir(root + "/assets/css");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    css = filter(css);
    let js = filemanager.readdir(root + "/assets/js");
    // noinspection JSUnusedAssignment
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    js = filter(js);

    console.log(css);
    console.log(js);

    done();
});

gulp.task("compile-view", function () {
    multiMinify(views());
});

gulp.task("default", gulp.series(["build", "watch"]));

/**
 * Create Documentation of javascript's
 */
gulp.task("doc", doc);
