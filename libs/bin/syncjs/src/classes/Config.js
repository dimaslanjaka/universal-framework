"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_FILE_NAME = void 0;
var jsonplus_1 = require("jsonplus");
var fs_1 = require("fs");
var path_1 = require("path");
var CLI_1 = require("./CLI");
exports.CONFIG_FILE_NAME = "sync-config.json";
var Config = /** @class */ (function () {
    function Config(cli) {
        this.cli = cli;
        this.pathMode = "0755";
        this._filename = path_1.join(process.cwd(), this.cli.getArgument("config", exports.CONFIG_FILE_NAME));
    }
    Config.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this._fetch();
            _this._expand();
            // Temporary
            if (!_this.password && !_this.privateKey) {
                _this.cli.read("Enter password to connect:", true).then(function (answer) {
                    _this.password = _this._config.password = answer;
                    resolve();
                });
            }
            else {
                resolve();
            }
        });
    };
    Config.prototype._fetch = function () {
        if (fs_1.existsSync(this._filename)) {
            var configraw = void 0;
            if (configraw = fs_1.readFileSync(this._filename)) {
                try {
                    this._config = jsonplus_1.parse(configraw.toString());
                }
                catch (e) {
                    this.cli.usage("Could not parse DB file. Make sure JSON is correct", CLI_1.EXIT_CODE.RUNTIME_FAILURE);
                }
            }
            else {
                this.cli.usage("Cannot read config file. Make sure you have permissions", CLI_1.EXIT_CODE.INVALID_ARGUMENT);
            }
        }
        else {
            this.cli.usage("Config file not found", CLI_1.EXIT_CODE.INVALID_ARGUMENT);
        }
    };
    /**
     * @TODO add checks on required values
     */
    Config.prototype._expand = function () {
        var _this = this;
        ["host", "port", "username", "password", "pathMode",
            "localPath", "remotePath", "ignores", "privateKey"].forEach(function (prop) {
            _this[prop] = _this._config[prop] || _this[prop];
        });
    };
    return Config;
}());
exports.default = Config;
