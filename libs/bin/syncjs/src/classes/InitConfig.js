"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upath = require("upath");
var fs_1 = require("fs");
var Config_1 = require("./Config");
var inquirer = require("inquirer");
var InitConfig2 = /** @class */ (function () {
    function InitConfig2() {
        var currentConf = {};
        try {
            currentConf = require(upath.resolve(process.cwd(), Config_1.CONFIG_FILE_NAME));
            console.log("Existing config found.");
        }
        catch (e) { }
        var questions = [
            {
                type: "input",
                name: "username",
                message: "Username to connect:",
                validate: function (answer) {
                    if (!answer) {
                        return "Username is required";
                    }
                    return true;
                },
                default: currentConf.username
            },
            {
                type: "list",
                name: "authType",
                message: "How do you want to authenticate:",
                choices: [
                    "Password in config",
                    "Ask password during connection",
                    "Private key"
                ]
            },
            {
                type: "password",
                name: "password",
                message: "Enter your password:",
                when: function (answers) { return answers.authType === "Password in config"; }
            },
            {
                type: "input",
                name: "privateKey",
                message: "Path to private key:",
                default: currentConf.privateKey,
                when: function (answers) { return answers.authType === "Private key"; },
                filter: function (answer) {
                    return upath.normalizeSafe(answer);
                }
            },
            {
                type: "input",
                name: "host",
                default: currentConf.host,
                message: "Hostname or IP to connect",
                validate: function (answer) {
                    if (!answer) {
                        return "Hostname is required";
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "port",
                message: "Port to conenct:",
                default: currentConf.port || "use default"
            },
            {
                type: "input",
                name: "localPath",
                message: "Local Path",
                filter: function (answer) {
                    return upath.normalizeSafe(answer);
                },
                default: currentConf.localPath || process.cwd()
            },
            {
                type: "input",
                name: "remotePath",
                message: "Remote Path",
                default: currentConf.remotePath,
                validate: function (answer) {
                    if (!answer) {
                        return "Remote Path is required";
                    }
                    return true;
                }
            }
        ];
        inquirer.prompt(questions)['then'](function (answers) {
            var pass;
            // if default, don't put it in config
            if (answers.port == "use default") {
                delete answers.port;
            }
            // no need this in the config
            delete answers.authType;
            if (answers.password) {
                pass = answers.password;
                answers.password = "****";
            }
            inquirer.prompt({
                type: "confirm",
                name: "yes",
                message: JSON.stringify(answers, null, 4) + "\nDoes this look good?"
            })['then'](function (answer) {
                if (answer.yes) {
                    if (pass) {
                        answers.password = pass;
                    }
                    fs_1.writeFileSync(Config_1.CONFIG_FILE_NAME, JSON.stringify(answers, null, 4), 'utf8');
                }
                else {
                    console.log("No config was saved.");
                }
            });
        });
    }
    return InitConfig2;
}());
exports.default = InitConfig2;
