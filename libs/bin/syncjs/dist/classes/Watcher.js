"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var chokidar = require("chokidar");
var chalk = require("chalk");
var observatory = require("observatory");

var Watcher = function () {
    function Watcher(uploader, config, cli) {
        var _this = this;

        var base = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : config.localPath;

        _classCallCheck(this, Watcher);

        this.uploader = uploader;
        this.config = config;
        this.cli = cli;
        this.base = base;
        this.tasks = {};
        this.eventToWord = {
            add: chalk.green("ADDED"),
            change: chalk.green("CHANGED"),
            unlink: chalk.red("DELETED"),
            unlinkDir: chalk.red("DELETED")
        };
        this.all = function (event, path) {
            if (event in _this.eventToWord) {
                _this.tasks[path] = observatory.add(_this.eventToWord[event] + " " + path.replace(_this.config.localPath, ""));
                _this.tasks[path].status("Uploading");
            }
        };
        this.add = function (path) {
            _this.uploader.uploadFile(path).then(function (remote) {
                _this.tasks[path].done("Done");
            }).catch(function (err) {
                _this.tasks[path].fail("Fail").details(err.message);
            });
        };
        this.change = function (path) {
            _this.uploader.uploadFile(path).then(function (remote) {
                _this.tasks[path].done("Done");
            }).catch(function (err) {
                _this.tasks[path].fail("Fail").details(err.message);
            });
        };
        this.unlink = function (path) {
            _this.uploader.unlinkFile(path).then(function (remote) {
                _this.tasks[path].done("Done");
            }).catch(function (err) {
                _this.tasks[path].fail("Fail").details("Error deleting file " + err);
            });
        };
        this.unlinkDir = function (path) {
            _this.uploader.unlinkFolder(path).then(function (remote) {
                _this.tasks[path].done("Done");
            }).catch(function (err) {
                _this.tasks[path].fail("Fail").details("Error deleting folder " + err);
            });
        };
        var defaultIgnores = [/node_modules/, /.git/, /.svn/, /bower_components/, /vendor/, /tmp/];

        this.files = chokidar.watch(base, {
            ignored: defaultIgnores.concat(this.config.ignores),
            ignoreInitial: true,
            followSymlinks: true,
            disableGlobbing: false,
            usePolling: false,
            interval: 100,
            binaryInterval: 300,
            alwaysStat: false,
            depth: 99,
            awaitWriteFinish: {
                stabilityThreshold: 2000,
                pollInterval: 100
            },
            ignorePermissionErrors: false,
            persistent: true
        });

        ["all", "add", "change", "unlink", "unlinkDir"].forEach(function (method) {
            _this.files.on(method, _this.handler(method));
        });
    }

    _createClass(Watcher, [{
        key: "ready",
        value: function ready() {
            var _this2 = this;

            return new Promise(function (resolve) {
                _this2.files.on("ready", resolve);
            });
        }
    }, {
        key: "handler",
        value: function handler(method) {
            var _this3 = this;

            return function () {
                var path = void 0,
                    event = method;

                if (method === 'all') {
                    path = arguments.length <= 1 ? undefined : arguments[1];
                    event = arguments.length <= 0 ? undefined : arguments[0];
                } else {
                    path = arguments.length <= 0 ? undefined : arguments[0];
                }

                _this3[method].apply(_this3, arguments);
            };
        }
    }]);

    return Watcher;
}();

exports.default = Watcher;