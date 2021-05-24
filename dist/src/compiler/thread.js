"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thread = void 0;
var tslib_1 = require("tslib");
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var process_1 = tslib_1.__importDefault(require("./process"));
var thread = /** @class */ (function () {
    function thread() {
    }
    /**
     * Run single thread
     * @param name
     * @param callback
     * @example
     * thread.single('nameThread', function(nameThread){
     * // ... your codes here
     * thread.remove(nameThread); // <--- remove thread name
     * })
     */
    thread.single = function (name, callback) {
        var lockfile = filemanager_1.default.join(thread.root_folder, name);
        if (!filemanager_1.default.exist(lockfile)) {
            filemanager_1.default.mkfile(lockfile, new Date().toISOString());
            callback(name);
        }
    };
    /**
     * Remove thread name
     * @param name
     */
    thread.remove = function (name) {
        var lockfile = filemanager_1.default.join(thread.root_folder, name);
        filemanager_1.default.unlink(lockfile);
    };
    thread.root_folder = filemanager_1.default.join(process_1.default.root, "tmp", "thread");
    return thread;
}());
exports.thread = thread;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvdGhyZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzRUFBd0M7QUFDeEMsOERBQWdDO0FBRWhDO0lBQUE7SUE0QkEsQ0FBQztJQTFCRzs7Ozs7Ozs7O09BU0c7SUFDSSxhQUFNLEdBQWIsVUFBYyxJQUFZLEVBQUUsUUFBK0I7UUFDdkQsSUFBTSxRQUFRLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMscUJBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUIscUJBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN2RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEI7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksYUFBTSxHQUFiLFVBQWMsSUFBWTtRQUN0QixJQUFNLFFBQVEsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVELHFCQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUExQmMsa0JBQVcsR0FBRyxxQkFBVyxDQUFDLElBQUksQ0FBQyxpQkFBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUEyQmpGLGFBQUM7Q0FBQSxBQTVCRCxJQTRCQztBQTVCWSx3QkFBTSJ9