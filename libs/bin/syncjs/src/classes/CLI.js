"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXIT_CODE = void 0;
var chalk = require("chalk");
var minimist = require("minimist");
var inquirer = require("inquirer");
var EXIT_CODE;
(function (EXIT_CODE) {
    /**
     * Exit normally
     */
    EXIT_CODE[EXIT_CODE["NORMAL"] = 0] = "NORMAL";
    /**
     * Any kind exit with error
     */
    EXIT_CODE[EXIT_CODE["RUNTIME_FAILURE"] = 1] = "RUNTIME_FAILURE";
    /**
     * If user terminates with ctrl-c use this
     */
    EXIT_CODE[EXIT_CODE["TERMINATED"] = 130] = "TERMINATED";
    /**
     * Tell user that arguments were wrong
     */
    EXIT_CODE[EXIT_CODE["INVALID_ARGUMENT"] = 128] = "INVALID_ARGUMENT";
})(EXIT_CODE = exports.EXIT_CODE || (exports.EXIT_CODE = {}));
var CLI = /** @class */ (function () {
    function CLI() {
        this.pdTime = [];
        this.ui = [];
        this.pauseEvents = [];
        // Parse arguments
        this.args = minimist(process.argv.slice(2));
        // this.ui = new inquirer.ui.BottomBar();
    }
    /**
     * Checks if a command has been passed or not
     * @param command string name of the command
     */
    CLI.prototype.hasStartupCommand = function (command) {
        return this.args._.filter(function (n) { return n === command; }).length > 0;
    };
    /**
     * Gets requested argument
     * @param name string name of the argument
     */
    CLI.prototype.getArgument = function (name, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var value = null;
        if (name in this.args) {
            value = this.args[name];
        }
        else if (name[0] in this.args) {
            value = this.args[name[0]];
        }
        return value !== null ? value : defaultValue;
    };
    CLI.prototype.onPaused = function (event) {
        this.pauseEvents.push(event);
    };
    /**
     * Clear the terminal
     */
    CLI.prototype.clear = function () {
        this.write(chalk.reset("\x1b[2J\x1b[0;0H"));
    };
    /**
     * Write something to terminal
     */
    CLI.prototype.write = function (msg) {
        return process.stdout.write.bind(process.stdout)(msg);
    };
    CLI.prototype.log = function (message) {
        // this.ui.updateBottomBar(message);
        console.log(message);
        // this.showPrompt();
    };
    CLI.prototype.read = function (question, hidden) {
        if (hidden === void 0) { hidden = false; }
        var scheme = {
            type: hidden ? "password" : "input",
            message: question,
            name: "response"
        };
        // Bad type definition
        var promise = inquirer.prompt(scheme);
        this.ui.push(promise['ui']);
        return promise.then(function (answer) {
            return answer.response;
        });
    };
    CLI.prototype.closePrompts = function () {
        this.ui.map(function (ui) {
            if (!ui['closed']) {
                ui.close();
                ui['closed'] = true;
                //console.log("closed now")
            }
            else {
                //console.log("closed Already")
            }
        });
    };
    /**
     * Start printing dots to screen, show script is working
     */
    CLI.prototype.startProgress = function () {
        var _this = this;
        this.pdTime.push(setInterval(function () {
            _this.write(chalk.green("."));
        }, 200));
    };
    /**
     * Stop printing dots when process ends
     */
    CLI.prototype.stopProgress = function () {
        clearInterval(this.pdTime.pop());
    };
    /**
     * Display the workspace for syncjs
     */
    CLI.prototype.workspace = function () {
        this.clear();
        this.write("Started monitoring \n");
        this.write("Quit the script with CONTROL-C\".\n");
        this.write(chalk.magenta("-----------------------------------------------------------\n"));
        //this.showPrompt();
    };
    CLI.prototype.usage = function (message, code) {
        if (message === void 0) { message = null; }
        if (code === void 0) { code = 0; }
        if (message) {
            this.write(chalk.red(message) + "\n");
        }
        this.write(chalk.yellow.underline("\nUSAGE:\n"));
        this.write("Make sure you have the config file by running.\n");
        this.write(chalk.green("syncjs init\n"));
        this.write("--------------------\n");
        //this.write("For more details please visit. https://github.com/serkanyersen/sync\n");
        process.exit(code);
    };
    /**
     * Shorthand command to print help text
     */
    CLI.prototype.getHelp = function (command, text) {
        return chalk.green(command) + ": " + text + "\n";
    };
    /**
     * Display the prompt that asks for input
     */
    CLI.prototype.showPrompt = function () {
        var _this = this;
        if (this.activePrompt) {
            this.closePrompts();
        }
        this.activePrompt = this.read(">>> ");
        this.activePrompt.then(function (answer) {
            _this.handleInput(answer);
            _this.activePrompt = false;
            // as soon as a command is run, show promt again just a like a real shell
            _this.showPrompt();
        });
    };
    /**
     * Handle given input
     */
    CLI.prototype.handleInput = function (input) {
        var _this = this;
        input = input.split(" ");
        var cmd = input[0];
        var arg1 = input[1];
        switch (cmd) {
            case "help":
                var helpText = "";
                helpText += this.getHelp("pause", "Stops observing file changes");
                helpText += this.getHelp("resume", "Continue checking files");
                helpText += this.getHelp("resume -u", "Continue checking files and upload all the changed files while paused.");
                helpText += this.getHelp("help", "Displays this text");
                helpText += this.getHelp("clear", "Clears the screen");
                helpText += this.getHelp("exit", "Exits the script");
                this.write(helpText);
                break;
            case "clear":
                this.workspace();
                break;
            case "exit":
                process.exit(EXIT_CODE.NORMAL);
                break;
            case "pause":
                this.paused = true;
                this.pauseEvents.map(function (ev) {
                    ev(_this.paused);
                });
                this.workspace();
                break;
            case "resume":
                if (this.paused) {
                    if (arg1 != "-u") {
                        this.lastRun = +(new Date());
                        this.timeDiff = 0;
                    }
                    this.paused = false;
                    this.workspace();
                    if (arg1 == "-u") {
                        this.write("Finding all changed files while waiting.\n");
                    }
                    this.pauseEvents.map(function (ev) {
                        ev(_this.paused);
                    });
                }
                else {
                    this.write("Already running\n");
                }
                break;
            case "": break;
            default:
                this.write(chalk.red("Unknown command: " + cmd + "\nType \"help\" to see commands"));
        }
    };
    return CLI;
}());
exports.default = CLI;
