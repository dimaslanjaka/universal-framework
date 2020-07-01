"use strict";
var rimraf_1 = require("rimraf");
var fs = require("fs");
var path = require("path");
var log_1 = require("./log");
var core_1 = require("./core");
var filemanager = (function () {
    function filemanager() {
    }
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
    filemanager.mkfile = function (file, content) {
        this.mkdir(path.dirname(file));
        if (typeof content == "object" || Array.isArray(content)) {
            content = JSON.stringify(content, null, 4);
        }
        fs.writeFileSync(file, content, { encoding: "utf-8" });
        return file;
    };
    filemanager.mkdir = function (dir) {
        if (!fs.existsSync(path.dirname(dir))) {
            this.mkdir(path.dirname(dir));
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    };
    filemanager.empty = function (folder, exclude) {
        fs.readdir(folder, function (err, files) {
            if (err) {
                log_1.default.log(log_1.default.error(err.message));
            }
            else {
                files.forEach(function (file) {
                    var fileDir = path.join(folder, file);
                    if (exclude) {
                        if (!exclude.test(file)) {
                            filemanager.unlink(fileDir, true);
                        }
                        else {
                            log_1.default.log(log_1.default.error(fileDir + " in excluded lists"));
                        }
                    }
                    else {
                        filemanager.unlink(fileDir, true);
                    }
                });
            }
        });
    };
    return filemanager;
}());
module.exports = filemanager;
//# sourceMappingURL=filemanager.js.map