import * as gulp from "gulp";
import { config } from "./config";
import upath from "upath";
import path from "path";
import framework from "../compiler/index";
import log from "../compiler/log";
//import process from "../compiler/process";
// noinspection ES6PreferShortImport
import { createApp } from "./gulpfile-app";
// noinspection ES6PreferShortImport
import "../node-localstorage/src/index";
import { compileAssets } from "./gulpfile-compiler";
import "../../js/_Prototype-Array";
import { spawner } from "./spawner";

export function gulpWatch(done) {
    const files = ["./libs/js/*", "./libs/src/**/*", "./src/MVC/**/*", "./etc/**/*", "./" + config.app.views + "/**/*"];

    let watch_timer = null;
    const watchf = gulp
        .watch(files, null)
        .on("change", function (file: string | Buffer | import("url").URL | string[]) {
            if (localStorage.getItem("watch")) {
                return;
            }
            file = framework.normalize(path.resolve(file.toString()));
            //console.info(`${file} changed`);
            /**
             * Check is library compiler or source compiler
             */
            const is_Lib = /libs\/(js|src)\//s.test(framework.normalize(file));

            if (is_Lib) {
                /**
                 * Exclude framework.js app.js and *.map.js
                 */
                const isFramework = /((framework|app)\.(js|js.map)|\.map)$/s.test(file);
                if (isFramework) return;

                if (watch_timer == null) {
                    log.log(log.random("Library compiler triggered by ") + log.random(framework.filelog(file)));
                    log.log(log.chalk().yellow(`start compile ${log.random("src/MVC/themes/assets/js")}`));
                    watch_timer = setTimeout(async function () {
                        await createApp(true).finally(function () {
                            watch_timer = null;
                        });
                    }, 1000);
                }
            } else {
                if (/\.(js|scss|css|less|ts)$/s.test(file)) {
                    // TODO: Compile js css on change
                    if (!/\.min\.(js|css|ts)$/s.test(file)) {
                        compileAssets(file);
                    }
                }
            }

            //done(); // <--- tell gulp initialize complete
        });

    console.clear();
    log.log(
        log.random("Listening ") +
            files
                .map(function (item) {
                    return log.random(upath.resolve(item));
                })
                .join(", ")
                .trim()
    );

    return watchf;
}

export function gulpWatch2(done: () => void) {
    const ext = ".{js|css|sass|less|scss}";
    const files = ["./src/MVC/**/*", "./etc/**/*", "./" + config.app.views + "/**/*", "!**.min" + ext];
    console.log("starting watch", files);

    // watch libs
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.formsaver.json --watch"]);
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.build.json --watch"]);
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.precompiler.json --watch"]);
    spawner.spawn("cmd", ["/k", "tsc -p tsconfig.compiler.json --watch"]);

    // watch views
    return gulp.watch(files, null).on("change", function (file: string | Buffer | import("url").URL | string[]) {
        const canonical = path.normalize(path.resolve(file.toString()));
        //console.log(canonical, file);
        if (/\.(js|scss|css|less|ts)$/s.test(canonical)) {
            // TODO: Compile js css on change
            if (!/\.min\.(js|css|ts)$/s.test(canonical)) {
                compileAssets(canonical);
                if (canonical.endsWith("app.js")) {
                    setTimeout(() => {
                        console.info("re-compiling app.js");
                        compileAssets(canonical);
                    }, 2500);
                }
            }
        }
        done();
    });
}
