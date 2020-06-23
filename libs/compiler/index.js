"use strict";
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var misc = tslib_1.__importStar(require("./framework"));
var filemanager_1 = tslib_1.__importDefault(require("./filemanager"));
var log_1 = tslib_1.__importDefault(require("./log"));
var sorter_1 = tslib_1.__importDefault(require("./sorter"));
var framework = (function (_super) {
    tslib_1.__extends(framework, _super);
    function framework() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.filemanager = filemanager_1.default;
        _this.misc = misc.dimas;
        _this.log = log_1.default;
        _this.array = {
            sorter: sorter_1.default,
        };
        return _this;
    }
    return framework;
}(core_1.default));
module.exports = framework;
