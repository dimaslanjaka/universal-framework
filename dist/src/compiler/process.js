"use strict";
var tslib_1 = require("tslib");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var fs_1 = tslib_1.__importDefault(require("fs"));
var upath_1 = tslib_1.__importDefault(require("upath"));
var log_1 = tslib_1.__importDefault(require("./log"));
var crypto_js_1 = require("crypto-js");
var process_1 = tslib_1.__importDefault(require("process"));
var core_1 = tslib_1.__importDefault(require("./core"));
var uniqid_1 = tslib_1.__importDefault(require("../locutus/src/php/misc/uniqid"));
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
    /**
     * Root terminal
     */
    process.root = process_1.default.cwd();
    /**
     * Debug
     */
    process.verbose = false;
    /**
     * Compiler temp folder
     */
    process.tmp = savetemp;
    /**
     * Current process unique id
     */
    process.id = uniqid_1.default("_");
    /**
     * process instance `import coreProcess from "process";`
     */
    process.core = process_1.default;
    return process;
}());
module.exports = process;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL2NvbXBpbGVyL3Byb2Nlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRUFBd0M7QUFDeEMsa0RBQW9CO0FBQ3BCLHdEQUEwQjtBQUMxQixzREFBd0I7QUFDeEIsdUNBQWdDO0FBQ2hDLDREQUFrQztBQUNsQyx3REFBMEI7QUFDMUIsa0ZBQW9EO0FBRXBELElBQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDO0FBQ2xDLElBQUksWUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUN6QixxQkFBVyxDQUFDLEtBQUssQ0FBQyxlQUFLLENBQUMsSUFBSSxDQUFDLGlCQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Q0FDcEU7QUFFRDtJQUFBO0lBdUdBLENBQUM7SUFoRkc7O09BRUc7SUFDSSxnQkFBUSxHQUFmO1FBQ0ksSUFBSSxjQUFJLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZCwwQkFBMEI7U0FDN0I7YUFBTTtZQUNILGNBQWM7U0FDakI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksa0JBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUMxQixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsaUJBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLGVBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksaUJBQVMsR0FBaEIsVUFBaUIsUUFBZ0IsRUFBRSxPQUFtQyxFQUFFLFFBQWtCO1FBQ3RGLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxJQUFJLFNBQVMsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7U0FDbEM7UUFDRCxRQUFRLEdBQUcs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