"use strict";
var tslib_1 = require("tslib");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var log_1 = tslib_1.__importDefault(require("./log"));
var crypto_js_1 = require("crypto-js");
var process_1 = tslib_1.__importDefault(require("process"));
filemanager_1.default.empty(upath_1.default.join(process_1.default.cwd(), 'tmp/compiler'), null);
var process = /** @class */ (function () {
    function process() {
    }
    /**
     * Create lock file
     * @param file
     */
    process.lockCreate = function (file) {
        return upath_1.default.join(process_1.default.cwd(), this.tmp, crypto_js_1.MD5(file).toString());
    };
    /**
     * lock the process
     * @param lockfile
     */
    process.lockProcess = function (lockfile) {
        if (this.verbose) {
            log_1.default.log(log_1.default.random('locking process'));
        }
        if (!upath_1.default.resolve(upath_1.default.dirname(lockfile))) {
            filemanager_1.default.mkdir(upath_1.default.dirname(lockfile));
        }
        filemanager_1.default.mkfile(lockfile, 'lockfile');
    };
    /**
     * release lock process
     * @param lockfile
     */
    process.releaseLock = function (lockfile) {
        if (this.verbose) {
            log_1.default.log(log_1.default.random('releasing process'));
        }
        if (fs_1.default.existsSync(lockfile)) {
            filemanager_1.default.unlink(lockfile, false);
        }
        else {
            if (this.verbose) {
                log_1.default.log(log_1.default.error('process file already deleted'));
            }
        }
    };
    /**
     * do process
     * @param lockfile
     * @param callback
     */
    process.doProcess = function (lockfile, options, callback) {
        if (typeof options.verbose == 'boolean') {
            this.verbose = options.verbose;
        }
        lockfile = process.lockCreate(lockfile);
        if (fs_1.default.existsSync(lockfile)) {
            log_1.default.log(log_1.default.error("Process locked (" + lockfile + "). please provide unique ids."));
            return null;
        }
        var doCall = function () {
            if (typeof callback == 'function') {
                return callback(lockfile);
            }
            else if (typeof options == 'function') {
                return options(lockfile);
            }
        };
        process.lockProcess(lockfile);
        var load = new Promise(function (resolve, reject) {
            doCall();
            resolve(true);
        });
        load.then(function () {
            process.releaseLock(lockfile);
        });
    };
    process.root = process_1.default.cwd();
    process.verbose = false;
    process.tmp = 'tmp/compiler';
    return process;
}());
module.exports = process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9wcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0VBQXdDO0FBQ3hDLGtEQUFvQjtBQUNwQix3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLHVDQUFnQztBQUNoQyw0REFBa0M7QUFFbEMscUJBQVcsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRXZFO0lBQUE7SUE0RUEsQ0FBQztJQXhFQzs7O09BR0c7SUFDSSxrQkFBVSxHQUFqQixVQUFrQixJQUFZO1FBQzVCLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsZUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNEOzs7T0FHRztJQUNZLG1CQUFXLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzNDLHFCQUFXLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELHFCQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ1ksbUJBQVcsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IscUJBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7U0FDRjtJQUNILENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksaUJBQVMsR0FBaEIsVUFDRSxRQUFnQixFQUNoQixPQUFtQyxFQUNuQyxRQUFrQjtRQUVsQixJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLGFBQUcsQ0FBQyxHQUFHLENBQ0wsYUFBRyxDQUFDLEtBQUssQ0FBQyxxQkFBbUIsUUFBUSxrQ0FBK0IsQ0FBQyxDQUN0RSxDQUFDO1lBQ0YsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQU0sTUFBTSxHQUFHO1lBQ2IsSUFBSSxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7Z0JBQ2pDLE9BQU8sUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzNCO2lCQUFNLElBQUksT0FBTyxPQUFPLElBQUksVUFBVSxFQUFFO2dCQUN2QyxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMxQjtRQUNILENBQUMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxNQUFNLEVBQUUsQ0FBQztZQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxJQUFJLENBQUM7WUFDUixPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTFFTSxZQUFJLEdBQUcsaUJBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN6QixlQUFPLEdBQVksS0FBSyxDQUFDO0lBQ3pCLFdBQUcsR0FBRyxjQUFjLENBQUM7SUF5RTlCLGNBQUM7Q0FBQSxBQTVFRCxJQTRFQztBQUVELGlCQUFTLE9BQU8sQ0FBQyJ9