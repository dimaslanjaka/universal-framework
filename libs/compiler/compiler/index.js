"use strict";
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var misc = tslib_1.__importStar(require("./framework"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var log_1 = tslib_1.__importDefault(require("./log"));
var sorter_1 = tslib_1.__importDefault(require("./sorter"));
var process_1 = tslib_1.__importDefault(require("./process"));
var locutus = tslib_1.__importStar(require("../locutus/src/index"));
var sprintf = locutus.php.strings.sprintf;
//var sprintf = require('./libs/src/locutus/src/php/strings/sprintf');
/**
 * @class {core}
 * @extends {core}
 * @inheritdoc {core}
 */
var framework = /** @class */ (function (_super) {
    tslib_1.__extends(framework, _super);
    function framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filemanager = filemanager_1.default;
        _this.log = log_1.default;
        _this.process = process_1.default;
        return _this;
    }
    framework.filemanager = filemanager_1.default;
    framework.misc = misc.dimas;
    framework.log = log_1.default;
    framework.array = {
        sorter: sorter_1.default,
    };
    framework.process = process_1.default;
    return framework;
}(core_1.default));
module.exports = sprintf;
module.exports = framework;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tcGlsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3REFBMEI7QUFDMUIsd0RBQW9DO0FBQ3BDLHNFQUF3QztBQUN4QyxzREFBd0I7QUFDeEIsNERBQThCO0FBQzlCLDhEQUFnQztBQUNoQyxvRUFBZ0Q7QUFDaEQsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBQzFDLHNFQUFzRTtBQUV0RTs7OztHQUlHO0FBQ0g7SUFBd0IscUNBQUk7SUFBNUI7UUFBQSxxRUFXQztRQVZDLGlCQUFXLEdBQUcscUJBQVcsQ0FBQztRQUcxQixTQUFHLEdBQUcsYUFBRyxDQUFDO1FBS1YsYUFBTyxHQUFHLGlCQUFPLENBQUM7O0lBRXBCLENBQUM7SUFUUSxxQkFBVyxHQUFHLHFCQUFXLENBQUM7SUFDMUIsY0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFbEIsYUFBRyxHQUFHLGFBQUcsQ0FBQztJQUNWLGVBQUssR0FBRztRQUNiLE1BQU0sRUFBRSxnQkFBTTtLQUNmLENBQUM7SUFFSyxpQkFBTyxHQUFHLGlCQUFPLENBQUM7SUFDM0IsZ0JBQUM7Q0FBQSxBQVhELENBQXdCLGNBQUksR0FXM0I7QUFHRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUR6QixpQkFBUyxTQUFTLENBQUMifQ==