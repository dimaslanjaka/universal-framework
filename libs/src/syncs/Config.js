"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FILE_NAME = exports.EXIT_CODE = void 0;
var jsonplus_1 = require("jsonplus");
var fs_1 = require("fs");
var path_1 = require("path");
var EXIT_CODE;
(function (EXIT_CODE) {
    /**
     * Exit normally
     */
    EXIT_CODE[EXIT_CODE["NORMAL"] = 0] = "NORMAL";
    /**
     * Any kind exit with error
     */
    EXIT_CODE[EXIT_CODE["RUNTIME_FAILURE"] = 1] = "RUNTIME_FAILURE";
    /**
     * If user terminates with ctrl-c use this
     */
    EXIT_CODE[EXIT_CODE["TERMINATED"] = 130] = "TERMINATED";
    /**
     * Tell user that arguments were wrong
     */
    EXIT_CODE[EXIT_CODE["INVALID_ARGUMENT"] = 128] = "INVALID_ARGUMENT";
})(EXIT_CODE = exports.EXIT_CODE || (exports.EXIT_CODE = {}));
exports.CONFIG_FILE_NAME = 'sync-config.json';
var Config = /** @class */ (function () {
    function Config() {
        this._filename = path_1.join(process.cwd(), exports.CONFIG_FILE_NAME);
    }
    Config.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._fetch();
            _this._expand();
            var ignores = [/node\_modules/, /vendor/, /\.git/];
            if (_this.ignores.length) {
                _this.ignores = _this.ignores.concat(ignores);
            }
            else {
                _this.ignores = ignores;
            }
            // Temporary
            if (!_this.password) {
                reject('Password required');
                throw 'Password required';
                //resolve();
            }
            else {
                resolve();
            }
        });
    };
    Config.prototype._fetch = function () {
        if (fs_1.existsSync(this._filename)) {
            var configraw = void 0;
            if ((configraw = fs_1.readFileSync(this._filename))) {
                try {
                    this._config = jsonplus_1.parse(configraw.toString());
                }
                catch (e) {
                    console.log('Could not parse DB file. Make sure JSON is correct', EXIT_CODE.RUNTIME_FAILURE);
                }
            }
            else {
                console.log('Cannot read config file. Make sure you have permissions', EXIT_CODE.INVALID_ARGUMENT);
            }
        }
        else {
            console.log('Config file not found', EXIT_CODE.INVALID_ARGUMENT);
        }
    };
    /**
     * @TODO add checks on required values
     */
    Config.prototype._expand = function () {
        var _this = this;
        [
            'host',
            'port',
            'username',
            'password',
            'pathMode',
            'localPath',
            'remotePath',
            'ignores',
            'privateKey',
        ].forEach(function (prop) {
            _this[prop] = _this._config[prop] || _this[prop];
        });
    };
    return Config;
}());
exports.default = Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFpQztBQUNqQyx5QkFBOEM7QUFDOUMsNkJBQXdDO0FBMEJ4QyxJQUFZLFNBb0JYO0FBcEJELFdBQVksU0FBUztJQUNuQjs7T0FFRztJQUNILDZDQUFVLENBQUE7SUFFVjs7T0FFRztJQUNILCtEQUFtQixDQUFBO0lBRW5COztPQUVHO0lBQ0gsdURBQWdCLENBQUE7SUFFaEI7O09BRUc7SUFDSCxtRUFBc0IsQ0FBQTtBQUN4QixDQUFDLEVBcEJXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBb0JwQjtBQUVZLFFBQUEsZ0JBQWdCLEdBQUcsa0JBQWtCLENBQUM7QUFFbkQ7SUFhRTtRQUNFLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSx3QkFBZ0IsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQUEsaUJBb0JDO1FBbkJDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDZixJQUFJLE9BQU8sR0FBRyxDQUFDLGVBQWUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkQsSUFBSSxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsS0FBSSxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUM3QztpQkFBTTtnQkFDTCxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzthQUN4QjtZQUVELFlBQVk7WUFDWixJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDbEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQzVCLE1BQU0sbUJBQW1CLENBQUM7Z0JBQzFCLFlBQVk7YUFDYjtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQzthQUNYO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sdUJBQU0sR0FBZDtRQUNFLElBQUksZUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM5QixJQUFJLFNBQVMsU0FBUSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtnQkFDOUMsSUFBSTtvQkFDRixJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7aUJBQzVDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsb0RBQW9ELEVBQ3BELFNBQVMsQ0FBQyxlQUFlLENBQzFCLENBQUM7aUJBQ0g7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxDQUNULHlEQUF5RCxFQUN6RCxTQUFTLENBQUMsZ0JBQWdCLENBQzNCLENBQUM7YUFDSDtTQUNGO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ssd0JBQU8sR0FBZjtRQUFBLGlCQWNDO1FBYkM7WUFDRSxNQUFNO1lBQ04sTUFBTTtZQUNOLFVBQVU7WUFDVixVQUFVO1lBQ1YsVUFBVTtZQUNWLFdBQVc7WUFDWCxZQUFZO1lBQ1osU0FBUztZQUNULFlBQVk7U0FDYixDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7WUFDYixLQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFoRkQsSUFnRkMifQ==