"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filemanager = void 0;
var tslib_1 = require("tslib");
var rimraf_1 = tslib_1.__importDefault(require("rimraf"));
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var log_1 = require("./log");
var core_1 = require("./core");
var filemanager = /** @class */ (function () {
    function filemanager() {
    }
    /**
     * Delete file or directory recursive
     * @param filedir
     * @param async
     */
    filemanager.unlink = function (filedir, async) {
        if (async) {
            rimraf_1.default(filedir, function (err) {
                if (!err) {
                    log_1.log.log(log_1.log.success("done"));
                }
                else {
                    log_1.log.log(log_1.log.error("cannot delete " + core_1.core.filelog(filedir)));
                }
            });
        }
        else {
            rimraf_1.default.sync(filedir);
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
                console.log(err);
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
exports.filemanager = filemanager;
