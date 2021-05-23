"use strict";
var tslib_1 = require("tslib");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var log_1 = tslib_1.__importDefault(require("./log"));
var crypto_js_1 = require("crypto-js");
var process_1 = tslib_1.__importDefault(require("process"));
var core_1 = tslib_1.__importDefault(require("./core"));
var savetemp = "./tmp/compiler";
if (fs_1.default.existsSync(savetemp)) {
    filemanager_1.default.empty(upath_1.default.join(process_1.default.cwd(), savetemp), null);
}
var process = /** @class */ (function () {
    function process() {
    }
    /**
     * Kill All Node Processes
     */
    process.killNode = function () {
        if (core_1.default.isWin()) {
            //taskkill /f /im node.exe
        }
        else {
            //killall node
        }
    };
    /**
     * Create lock file
     * @param file
     */
    process.lockCreate = function (file) {
        return upath_1.default.join(process_1.default.cwd(), this.tmp, crypto_js_1.MD5(file).toString());
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
    process.root = process_1.default.cwd();
    process.verbose = false;
    process.tmp = savetemp;
    /**
     * process instance `import coreProcess from "process";`
     */
    process.core = process_1.default;
    return process;
}());
module.exports = process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRUFBd0M7QUFDeEMsa0RBQW9CO0FBQ3BCLHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIsdUNBQWdDO0FBQ2hDLDREQUFrQztBQUNsQyx3REFBMEI7QUFFMUIsSUFBTSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7QUFDbEMsSUFBSSxZQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0lBQ3pCLHFCQUFXLENBQUMsS0FBSyxDQUFDLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztDQUNwRTtBQUVEO0lBQUE7SUF5RkEsQ0FBQztJQWhGRzs7T0FFRztJQUNJLGdCQUFRLEdBQWY7UUFDSSxJQUFJLGNBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNkLDBCQUEwQjtTQUM3QjthQUFNO1lBQ0gsY0FBYztTQUNqQjtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxrQkFBVSxHQUFqQixVQUFrQixJQUFZO1FBQzFCLE9BQU8sZUFBSyxDQUFDLElBQUksQ0FBQyxpQkFBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsZUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxpQkFBUyxHQUFoQixVQUFpQixRQUFnQixFQUFFLE9BQW1DLEVBQUUsUUFBa0I7UUFDdEYsSUFBSSxPQUFPLE9BQU8sQ0FBQyxPQUFPLElBQUksU0FBUyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQztTQUNsQztRQUNELFFBQVEsR0FBRyxPQUFPLENBQUMsVUFB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