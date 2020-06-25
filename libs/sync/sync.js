"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Config_1 = tslib_1.__importDefault(require("./Config"));
var upath = tslib_1.__importStar(require("upath"));
var fs = tslib_1.__importStar(require("fs"));
var process = tslib_1.__importStar(require("process"));
var observatory_1 = tslib_1.__importDefault(require("observatory"));
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
            .then(function () {
            _this.task.status('connecting server');
            return _this.sftp.connect();
        })
            .then(function (any) {
            //console.log(any);
            // this.cli.stopProgress();
            //this.task.done(`Connected ${any}`).details(this.config.host);
            //this.cli.workspace();
            //this.task.done(any);
        });
    }
    return sync;
}());
exports.default = sync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zeW5jL3N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQThCO0FBQzlCLG1EQUErQjtBQUMvQiw2Q0FBeUI7QUFDekIsdURBQW1DO0FBRW5DLG9FQUFzQztBQUd0Qyx3REFBMEI7QUFFMUI7SUFNRTtRQUFBLGlCQW1EQztRQWxEQyxJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUFXLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFL0MsYUFBYTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTTthQUNSLEtBQUssRUFBRTthQUNQLElBQUksQ0FBQztZQUNKLDZCQUE2QjtZQUM3QiwrQkFBK0I7WUFDL0IsMkJBQTJCO1lBQzNCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFbkMsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUN4QyxDQUFDO2dCQUNGLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtvQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7aUJBQzlDO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7aUJBQ25DO2FBQ0Y7WUFFRCxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxFQUFFLEVBQUU7b0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUMxQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUM7WUFDSixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRXRDLE9BQU8sS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQyxHQUFHO1lBQ1IsbUJBQW1CO1lBQ25CLDJCQUEyQjtZQUMzQiwrREFBK0Q7WUFDL0QsdUJBQXVCO1lBQ3ZCLHNCQUFzQjtRQUN4QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQTFERCxJQTBEQyJ9