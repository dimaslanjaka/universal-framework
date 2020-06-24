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
    process.verbose = false;
    process.tmp = 'tmp/compiler';
    return process;
}());
module.exports = process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21waWxlci9wcm9jZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0VBQXdDO0FBQ3hDLGtEQUFvQjtBQUNwQix3REFBMEI7QUFDMUIsc0RBQXdCO0FBQ3hCLHVDQUFnQztBQUNoQyw0REFBa0M7QUFFbEMscUJBQVcsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUUxRTtJQUFBO0lBMkVBLENBQUM7SUF4RUM7OztPQUdHO0lBQ0ksa0JBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUM1QixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLGVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDRDs7O09BR0c7SUFDWSxtQkFBVyxHQUExQixVQUEyQixRQUFnQjtRQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLGVBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtZQUMzQyxxQkFBVyxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFDRCxxQkFBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNEOzs7T0FHRztJQUNZLG1CQUFXLEdBQTFCLFVBQTJCLFFBQWdCO1FBQ3pDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQixhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNCLHFCQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyQzthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO2FBQ3BEO1NBQ0Y7SUFDSCxDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNJLGlCQUFTLEdBQWhCLFVBQ0UsUUFBZ0IsRUFDaEIsT0FBbUMsRUFDbkMsUUFBa0I7UUFFbEIsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFFO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNoQztRQUNELFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixhQUFHLENBQUMsR0FBRyxDQUNMLGFBQUcsQ0FBQyxLQUFLLENBQUMscUJBQW1CLFFBQVEsa0NBQStCLENBQUMsQ0FDdEUsQ0FBQztZQUNGLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFNLE1BQU0sR0FBRztZQUNiLElBQUksT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO2dCQUNqQyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUMzQjtpQkFBTSxJQUFJLE9BQU8sT0FBTyxJQUFJLFVBQVUsRUFBRTtnQkFDdkMsT0FBTyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDLENBQUM7UUFDRixPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsTUFBTSxFQUFFLENBQUM7WUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ1IsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6RU0sZUFBTyxHQUFZLEtBQUssQ0FBQztJQUN6QixXQUFHLEdBQUcsY0FBYyxDQUFDO0lBeUU5QixjQUFDO0NBQUEsQUEzRUQsSUEyRUM7QUFFRCxpQkFBUyxPQUFPLENBQUMifQ==