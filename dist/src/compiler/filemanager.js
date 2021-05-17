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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9maWxlbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUE0QjtBQUM1Qiw2Q0FBeUI7QUFDekIsaURBQTZCO0FBQzdCLHNEQUF3QjtBQUN4QixnQ0FBZ0M7QUFDaEMsd0RBQTBCO0FBRTFCO0lBQUE7SUE0RkEsQ0FBQztJQTNGQzs7Ozs7T0FLRztJQUNJLGtCQUFNLEdBQWIsVUFBYyxPQUFlLEVBQUUsS0FBZTtRQUM1QyxJQUFNLFNBQVMsR0FBRztZQUNoQixJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksS0FBSyxFQUFFO29CQUNULGdCQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRzt3QkFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDUixhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDOUI7NkJBQU07NEJBQ0wsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFpQixjQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDOUQ7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3RCO2dCQUNELE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsT0FBTyxLQUFLLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQztRQUNGLElBQUk7WUFDRixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLElBQUksTUFBTSxFQUFFO2dCQUNWLE9BQU8sU0FBUyxFQUFFLENBQUM7YUFDcEI7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQkFBTSxHQUFiLFVBQWMsSUFBWSxFQUFFLE9BQVk7UUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPLE9BQU8sSUFBSSxRQUFRLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4RCxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksaUJBQUssR0FBWixVQUFhLEdBQVc7UUFDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNuQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpQkFBSyxHQUFaLFVBQWEsTUFBYyxFQUFFLE9BQXNCO1FBQ2pELEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLEtBQUs7WUFDNUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUNqQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFeEMsSUFBSSxPQUFPLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQ3ZCLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUNuQzs2QkFBTTs0QkFDTCxhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxLQUFLLENBQUksT0FBTyx1QkFBb0IsQ0FBQyxDQUFDLENBQUM7eUJBQ3BEO3FCQUNGO3lCQUFNO3dCQUNMLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNuQztnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBNUZELElBNEZDO0FBRUQsaUJBQVMsV0FBVyxDQUFDIn0=