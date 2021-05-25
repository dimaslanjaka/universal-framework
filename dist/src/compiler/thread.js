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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lockfile;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lockfile = filemanager_1.default.join(thread.root_folder, name);
                        if (!!filemanager_1.default.exist(lockfile)) return [3 /*break*/, 2];
                        filemanager_1.default.mkfile(lockfile, new Date().toISOString());
                        return [4 /*yield*/, callback(name)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Remove thread name
     * @param name
     */
    thread.remove = function (name) {
        var lockfile = filemanager_1.default.join(thread.root_folder, name);
        filemanager_1.default.unlink(lockfile);
    };
    thread.root_folder = filemanager_1.default.join(process_1.default.root, "tmp", "thread", process_1.default.id);
    return thread;
}());
exports.thread = thread;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvdGhyZWFkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxzRUFBd0M7QUFDeEMsOERBQWdDO0FBRWhDO0lBQUE7SUE0QkEsQ0FBQztJQTFCRzs7Ozs7Ozs7O09BU0c7SUFDVSxhQUFNLEdBQW5CLFVBQW9CLElBQVksRUFBRSxRQUErQjs7Ozs7O3dCQUN2RCxRQUFRLEdBQUcscUJBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs2QkFDeEQsQ0FBQyxxQkFBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBNUIsd0JBQTRCO3dCQUM1QixxQkFBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3dCQUN2RCxxQkFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFwQixTQUFvQixDQUFDOzs7Ozs7S0FFNUI7SUFFRDs7O09BR0c7SUFDSSxhQUFNLEdBQWIsVUFBYyxJQUFZO1FBQ3RCLElBQU0sUUFBUSxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUQscUJBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQTFCYyxrQkFBVyxHQUFHLHFCQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsaUJBQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQTJCN0YsYUFBQztDQUFBLEFBNUJELElBNEJDO0FBNUJZLHdCQUFNIn0=