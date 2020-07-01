"use strict";
var chalk = require("chalk");
var states = {
    active: "active",
    done: "done",
    fail: "fail",
};
var loader = function () {
    (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
            process.stdout.write("\r" + P[x++]);
            x &= 3;
        }, 250);
    })();
};
var defaultSettings = {
    width: 55,
    prefix: ">>> ",
    write: process.stdout.write.bind(process.stdout),
    formatStatus: function (statusLabel, state) {
        if (!statusLabel) {
            return "";
        }
        if (state === states.active) {
            return chalk.yellow(statusLabel);
        }
        if (state === states.done) {
            return chalk.green(statusLabel);
        }
        if (state === states.fail) {
            return chalk.red(statusLabel);
        }
        return statusLabel;
    },
};
module.exports = {
    state: states,
    defaultSettings: defaultSettings,
};
//# sourceMappingURL=constants.js.map