"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Config_1 = tslib_1.__importDefault(require("./Config"));
var upath = tslib_1.__importStar(require("upath"));
var fs = tslib_1.__importStar(require("fs"));
var process = tslib_1.__importStar(require("process"));
var observatory_1 = tslib_1.__importDefault(require("./../observatory/lib/observatory"));
var sftp_1 = tslib_1.__importDefault(require("./sftp"));
var sync = /** @class */ (function () {
    function sync() {
        var _this = this;
        this.task = observatory_1.default.add('Initializing...');
        // Get config
        this.config = new Config_1.default();
        this.task.status('reading config');
        this.config
            .ready()
            .then(function () {
            // Get Command line interface
            //this.cli.write("Connecting");
            //this.cli.startProgress();
            _this.task.status('watching files');
            var ori = _this.config.localPath;
            var root = process.cwd();
            if (upath.isAbsolute(_this.config.localPath)) {
                var mod = upath.normalizeSafe(_this.config.localPath.replace(root, ''));
                if (mod == ori) {
                    throw new Error('Cannot find absolute path');
                }
                else {
                    _this.config.localPath = '.' + mod;
                }
            }
            _this.config.localPath = upath.normalizeSafe(_this.config.localPath);
            fs.exists(_this.config.localPath, function (es) {
                if (!es) {
                    throw new Error('Local path not exists');
                }
            });
            _this.sftp = new sftp_1.default(_this.config);
            return true;
        })
            .then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var any;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.task.status('connecting server');
                        return [4 /*yield*/, this.sftp.connect()];
                    case 1:
                        any = _a.sent();
                        //this.task.done(any).details(this.config.host);
                        console.log(this.sftp.local.fetch());
                        return [2 /*return*/];
                }
            });
        }); });
    }
    return sync;
}());
exports.default = sync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zeW5jcy9zeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDREQUE4QjtBQUM5QixtREFBK0I7QUFDL0IsNkNBQXlCO0FBQ3pCLHVEQUFtQztBQUVuQyx5RkFBMkQ7QUFHM0Qsd0RBQTBCO0FBRTFCO0lBTUU7UUFBQSxpQkErQ0M7UUE5Q0MsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBVyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRS9DLGFBQWE7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksZ0JBQU0sRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFbkMsSUFBSSxDQUFDLE1BQU07YUFDUixLQUFLLEVBQUU7YUFDUCxJQUFJLENBQUM7WUFDSiw2QkFBNkI7WUFDN0IsK0JBQStCO1lBQy9CLDJCQUEyQjtZQUMzQixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRW5DLElBQUksR0FBRyxHQUFHLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ2hDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QixJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FDM0IsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FDeEMsQ0FBQztnQkFDRixJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUU7b0JBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDTCxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO2lCQUNuQzthQUNGO1lBRUQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25FLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFO2dCQUMzQyxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztpQkFDMUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxjQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWxDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDOzs7Ozt3QkFDSixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3dCQUUxQixxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFBOzt3QkFBL0IsR0FBRyxHQUFHLFNBQXlCO3dCQUNyQyxnREFBZ0Q7d0JBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzs7OzthQUV0QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUF0REQsSUFzREMifQ==