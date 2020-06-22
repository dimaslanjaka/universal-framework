"use strict";
var tslib_1 = require("tslib");
var rimraf_1 = tslib_1.__importDefault(require("rimraf"));
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var log_1 = tslib_1.__importDefault(require("./log"));
//import { core } from "./core";
var core_1 = tslib_1.__importDefault(require("./core"));
var filemanager = /** @class */ (function () {
    function filemanager() {
    }
    /**
     * Delete file or directory recursive
     * @param filedir
     * @param async
     * @returns null = filedir not exists, false = delete filedir failed, true = success
     */
    filemanager.unlink = function (filedir, async) {
        var execute = function () {
            if (async) {
                rimraf_1.default(filedir, function (err) {
                    if (!err) {
                        log_1.default.log(log_1.default.success("done"));
                    }
                    else {
                        log_1.default.log(log_1.default.error("cannot delete " + core_1.default.filelog(filedir)));
                    }
                });
            }
            else {
                rimraf_1.default.sync(filedir);
            }
        };
        try {
            fs.exists(filedir, function (exists) {
                if (exists) {
                    execute();
                }
                else {
                    return null;
                }
            });
            return true;
        }
        catch (error) {
            return false;
        }
    };
    /**
     * remove all files except matches regex
     * @param {string} folder
     * @param {RegExp} exclude
     */
    filemanager.empty = function (folder, exclude) {
        fs.readdir(folder, function (err, files) {
            if (err) {
                log_1.default.log(log_1.default.error(err.message));
            }
            else {
                files.forEach(function (file) {
                    var fileDir = path.join(folder, file);
                    if (exclude.test(file)) {
                        filemanager.unlink(fileDir, true);
                    }
                });
            }
        });
    };
    return filemanager;
}());
module.exports = filemanager;
