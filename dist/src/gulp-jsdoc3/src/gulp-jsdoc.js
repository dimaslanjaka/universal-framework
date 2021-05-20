"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsdoc = void 0;
var tslib_1 = require("tslib");
var map_stream_1 = tslib_1.__importDefault(require("map-stream"));
var tmp_1 = tslib_1.__importDefault(require("tmp"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var path_1 = tslib_1.__importDefault(require("path"));
var fancy_log_1 = tslib_1.__importDefault(require("fancy-log"));
var beeper_1 = tslib_1.__importDefault(require("beeper"));
var os = require("os").type();
var debug = require("debug")("gulp-jsdoc3");
// tmp is not deleting the file by default (https://github.com/raszi/node-tmp/issues/266)
tmp_1.default.setGracefulCleanup();
/**
 * @callback gulpDoneCallback
 */
/**
 * A wrapper around jsdoc cli.
 *
 * This function collects all filenames. Then runs:
 * ```jsdoc -c config -t node_modules/ink-docstrap/template gulpFile1 gulpFile2```
 * @example
 * gulp.src(['README.md', 'src/*.js']), {read: false}).pipe(
 *     jsdoc(options, cb)
 * );
 *
 * @param {Object} [config=require('./jsdocConfig.json')]
 * @param {gulpDoneCallback} done
 * @returns {*|SignalBinding}
 */
function jsdoc(config, done) {
    var files = [];
    var jsdocConfig;
    // User just passed callback
    if (arguments.length === 1 && typeof config === "function") {
        done = config;
        config = undefined;
    }
    // Prevent some errors
    if (typeof done !== "function") {
        done = function () { };
    }
    jsdocConfig = config || require("./jsdocConfig.json");
    debug("Config:\n" + JSON.stringify(jsdocConfig, undefined, 2));
    return map_stream_1.default(function (file, callback) {
        files.push(file.path);
        callback(null, file);
    }).on("end", function () {
        // We use a promise to prevent multiple dones (normal cause error then close)
        new Promise(function (resolve, reject) {
            // We clone the config file so as to not affect the original
            var jsdocConfigClone = JSON.parse(JSON.stringify(jsdocConfig));
            // If the user has specified a source.include key, we append the
            // gulp.src files to it.
            if (jsdocConfigClone.source && jsdocConfigClone.source.include) {
                jsdocConfigClone.source.include = jsdocConfigClone.source.include.concat(files);
            }
            else {
                jsdocConfigClone = Object.assign(jsdocConfigClone, { source: { include: files } });
            }
            if (jsdocConfigClone.source.include.length === 0) {
                var errMsg = "JSDoc Error: no files found to process";
                fancy_log_1.default.error(errMsg);
                beeper_1.default();
                reject(new Error(errMsg));
                return;
            }
            var tmpobj = tmp_1.default.fileSync();
            debug("Documenting files: " + jsdocConfigClone.source.include.join(" "));
            fs_1.default.writeFile(tmpobj.name, JSON.stringify(jsdocConfigClone), "utf8", function (err) {
                // We couldn't write the temp file
                /* istanbul ignore next */
                if (err) {
                    reject(err);
                    return;
                }
                var spawn = require("child_process").spawn, cmd = require.resolve("jsdoc/jsdoc.js"), // Needed to handle npm3 - find the binary anywhere
                inkdocstrap = path_1.default.dirname(require.resolve("ink-docstrap"));
                var args = ["-c", tmpobj.name];
                // Config + ink-docstrap if user did not specify their own layout or template
                if (!(jsdocConfigClone.opts && jsdocConfigClone.opts.template) &&
                    !(jsdocConfigClone.templates &&
                        jsdocConfigClone.templates.default &&
                        jsdocConfigClone.templates.default.layoutFile)) {
                    args = args.concat(["-t", inkdocstrap]);
                }
                debug(cmd + " " + args.join(" "));
                var child = os === "Windows_NT"
                    ? spawn(process.execPath, [cmd].concat(args), { cwd: process.cwd() })
                    : spawn(cmd, args, { cwd: process.cwd() }); // unix
                child.stdout.setEncoding("utf8");
                child.stderr.setEncoding("utf8");
                /* istanbul ignore next */
                child.stdout.on("data", function (data) {
                    fancy_log_1.default(data);
                });
                /* istanbul ignore next */
                child.stderr.on("data", function (data) {
                    fancy_log_1.default.error(data);
                    beeper_1.default();
                });
                child.on("close", function (code) {
                    if (code === 0) {
                        fancy_log_1.default("Documented " +
                            jsdocConfigClone.source.include.length +
                            " " +
                            (jsdocConfigClone.source.include.length === 1 ? "file!" : "files!"));
                        resolve();
                    }
                    else {
                        fancy_log_1.default.error("JSDoc returned with error code: " + code);
                        beeper_1.default();
                        reject(new Error("JSDoc closed with error code: " + code));
                    }
                });
                child.on("error", function (error) {
                    fancy_log_1.default.error("JSDoc Error: " + error);
                    beeper_1.default();
                    reject(new Error(error));
                });
            });
        })
            .then(function (data) { return done(undefined, data); })
            .catch(function (err) { return done(err); });
    });
}
exports.jsdoc = jsdoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VscC1qc2RvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYnMvc3JjL2d1bHAtanNkb2MzL3NyYy9ndWxwLWpzZG9jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxrRUFBNkI7QUFDN0Isb0RBQXNCO0FBQ3RCLGtEQUFvQjtBQUNwQixzREFBd0I7QUFDeEIsZ0VBQWlDO0FBQ2pDLDBEQUE0QjtBQUM1QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFOUIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTVDLHlGQUF5RjtBQUN6RixhQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUV6Qjs7R0FFRztBQUVIOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxTQUFnQixLQUFLLENBQUMsTUFBTSxFQUFFLElBQUk7SUFDaEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxXQUFXLENBQUM7SUFFaEIsNEJBQTRCO0lBQzVCLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQzFELElBQUksR0FBRyxNQUFNLENBQUM7UUFDZCxNQUFNLEdBQUcsU0FBUyxDQUFDO0tBQ3BCO0lBRUQsc0JBQXNCO0lBQ3RCLElBQUksT0FBTyxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQzlCLElBQUksR0FBRyxjQUFhLENBQUMsQ0FBQztLQUN2QjtJQUVELFdBQVcsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFdEQsS0FBSyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRCxPQUFPLG9CQUFHLENBQUMsVUFBVSxJQUFJ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