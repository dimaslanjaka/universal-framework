"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upath = require("upath");
var fs_1 = require("fs");
var scp2_1 = require("scp2");
var Uploader = /** @class */ (function () {
    function Uploader(config, cli) {
        this.config = config;
        this.cli = cli;
    }
    Uploader.prototype.connect = function () {
        var _this = this;
        this.client = new scp2_1.Client({
            port: this.config.port,
            host: this.config.host,
            username: this.config.username,
            password: this.config.password,
            // agentForward: true,
            privateKey: this.config.privateKey ? fs_1.readFileSync(upath.normalizeSafe(this.config.privateKey)).toString() : undefined,
        });
        //console.log(this.client);
        // Triggers the initial connection
        this.client.sftp(function (err, sftp) {
            if (err) {
                console.log("There was a problem with connection");
            }
        });
        return new Promise(function (resolve, reject) {
            _this.client.on("ready", function () {
                resolve("connected");
            });
        });
    };
    Uploader.prototype.getRemotePath = function (path) {
        var normalPath = upath.normalizeSafe(path);
        var normalLocalPath = upath.normalizeSafe(this.config.localPath);
        var remotePath = normalPath.replace(normalLocalPath, this.config.remotePath);
        var pathJoin = upath.join(this.config.remotePath, remotePath);
        return pathJoin;
        //console.log(pathJoin);
        //return upath.normalizeSafe(`${this.config.remotePath}/${remotePath}`);
        //return upath.normalizeSafe(remotePath);
    };
    Uploader.prototype.unlinkFile = function (fileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var remote = _this.getRemotePath(fileName);
            _this.client.sftp(function (err, sftp) {
                if (err) {
                    reject('SFTP cannot be created');
                }
                else {
                    sftp.unlink(remote, function (err) {
                        if (err) {
                            reject('File could not be deleted');
                        }
                        else {
                            resolve(remote);
                        }
                    });
                }
            });
        });
    };
    Uploader.prototype.unlinkFolder = function (folderPath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var remote = _this.getRemotePath(folderPath);
            _this.client.sftp(function (err, sftp) {
                if (err) {
                    reject('SFTP cannot be created');
                }
                else {
                    sftp.rmdir(remote, function (err) {
                        if (err) {
                            reject('Folder could not be deleted');
                        }
                        else {
                            resolve(remote);
                        }
                    });
                }
            });
        });
    };
    Uploader.prototype.uploadFile = function (fileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var remote = _this.getRemotePath(fileName);
            ///console.log(remote);
            // Client upload also creates the folder but creates it using local mode
            // in windows it might mean we won't have permissons to save the fileName
            // So I create the folder manually here to solve that issue.
            // Mode we set can be configured from the config file
            _this.client.mkdir(upath.dirname(remote), { mode: _this.config.pathMode }, function (err) {
                if (err) {
                    reject({
                        message: "Could not create " + upath.dirname(remote),
                        error: err
                    });
                }
                else {
                    // Uplad the file
                    _this.client.upload(fileName, remote, function (err) {
                        if (err) {
                            reject({
                                message: "Could not upload " + remote,
                                error: err
                            });
                        }
                        else {
                            resolve(remote);
                        }
                    });
                }
            });
        });
    };
    return Uploader;
}());
exports.default = Uploader;
