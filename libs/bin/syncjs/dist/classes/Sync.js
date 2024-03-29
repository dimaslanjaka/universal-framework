"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var Config_1 = require("./Config");
var CLI_1 = require("./CLI");
var Watcher_1 = require("./Watcher");
var Uploader_1 = require("./Uploader");
var InitConfig_1 = require("./InitConfig");
var upath = require("upath");
var fs = require("fs");
var process = require("process");
var observatory = require("observatory");

var Sync = function Sync() {
    var _this = this;

    _classCallCheck(this, Sync);

    this.cli = new CLI_1.default();
    this.task = observatory.add("Initializing...");
    if (this.cli.hasStartupCommand("init")) {
        new InitConfig_1.default();
    } else {
        this.config = new Config_1.default(this.cli);
        this.task.status("reading config");
        this.config.ready().then(function () {
            _this.task.status("watching files");
            var ori = _this.config.localPath;
            var root = process.cwd();
            if (upath.isAbsolute(_this.config.localPath)) {
                var mod = upath.normalizeSafe(_this.config.localPath.replace(root, ''));
                if (mod == ori) {
                    throw new Error("Cannot find absolute path");
                } else {
                    _this.config.localPath = '.' + mod;
                }
            }
            _this.config.localPath = upath.normalizeSafe(_this.config.localPath);
            fs.exists(_this.config.localPath, function (es) {
                if (!es) {
                    throw new Error("Local path not exists");
                }
            });

            _this.uploader = new Uploader_1.default(_this.config, _this.cli);

            _this.watch = new Watcher_1.default(_this.uploader, _this.config, _this.cli);

            return _this.watch.ready();
        }).then(function () {
            _this.task.status("connecting server");
            return _this.uploader.connect();
        }).then(function () {
            _this.task.done("Connected").details(_this.config.host);
            _this.cli.workspace();
        });
    }
};

exports.default = Sync;