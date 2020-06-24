"use strict";
var tslib_1 = require("tslib");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var log_1 = tslib_1.__importDefault(require("./log"));
var crypto_js_1 = require("crypto-js");
var process_1 = tslib_1.__importDefault(require("process"));
filemanager_1.default.empty(upath_1.default.join(process_1.default.cwd(), 'tmp', 'compiler'), null);
var process = /** @class */ (function () {
    function process() {
    }
    /**
     * Create lock file
     * @param file
     */
    process.lockCreate = function (file) {
        return upath_1.default.join(process_1.default.cwd(), 'tmp/compiler', crypto_js_1.MD5(file).toString());
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
        if (fs_1.default.existsSync(lockfile)) {
            return null;
        }
        this.lockProcess(lockfile);
        if (typeof callback == 'function') {
            callback(lockfile);
        }
        else if (typeof options == 'function') {
            options(lockfile);
        }
        this.releaseLock(lockfile);
    };
    process.verbose = false;
    return process;
}());
module.exports = process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9wcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0VBQXdDO0FBQ3hDLGtEQUFvQjtBQUNwQix3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLHVDQUFnQztBQUNoQyw0REFBa0M7QUFFbEMscUJBQVcsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUUxRTtJQUFBO0lBOERBLENBQUM7SUE1REM7OztPQUdHO0lBQ0ksa0JBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUM1QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsZUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUNEOzs7T0FHRztJQUNZLG1CQUFXLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzNDLHFCQUFXLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUM1QztRQUNELHFCQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0Q7OztPQUdHO0lBQ1ksbUJBQVcsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IscUJBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JDO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7U0FDRjtJQUNILENBQUM7SUFDRDs7OztPQUlHO0lBQ0ksaUJBQVMsR0FBaEIsVUFDRSxRQUFnQixFQUNoQixPQUFtQyxFQUNuQyxRQUFrQjtRQUVsQixJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sSUFBSSxTQUFTLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1NBQ2hDO1FBQ0QsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNCLElBQUksT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO1lBQ2pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjthQUFNLElBQUksT0FBTyxPQUFPLElBQUksVUFBVSxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQTVETSxlQUFPLEdBQVksS0FBSyxDQUFDO0lBNkRsQyxjQUFDO0NBQUEsQUE5REQsSUE4REM7QUFFRCxpQkFBUyxPQUFPLENBQUMifQ==