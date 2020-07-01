"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.npm = void 0;
var npm = (function () {
    function npm() {
    }
    npm.install = function (pkg) {
        if (typeof pkg == "string") {
            this.args.push({ install: pkg });
        }
        else if (Array.isArray(pkg)) {
            pkg.forEach(function (item) {
                npm.args.push({ install: item });
            });
        }
        this.run();
        return this;
    };
    npm.run = function () {
        if (this.args && this.args.length) {
            if (this.timer_run) {
                clearTimeout(this.timer_run);
            }
            setTimeout(function () {
                npm.timer_run = setTimeout(function () {
                    npm.run();
                }, 3000);
            }, 200);
            if (this.running) {
                return;
            }
            var args = this.args[0];
            if (typeof args == "object") {
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (typeof key == "string" && typeof args[key] == "string") {
                            console.log("npm", args);
                            npm.npm([key, args[key]]);
                        }
                    }
                }
            }
            this.args.shift();
        }
    };
    npm.npm = function (args) {
        execute("npm " + args.join(" "));
    };
    npm.args = [];
    npm.timer_run = null;
    npm.running = null;
    return npm;
}());
exports.npm = npm;
//# sourceMappingURL=npm.js.map