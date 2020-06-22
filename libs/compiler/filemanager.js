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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvZmlsZW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBNEI7QUFDNUIsNkNBQXlCO0FBQ3pCLGlEQUE2QjtBQUM3QixzREFBd0I7QUFDeEIsZ0NBQWdDO0FBQ2hDLHdEQUEwQjtBQUUxQjtJQUFBO0lBdURBLENBQUM7SUF0REM7Ozs7O09BS0c7SUFDSSxrQkFBTSxHQUFiLFVBQWMsT0FBZSxFQUFFLEtBQWM7UUFDM0MsSUFBTSxPQUFPLEdBQUc7WUFDZCxJQUFJLEtBQUssRUFBRTtnQkFDVCxnQkFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLEdBQUc7b0JBQzNCLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1IsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQzlCO3lCQUFNO3dCQUNMLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEtBQUssQ0FBQyxtQkFBaUIsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQzlEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEI7UUFDSCxDQUFDLENBQUM7UUFDRixJQUFJO1lBQ0YsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxNQUFNO2dCQUNqQyxJQUFJLE1BQU0sRUFBRTtvQkFDVixPQUFPLEVBQUUsQ0FBQztpQkFDWDtxQkFBTTtvQkFDTCxPQUFPLElBQUksQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUJBQUssR0FBWixVQUFhLE1BQWMsRUFBRSxPQUFlO1FBQzFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFVBQUMsR0FBRyxFQUFFLEtBQUs7WUFDNUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO29CQUNqQixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFFeEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN0QixXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDbkM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQUVELGlCQUFTLFdBQVcsQ0FBQyJ9