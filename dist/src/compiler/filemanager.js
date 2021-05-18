"use strict";
var tslib_1 = require("tslib");
var rimraf_1 = tslib_1.__importDefault(require("rimraf"));
var fs = tslib_1.__importStar(require("fs"));
var path = tslib_1.__importStar(require("path"));
var log_1 = tslib_1.__importDefault(require("./log"));
var core_1 = tslib_1.__importDefault(require("./core"));
var filemanager = /** @class */ (function () {
    function filemanager() {
    }
    /**
     * Is file/folder exists?
     */
    filemanager.exist = function (filepath) {
        return fs.existsSync(filepath);
    };
    /**
     * Delete file or directory recursive
     * @param filedir
     * @param async
     * @returns null = file/dir not exists, false = delete filedir failed, true = success
     */
    filemanager.unlink = function (filedir, async) {
        var deleteNow = function () {
            if (fs.existsSync(filedir)) {
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
                return true;
            }
            else {
                return false;
            }
        };
        try {
            var exists = fs.existsSync(filedir);
            if (exists) {
                return deleteNow();
            }
            else {
                return null;
            }
        }
        catch (error) {
            return false;
        }
    };
    /**
     * create file recursive
     * @param file
     * @param content
     */
    filemanager.mkfile = function (file, content) {
        this.mkdir(path.dirname(file));
        if (typeof content == "object" || Array.isArray(content)) {
            content = JSON.stringify(content, null, 4);
        }
        fs.writeFileSync(file, content, { encoding: "utf-8" });
        return file;
    };
    /**
     * create directory recursive
     * @param dir
     */
    filemanager.mkdir = function (dir) {
        if (!fs.existsSync(path.dirname(dir))) {
            this.mkdir(path.dirname(dir));
        }
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        return dir;
    };
    /**
     * remove all files/folders except matches regex
     * @param folder
     * @param exclude
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9maWxlbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUE0QjtBQUM1Qiw2Q0FBeUI7QUFDekIsaURBQTZCO0FBQzdCLHNEQUF3QjtBQUN4Qix3REFBMEI7QUFFMUI7SUFBQTtJQW1HQSxDQUFDO0lBbEdDOztPQUVHO0lBQ0ksaUJBQUssR0FBWixVQUFhLFFBQWdCO1FBQzNCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxrQkFBTSxHQUFiLFVBQWMsT0FBZSxFQUFFLEtBQWU7UUFDNUMsSUFBTSxTQUFTLEdBQUc7WUFDaEIsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMxQixJQUFJLEtBQUssRUFBRTtvQkFDVCxnQkFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUc7d0JBQzNCLElBQUksQ0FBQyxHQUFHLEVBQUU7NEJBQ1IsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7eUJBQzlCOzZCQUFNOzRCQUNMLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDLENBQUM7eUJBQzlEO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLGdCQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN0QjtnQkFDRCxPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7UUFDSCxDQUFDLENBQUM7UUFDRixJQUFJO1lBQ0YsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVB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