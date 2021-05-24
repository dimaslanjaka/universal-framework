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
    /**
     * @param dir
     * @param fileLists
     * @param exclude
     * @return
     */
    filemanager.readdir = function (dir, fileLists, exclude) {
        if (fileLists === void 0) { fileLists = null; }
        if (exclude === void 0) { exclude = null; }
        if (!dir)
            return null;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var self = this;
        if (!dir.toString().endsWith("/")) {
            dir += "/";
        }
        var files = fs.readdirSync(dir);
        fileLists = fileLists || [];
        files.forEach(function (file) {
            if (fs.statSync(dir + file).isDirectory()) {
                fileLists = self.readdir(dir + file + "/", fileLists, exclude);
            }
            else {
                fileLists.push(path.resolve(dir + file));
            }
        });
        if (exclude && exclude.length) {
            exclude.forEach(function (ex) {
                fileLists = fileLists.filter(function (item) {
                    var allow = null;
                    if (ex instanceof RegExp) {
                        allow = !ex.test(item);
                    }
                    else {
                        var matches = item.indexOf(ex) !== -1;
                        allow = !matches;
                    }
                    //console.log(allow, ex);
                    return allow;
                });
            });
        }
        return fileLists;
    };
    filemanager.normalize = function () { };
    filemanager.path = path;
    filemanager.join = path.join;
    return filemanager;
}());
module.exports = filemanager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9maWxlbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUE0QjtBQUM1Qiw2Q0FBeUI7QUFDekIsaURBQTZCO0FBQzdCLHNEQUF3QjtBQUN4Qix3REFBMEI7QUFFMUI7SUFBQTtJQWlKQSxDQUFDO0lBN0lHOztPQUVHO0lBQ0ksaUJBQUssR0FBWixVQUFhLFFBQWdCO1FBQ3pCLE9BQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxrQkFBTSxHQUFiLFVBQWMsT0FBZSxFQUFFLEtBQWU7UUFDMUMsSUFBTSxTQUFTLEdBQUc7WUFDZCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ3hCLElBQUksS0FBSyxFQUFFO29CQUNQLGdCQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRzt3QkFDekIsSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDTixhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDaEM7NkJBQU07NEJBQ0gsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFpQixjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDaEU7b0JBQ0wsQ0FBQyxDQUFDLENBQUM7aUJBQ047cUJBQU07b0JBQ0gsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0gsT0FBTyxLQUFLLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUM7UUFDRixJQUFJO1lBQ0EsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0QyxJQUFJLE1BQU0sRUFBRTtnQkFDUixPQUFPLFNBQVMsRUFBRSxDQUFDO2FBQ3RCO2lCQUFNO2dCQUNILE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLGtCQUFNLEdBQWIsVUFBYyxJQUFZLEVBQUUsT0FBWTtRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvQixJQUFJLE9BQU8sT0FBTyxJQUFJLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3RELE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUM7UUFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUJBQUssR0FBWixVQUFhLEdBQVc7UUFDcEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpQkFBSyxHQUFaLFVBQWEsTUFBYyxFQUFFLE9BQXNCO1FBQy9DLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLEtBQUs7WUFDMUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ25DO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUNmLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUV4QyxJQUFJLE9BQU8sRUFBRTt3QkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTs0QkFDckIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQ3JDOzZCQUFNOzRCQUNILGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEtBQUssQ0FBSSxPQUFPLHVCQUFvQixDQUFDLENBQUMsQ0FBQzt5QkFDdEQ7cUJBQ0o7eUJBQU07d0JBQ0gsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3JDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLG1CQUFPLEdBQWQsVUFBZSxHQUFXLEVBQUUsU0FBMEIsRUFBRSxPQUFzQztRQUFsRSwwQkFBQSxFQUFBLGdCQUEwQjtRQUFFLHdCQUFBLEVBQUEsY0FBc0M7UUFDMUYsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN0Qiw0REFBNEQ7UUFDNUQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLEdBQUcsSUFBSSxHQUFHLENBQUM7U0FDZDtRQUNELElBQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsU0FBUyxHQUFHLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUk7WUFDeEIsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDdkMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ2xFO2lCQUFNO2dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUM1QztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUMzQixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTtnQkFDeEIsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJO29CQUN2QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7b0JBQ2pCLElBQUksRUFBRSxZQUFZLE1BQU0sRUFBRTt3QkFDdEIsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDMUI7eUJBQU07d0JBQ0gsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDO3FCQUNwQjtvQkFDRCx5QkFBeUI7b0JBQ3pCLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRU0scUJBQVMsR0FBaEIsY0FBb0IsQ0FBQztJQS9JZCxnQkFBSSxHQUFHLElBQUksQ0FBQztJQUNaLGdCQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQStJNUIsa0JBQUM7Q0FBQSxBQWpKRCxJQWlKQztBQUVELGlCQUFTLFdBQVcsQ0FBQyJ9