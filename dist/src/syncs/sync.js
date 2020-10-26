"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Config_1 = tslib_1.__importDefault(require("./Config"));
var upath = tslib_1.__importStar(require("upath"));
var fs = tslib_1.__importStar(require("fs"));
var process = tslib_1.__importStar(require("process"));
var observatory_1 = tslib_1.__importDefault(require("../observatory/ts/observatory"));
var sftp_1 = tslib_1.__importDefault(require("./sftp"));
var sync = /** @class */ (function () {
    function sync() {
        var _this = this;
        this.task = observatory_1.default.add("Initializing...");
        // Get config
        this.config = new Config_1.default();
        this.task.status("reading config");
        this.config
            .ready()
            .then(function () {
            // Get Command line interface
            //this.cli.write("Connecting");
            //this.cli.startProgress();
            _this.task.status("watching files");
            var ori = _this.config.localPath;
            var root = process.cwd();
            if (upath.isAbsolute(_this.config.localPath)) {
                var mod = upath.normalizeSafe(_this.config.localPath.replace(root, ""));
                if (mod == ori) {
                    throw new Error("Cannot find absolute path");
                }
                else {
                    _this.config.localPath = "." + mod;
                }
            }
            _this.config.localPath = upath.normalizeSafe(_this.config.localPath);
            fs.exists(_this.config.localPath, function (es) {
                if (!es) {
                    throw new Error("Local path not exists");
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
                        this.task.status("connecting server");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYnMvc3JjL3N5bmNzL3N5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNERBQThCO0FBQzlCLG1EQUErQjtBQUMvQiw2Q0FBeUI7QUFDekIsdURBQW1DO0FBRW5DLHNGQUF3RDtBQUd4RCx3REFBMEI7QUFFMUI7SUFNRTtRQUFBLGlCQStDQztRQTlDQyxJQUFJLENBQUMsSUFBSSxHQUFHLHFCQUFXLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFL0MsYUFBYTtRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsTUFBTTthQUNSLEtBQUssRUFBRTthQUNQLElBQUksQ0FBQztZQUNKLDZCQUE2QjtZQUM3QiwrQkFBK0I7WUFDL0IsMkJBQTJCO1lBQzNCLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFbkMsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7WUFDaEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMzQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUMzQixLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUN4QyxDQUFDO2dCQUNGLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRTtvQkFDZCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7aUJBQzlDO3FCQUFNO29CQUNMLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7aUJBQ25DO2FBQ0Y7WUFFRCxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxFQUFFLEVBQUU7b0JBQ1AsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2lCQUMxQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFbEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUM7Ozs7O3dCQUNKLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7d0JBRTFCLHFCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUE7O3dCQUEvQixHQUFHLEdBQUcsU0FBeUI7d0JBQ3JDLGdEQUFnRDt3QkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDOzs7O2FBRXRDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDSCxXQUFDO0FBQUQsQ0FBQyxBQXRERCxJQXNEQyJ9