"use strict";
var tslib_1 = require("tslib");
var ansi_escapes_1 = tslib_1.__importDefault(require("ansi-escapes"));
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var constants_1 = tslib_1.__importDefault(require("./constants"));
var out_1 = tslib_1.__importDefault(require("./out"));
var settings_1 = tslib_1.__importDefault(require("./settings"));
// global state
var currentLine = 1;
/**
 * Create Task
 * @param description
 */
function createTask(description) {
    var task = {
        description: description,
        statusLabel: "",
        detailsLabel: "",
        state: constants_1.default.state.active,
        line: currentLine,
        longest: 0,
    };
    function render() {
        var statusLabel = " " + settings_1.default.formatStatus(task.statusLabel, task.state);
        var margin = out_1.default.padding(settings_1.default.width() - out_1.default.ln(task.description) - out_1.default.ln(statusLabel));
        var output = settings_1.default.prefix() +
            task.description +
            margin +
            statusLabel +
            " " +
            task.detailsLabel;
        var length = out_1.default.ln(output);
        var clear = out_1.default.padding(task.longest - length + 1);
        task.longest = Math.max(length, task.longest);
        return output + clear;
    }
    function update() {
        var output = task.render();
        var change = currentLine - task.line;
        out_1.default.write(ansi_escapes_1.default.cursorUp(change));
        out_1.default.write(output);
        out_1.default.write(ansi_escapes_1.default.cursorDown(change - (out_1.default.height(output) - 1)));
        out_1.default.write(ansi_escapes_1.default.cursorBackward(out_1.default.ln(output)));
        return task;
    }
    function setStatusLabel(statusLabel, defaultValue) {
        task.statusLabel =
            typeof statusLabel === "string" ? statusLabel : defaultValue;
    }
    function setState(state) {
        task.state = state;
    }
    function details(detailsLabel) {
        task.detailsLabel = detailsLabel;
        return task.update();
    }
    function status(status_) {
        task.setStatusLabel(status_, "");
        return task.update();
    }
    function done(status) {
        task.setState(constants_1.default.state.done);
        task.setStatusLabel(status, "✓ Done"); //move to constant
        return task.update();
    }
    function fail(status) {
        task.setState(constants_1.default.state.fail);
        task.setStatusLabel(status, "✗ Failed"); //move to constant
        return task.update();
    }
    lodash_1.default.merge(task, {
        render: render,
        update: update,
        setStatusLabel: setStatusLabel,
        setState: setState,
        details: details,
        status: status,
        done: done,
        fail: fail,
    });
    currentLine = out_1.default.writeln(currentLine, task.render());
    return task;
}
function add(description) {
    return createTask(description);
}
module.exports = {
    add: add,
    STATE: constants_1.default.state,
    settings: function (options) {
        settings_1.default.setSettings(options);
        return module.exports;
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL3NyYy9vYnNlcnZhdG9yeS90cy9vYnNlcnZhdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsc0VBQW9DO0FBQ3BDLDBEQUF1QjtBQUV2QixrRUFBb0M7QUFFcEMsc0RBQXdCO0FBQ3hCLGdFQUFrQztBQUVsQyxlQUFlO0FBQ2YsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXBCOzs7R0FHRztBQUNILFNBQVMsVUFBVSxDQUFDLFdBQW1CO0lBQ3JDLElBQUksSUFBSSxHQWVKO1FBQ0YsV0FBVyxFQUFFLFdBQVc7UUFDeEIsV0FBVyxFQUFFLEVBQUU7UUFDZixZQUFZLEVBQUUsRUFBRTtRQUNoQixLQUFLLEVBQUUsbUJBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTTtRQUM3QixJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQUUsQ0FBQztLQUNYLENBQUM7SUFFRixTQUFTLE1BQU07UUFDYixJQUFJLFdBQVcsR0FBRyxHQUFHLEdBQUcsa0JBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxNQUFNLEdBQUcsYUFBRyxDQUFDLE9BQU8sQ0FDdEIsa0JBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxhQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxhQUFHLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUNsRSxDQUFDO1FBQ0YsSUFBSSxNQUFNLEdBQ1Isa0JBQVEsQ0FBQyxNQUFNLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVc7WUFDaEIsTUFBTTtZQUNOLFdBQVc7WUFDWCxHQUFHO1lBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNwQixJQUFJLE1BQU0sR0FBRyxhQUFHLENBQUMsRUFBRSxDQUFD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