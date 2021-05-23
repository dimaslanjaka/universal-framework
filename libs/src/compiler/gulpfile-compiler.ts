import * as gulp from "gulp";
import ts from "gulp-typescript";
import * as fs from "fs";
import upath from "upath";
import path from "path";
import log from "../compiler/log";
import process from "../compiler/process";
import core from "./core";

const root = process.root;

/**
 * compile and minify assets
 * @param item file full path
 */
export function compileAssets(item: string | Buffer): any {
    const exists = fs.existsSync(item);
    if (exists) {
        item = item.toString();
        let config:
        | string
        | {
            obfuscate: boolean;
        } = upath.normalizeSafe(root + "/src/MVC/config/" + item.replace(core.root(), ""));
        config = core.normalize(core.root() + config);
        config = config.replace(/\.(js|css)/s, ".json");
        if (fs.existsSync(config)) {
            config = require(config);
        }

        if (item.endsWith(".less") && !item.endsWith(".min.less")) {
            //console.log(`Compiling LESS ${core.filelog(item)}`);
            core.less(item);
        } else if (item.endsWith(".scss") && !item.endsWith(".min.scss")) {
            //console.log(`Compiling SCSS ${core.filelog(item)}`);
            core.scss(item);
        } else if (item.endsWith(".css") && !item.endsWith(".min.css")) {
            //console.log(`Minify CSS ${core.filelog(item)}`);
            core.minCSS(item);
        } else if (item.endsWith(".js") && !item.endsWith(".min.js")) {
            if (item.endsWith("browserify.js")) {
                console.log("Compile Browserify");
                // TODO: Compile Browserify
                core.browserify(item);
            } else if (!item.endsWith(".babel.js")) {
                //console.log(`Minify JS ${core.filelog(item)}`);
                core.minJS(item);
                let deleteObfuscated = false;
                if (typeof config == "object") {
                    if (config.hasOwnProperty("obfuscate")) {
                        if (config.obfuscate) {
                            //console.log(`Obfuscating JS ${core.filelog(item)}`);
                            core.obfuscate(item);
                        } else {
                            deleteObfuscated = true;
                        }
                    } else {
                        deleteObfuscated = true;
                    }
                }
                if (deleteObfuscated) {
                    const obfuscatedjs = item.replace(/\.js$/s, ".obfuscated.js");
                    const obfuscatedminjs = item.replace(/\.js$/s, ".obfuscated.min.js");
                    core.unlink(obfuscatedjs);
                    core.unlink(obfuscatedminjs);
                }
            }
        } else if (item.endsWith(".ts") && !item.endsWith(".d.ts")) {
            if (!/libs\/|libs\\/s.test(item)) {
                single_tsCompile(item);
            }
        }
    }
}

/**
 * Single Typescript Compiler
 * @param target
 * @todo universal-framework typescript compiler support
 */
export function single_tsCompile(target: string) {
    const targetlog = log.chalk().magentaBright(core.filelog(target));
    if (target.endsWith(".d.ts")) {
        log.log(`${targetlog} is declaration file`);
        return;
    }
    const dest = path.dirname(target);
    log.log(`${targetlog} > ${log.chalk().yellow(core.filelog(target.replace(/\.ts$/, ".js")))} start`);
    const tsProject = ts.createProject({
        declaration: false,
        skipLibCheck: true,
    });
    return gulp.src(target).pipe(tsProject()).on("error", console.log).pipe(gulp.dest(dest));
}
