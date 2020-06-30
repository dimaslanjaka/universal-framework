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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N5bmNzL0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUM7QUFDakMseUJBQThDO0FBQzlDLDZCQUF3QztBQTBCeEMsSUFBWSxTQW9CWDtBQXBCRCxXQUFZLFNBQVM7SUFDbkI7O09BRUc7SUFDSCw2Q0FBVSxDQUFBO0lBRVY7O09BRUc7SUFDSCwrREFBbUIsQ0FBQTtJQUVuQjs7T0FFRztJQUNILHVEQUFnQixDQUFBO0lBRWhCOztPQUVHO0lBQ0gsbUVBQXNCLENBQUE7QUFDeEIsQ0FBQyxFQXBCVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQW9CcEI7QUFFWSxRQUFBLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO0FBRW5EO0lBYUU7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsd0JBQWdCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUFBLGlCQW9CQztRQW5CQyxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2YsSUFBSSxPQUFPLEdBQUcsQ0FBQyxlQUFlLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDN0M7aUJBQU07Z0JBQ0wsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7YUFDeEI7WUFFRCxZQUFZO1lBQ1osSUFBSSxDQUFDLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLG1CQUFtQixDQUFDO2dCQUMxQixZQUFZO2FBQ2I7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVCQUFNLEdBQWQ7UUFDRSxJQUFJLGVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxTQUFTLFNBQVEsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlDLElBQUk7b0JBQ0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2lCQUM1QztnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixPQUFPLENBQUMsR0FBRyxDQUNULG9EQUFvRCxFQUNwRCxTQUFTLENBQUMsZUFBZSxDQUMxQixDQUFDO2lCQUNIO2FBQ0Y7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FDVCx5REFBeUQsRUFDekQsU0FBUyxDQUFDLGdCQUFnQixDQUMzQixDQUFDO2FBQ0g7U0FDRjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsRUFBRSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNLLHdCQUFPLEdBQWY7UUFBQSxpQkFjQztRQWJDO1lBQ0UsTUFBTTtZQUNOLE1BQU07WUFDTixVQUFVO1lBQ1YsVUFBVTtZQUNWLFVBQVU7WUFDVixXQUFXO1lBQ1gsWUFBWTtZQUNaLFNBQVM7WUFDVCxZQUFZO1NBQ2IsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ2IsS0FBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBaEZELElBZ0ZDIn0=