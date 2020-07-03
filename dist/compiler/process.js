"use strict";
var tslib_1 = require("tslib");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var log_1 = tslib_1.__importDefault(require("./log"));
var crypto_js_1 = require("crypto-js");
var process_1 = tslib_1.__importDefault(require("process"));
var savetemp = "./tmp/compiler";
if (fs_1.default.existsSync(savetemp)) {
    filemanager_1.default.empty(upath_1.default.join(process_1.default.cwd(), savetemp), null);
}
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
            log_1.default.log(log_1.default.random("locking process"));
        }
        if (!upath_1.default.resolve(upath_1.default.dirname(lockfile))) {
            filemanager_1.default.mkdir(upath_1.default.dirname(lockfile));
        }
        filemanager_1.default.mkfile(lockfile, "lockfile");
    };
    /**
     * release lock process
     * @param lockfile
     */
    process.releaseLock = function (lockfile) {
        if (this.verbose) {
            log_1.default.log(log_1.default.random("releasing process"));
        }
        if (fs_1.default.existsSync(lockfile)) {
            filemanager_1.default.unlink(lockfile, false);
        }
        else {
            if (this.verbose) {
                log_1.default.log(log_1.default.error("process file already deleted"));
            }
        }
    };
    /**
     * do process
     * @param lockfile
     * @param callback
     */
    process.doProcess = function (lockfile, options, callback) {
        if (typeof options.verbose == "boolean") {
            this.verbose = options.verbose;
        }
        lockfile = process.lockCreate(lockfile);
        if (fs_1.default.existsSync(lockfile)) {
            log_1.default.log(log_1.default.error("Process locked (" + lockfile + "). please provide unique ids."));
            return null;
        }
        var doCall = function () {
            if (typeof callback == "function") {
                return callback(lockfile);
            }
            else if (typeof options == "function") {
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
    process.tmp = savetemp;
    return process;
}());
module.exports = process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRUFBd0M7QUFDeEMsa0RBQW9CO0FBQ3BCLHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIsdUNBQWdDO0FBQ2hDLDREQUFrQztBQUVsQyxJQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztBQUNsQyxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDM0IscUJBQVcsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ2xFO0FBRUQ7SUFBQTtJQTRFQSxDQUFDO0lBeEVDOzs7T0FHRztJQUNJLGtCQUFVLEdBQWpCLFVBQWtCLElBQVk7UUFDNUIsT0FBTyxlQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxlQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0Q7OztPQUdHO0lBQ1ksbUJBQVcsR0FBMUIsVUFBMkIsUUFBZ0I7UUFDekMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLGFBQUcsQ0FBQyxHQUFHLENBQUMsYUFBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxlQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUU7WUFDM0MscUJBQVcsQ0FBQyxLQUFLLENBQUMsZUFBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QscUJBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDRDs7O09BR0c7SUFDWSxtQkFBVyxHQUExQixVQUEyQixRQUFnQjtRQUN6QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDaEIsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixxQkFBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckM7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUMsQ0FBQzthQUNwRDtTQUNGO0lBQ0gsQ0FBQztJQUNEOzs7O09BSUc7SUFDSSxpQkFBUyxHQUFoQixVQUNFLFFBQWdCLEVBQ2hCLE9BQW1DLEVBQ25DLFFBQWtCO1FBRWxCLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRTtZQUN2QyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDaEM7UUFDRCxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLFlBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0IsYUFBRyxDQUFDLEdBQUcsQ0FDTCxhQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFtQixRQUFRLGtDQUErQixDQUFDLENBQ3RFLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBTSxNQUFNLEdBQUc7WUFDYixJQUFJLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDakMsT0FBTyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxPQUFPLE9BQU8sSUFBSSxVQUFVLEVBQUU7Z0JBQ3ZDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFCO1FBQ0gsQ0FBQyxDQUFDO1FBQ0YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QixJQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNSLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBMUVNLFlBQUksR0FBRyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLGVBQU8sR0FBWSxLQUFLLENBQUM7SUFDekIsV0FBRyxHQUFHLFFBQVEsQ0FBQztJQXlFeEIsY0FBQztDQUFBLEFBNUVELElBNEVDO0FBRUQsaUJBQVMsT0FBTyxDQUFDIn0=