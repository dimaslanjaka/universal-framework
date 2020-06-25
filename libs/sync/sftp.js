"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var upath = tslib_1.__importStar(require("upath"));
var fs_1 = require("fs");
var scp2_1 = require("scp2");
var local_1 = tslib_1.__importDefault(require("./local"));
var Client2 = require('scp2').Client;
var sftp = /** @class */ (function () {
    function sftp(config) {
        this.config = config;
        this.local = new local_1.default(config);
    }
    sftp.prototype.connect = function () {
        var _this = this;
        ///
        this.client = new scp2_1.Client({
            port: this.config.port,
            host: this.config.host,
            username: this.config.username,
            password: this.config.password,
            // agentForward: true,
            privateKey: this.config.privateKey
                ? fs_1.readFileSync(upath.normalizeSafe(this.config.privateKey)).toString()
                : undefined,
        });
        //console.log(this.client);
        // Triggers the initial connection
        this.client.sftp(function (err, sftp) {
            if (err) {
                console.log('There was a problem with connection');
            }
        });
        return new Promise(function (resolve, reject) {
            _this.client.on('ready', function () {
                resolve('connected');
            });
        });
    };
    sftp.prototype.getRemotePath = function (path) {
        var normalPath = upath.normalizeSafe(path);
        var normalLocalPath = upath.normalizeSafe(this.config.localPath);
        var remotePath = normalPath.replace(normalLocalPath, this.config.remotePath);
        var pathJoin = upath.join(this.config.remotePath, remotePath);
        return pathJoin;
        //console.log(pathJoin);
        //return upath.normalizeSafe(`${this.config.remotePath}/${remotePath}`);
        //return upath.normalizeSafe(remotePath);
    };
    sftp.prototype.unlinkFile = function (fileName) {
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
    sftp.prototype.unlinkFolder = function (folderPath) {
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
    sftp.prototype.uploadFile = function (fileName) {
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
                        error: err,
                    });
                }
                else {
                    // Uplad the file
                    _this.client.upload(fileName, remote, function (err) {
                        if (err) {
                            reject({
                                message: "Could not upload " + remote,
                                error: err,
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
    return sftp;
}());
exports.default = sftp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Z0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zeW5jL3NmdHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQStCO0FBQy9CLHlCQUFrQztBQUNsQyw2QkFBOEI7QUFFOUIsMERBQTRCO0FBRTVCLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFFckM7SUFJRSxjQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxzQkFBTyxHQUFQO1FBQUEsaUJBMkJDO1FBMUJDLEdBQUc7UUFDSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksYUFBTSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUN0QixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDOUIsc0JBQXNCO1lBQ3RCLFVBQVUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVU7Z0JBQ2hDLENBQUMsQ0FBQyxpQkFBWSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRTtnQkFDdEUsQ0FBQyxDQUFDLFNBQVM7U0FFZCxDQUFDLENBQUM7UUFDSCwyQkFBMkI7UUFFM0Isa0NBQWtDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUk7WUFDekIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxD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