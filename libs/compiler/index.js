"use strict";
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var misc = tslib_1.__importStar(require("./framework"));
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
    framework.misc = misc.dimas;
    framework.sorter = sorter_1.default;
    framework.process = process_1.default;
    framework.pathFromRoot = backup_1.fromRoot;
    framework.backup = backup_1.backup;
    return framework;
}(core_1.default));
module.exports = framework;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3REFBMEI7QUFDMUIsd0RBQW9DO0FBQ3BDLHNFQUF3QztBQUN4QywwQkFBMEI7QUFDMUIsNERBQThCO0FBQzlCLDhEQUFnQztBQUNoQywrQ0FBd0Q7QUFFeEQ7SUFBd0IscUNBQUk7SUFBNUI7UUFBQSxxRUFZQztRQVhDLGlCQUFXLEdBQWdCLHFCQUFXLENBQUM7UUFHdkMsWUFBTSxHQUFXLGdCQUFNLENBQUM7UUFFeEIsYUFBTyxHQUFZLGlCQUFPLENBQUM7UUFHM0Isa0JBQVksR0FBRyxpQkFBUSxDQUFDO1FBRXhCLFlBQU0sR0FBRyxlQUFNLENBQUM7O0lBQ2xCLENBQUM7SUFWUSxxQkFBVyxHQUFnQixxQkFBVyxDQUFDO0lBQ3ZDLGNBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBRWxCLGdCQUFNLEdBQVcsZ0JBQU0sQ0FBQztJQUV4QixpQkFBTyxHQUFZLGlCQUFPLENBQUM7SUFDM0Isc0JBQVksR0FBRyxpQkFBUSxDQUFDO0lBRXhCLGdCQUFNLEdBQUcsZUFBTSxDQUFDO0lBRXpCLGdCQUFDO0NBQUEsQUFaRCxDQUF3QixjQUFJLEdBWTNCO0FBRUQsaUJBQVMsU0FBUyxDQUFDIn0=