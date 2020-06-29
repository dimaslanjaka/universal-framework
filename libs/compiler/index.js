"use strict";
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var misc = tslib_1.__importStar(require("./framework"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
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
    framework.misc = misc.dimas;
    framework.sorter = sorter_1.default;
    framework.process = process_1.default;
    framework.pathFromRoot = backup_1.fromRoot;
    framework.backup = backup_1.backup;
    return framework;
}(core_1.default));
module.exports = framework;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3REFBMEI7QUFDMUIsd0RBQW9DO0FBQ3BDLHNFQUF3QztBQUV4Qyw0REFBOEI7QUFDOUIsOERBQWdDO0FBQ2hDLCtDQUF3RDtBQUV4RDtJQUF3QixxQ0FBSTtJQUE1QjtRQUFBLHFFQVlDO1FBWEMsaUJBQVcsR0FBZ0IscUJBQVcsQ0FBQztRQUd2QyxZQUFNLEdBQVcsZ0JBQU0sQ0FBQztRQUV4QixhQUFPLEdBQVksaUJBQU8sQ0FBQztRQUczQixrQkFBWSxHQUFHLGlCQUFRLENBQUM7UUFFeEIsWUFBTSxHQUFHLGVBQU0sQ0FBQzs7SUFDbEIsQ0FBQztJQVZRLHFCQUFXLEdBQWdCLHFCQUFXLENBQUM7SUFDdkMsY0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFbEIsZ0JBQU0sR0FBVyxnQkFBTSxDQUFDO0lBRXhCLGlCQUFPLEdBQVksaUJBQU8sQ0FBQztJQUMzQixzQkFBWSxHQUFHLGlCQUFRLENBQUM7SUFFeEIsZ0JBQU0sR0FBRyxlQUFNLENBQUM7SUFFekIsZ0JBQUM7Q0FBQSxBQVpELENBQXdCLGNBQUksR0FZM0I7QUFFRCxpQkFBUyxTQUFTLENBQUMifQ==