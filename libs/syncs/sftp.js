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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Z0cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zeW5jcy9zZnRwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1EQUErQjtBQUMvQix5QkFBa0M7QUFDbEMsNkJBQThCO0FBRTlCLDBEQUE0QjtBQUU1QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDO0FBRXJDO0lBSUUsY0FBb0IsTUFBYztRQUFkLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsc0JBQU8sR0FBUDtRQUFBLGlCQTJCQztRQTFCQyxHQUFHO1FBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGFBQU0sQ0FBQztZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO1lBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7WUFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO1lBQzlCLHNCQUFzQjtZQUN0QixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO2dCQUNoQyxDQUFDLENBQUMsaUJBQVksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RFLENBQUMsQ0FBQyxTQUFTO1NBRWQsQ0FBQyxDQUFDO1FBQ0gsMkJBQTJCO1FBRTNCLGtDQUFrQztRQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBRSxJQUFJO1lBQ3pCLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLENBQUMs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