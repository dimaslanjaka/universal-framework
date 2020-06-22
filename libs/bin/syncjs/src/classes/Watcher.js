"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chokidar = require("chokidar");
var chalk = require("chalk");
var observatory = require("observatory");
var Watcher = /** @class */ (function () {
    function Watcher(uploader, config, cli, base) {
        var _this = this;
        if (base === void 0) { base = config.localPath; }
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
                //console.log('remote' + remote);
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
        /*setInterval(function () {
            console.log(base);
        }, 5000);*/
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
        //const log = console.log.bind(console);
        // Attach events
        ["all", "add", "change", "unlink", "unlinkDir"].forEach(function (method) {
            _this.files.on(method, _this.handler(method));
        });
    }
    Watcher.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.files.on("ready", resolve);
        });
    };
    Watcher.prototype.handler = function (method) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var path, event = method;
            // Handle argument difference
            if (method === 'all') {
                path = args[1];
                event = args[0];
            }
            else {
                path = args[0];
            }
            //console.log(path);
            // If not, continue as ususal
            _this[method].apply(_this, args);
        };
    };
    return Watcher;
}());
exports.default = Watcher;
