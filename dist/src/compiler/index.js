"use strict";
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
//import { dimas } from "./framework.js";
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
//import log from "./log";
var sorter_1 = tslib_1.__importDefault(require("./sorter"));
var process_1 = tslib_1.__importDefault(require("./process"));
var backup_1 = require("./../archiver/backup");
var framework = /** @class */ (function (_super) {
    tslib_1.__extends(framework, _super);
    function framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filemanager = filemanager_1.default;
        _this.sorter = sorter_1.default;
        _this.process = process_1.default;
        _this.pathFromRoot = backup_1.fromRoot;
        _this.backup = backup_1.backup;
        return _this;
    }
    framework.filemanager = filemanager_1.default;
    //static misc = dimas;
    framework.sorter = sorter_1.default;
    framework.process = process_1.default;
    framework.pathFromRoot = backup_1.fromRoot;
    framework.backup = backup_1.backup;
    return framework;
}(core_1.default));
module.exports = framework;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdEQUEwQjtBQUMxQix5Q0FBeUM7QUFDekMsc0VBQXdDO0FBQ3hDLDBCQUEwQjtBQUMxQiw0REFBOEI7QUFDOUIsOERBQWdDO0FBQ2hDLCtDQUF3RDtBQUV4RDtJQUF3QixxQ0FBSTtJQUE1QjtRQUFBLHFFQVlDO1FBTEMsaUJBQVcsR0FBZ0IscUJBQVcsQ0FBQztRQUN2QyxZQUFNLEdBQVcsZ0JBQU0sQ0FBQztRQUN4QixhQUFPLEdBQVksaUJBQU8sQ0FBQztRQUMzQixrQkFBWSxHQUFHLGlCQUFRLENBQUM7UUFDeEIsWUFBTSxHQUFHLGVBQU0sQ0FBQzs7SUFDbEIsQ0FBQztJQVhRLHFCQUFXLEdBQWdCLHFCQUFXLENBQUM7SUFDOUMsc0JBQXNCO0lBQ2YsZ0JBQU0sR0FBVyxnQkFBTSxDQUFDO0lBQ3hCLGlCQUFPLEdBQVksaUJBQU8sQ0FBQztJQUMzQixzQkFBWSxHQUFHLGlCQUFRLENBQUM7SUFDeEIsZ0JBQU0sR0FBRyxlQUFNLENBQUM7SUFNekIsZ0JBQUM7Q0FBQSxBQVpELENBQXdCLGNBQUksR0FZM0I7QUFFRCxpQkFBUyxTQUFTLENBQUMifQ==