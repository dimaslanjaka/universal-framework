"use strict";
var position = require("ansi-escapes");
var _ = require("lodash");
var constants = require("./constants");
var out = require("./out");
var settings = require("./settings");
// global state
var currentLine = 1;
/**
 * Create Task
 * @param {string} description
 */
function createTask(description) {
    /**
     * @type {{
      description: description,
      statusLabel: "",
      detailsLabel: "",
      state: constants.state.active,
      line: currentLine,
      longest: 0,
      render: render,
      update: update,
      setStatusLabel: setStatusLabel,
      setState: setState,
      details: function(string),
      status: function(string),
      done: function(string),
      fail: function(string)
    }}
     */
    var task = {
        description: description,
        statusLabel: "",
        detailsLabel: "",
        state: constants.state.active,
        line: currentLine,
        longest: 0,
    };
    function render() {
        var statusLabel = " " + settings.formatStatus(task.statusLabel, task.state);
        var margin = out.padding(settings.width() - out.ln(task.description) - out.ln(statusLabel));
        var output = settings.prefix() +
            task.description +
            margin +
            statusLabel +
            " " +
            task.detailsLabel;
        var length = out.ln(output);
        var clear = out.padding(task.longest - length + 1);
        task.longest = Math.max(length, task.longest);
        return output + clear;
    }
    function update() {
        var output = task.render();
        var change = currentLine - task.line;
        out.write(position.cursorUp(change));
        out.write(output);
        out.write(position.cursorDown(change - (out.height(output) - 1)));
        out.write(position.cursorBackward(out.ln(output)));
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
        task.setState(constants.state.done);
        task.setStatusLabel(status, "✓ Done"); //move to constant
        return task.update();
    }
    function fail(status) {
        task.setState(constants.state.fail);
        task.setStatusLabel(status, "✗ Failed"); //move to constant
        return task.update();
    }
    _.merge(task, {
        render: render,
        update: update,
        setStatusLabel: setStatusLabel,
        setState: setState,
        details: details,
        status: status,
        done: done,
        fail: fail,
    });
    currentLine = out.writeln(currentLine, task.render());
    return task;
}
function add(description) {
    return createTask(description);
}
module.exports = {
    add: add,
    STATE: constants.state,
};
module.exports.settings = function (options) {
    settings.setSettings(options);
    return module.exports;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9vYnNlcnZhdG9yeS9saWIvb2JzZXJ2YXRvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3ZDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUxQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFdkMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUVyQyxlQUFlO0FBQ2YsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXBCOzs7R0FHRztBQUNILFNBQVMsVUFBVSxDQUFDLFdBQVc7SUFDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsSUFBSSxJQUFJLEdBQUc7UUFDVCxXQUFXLEVBQUUsV0FBVztRQUN4QixXQUFXLEVBQUUsRUFBRTtRQUNmLFlBQVksRUFBRSxFQUFFO1FBQ2hCLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU07UUFDN0IsSUFBSSxFQUFFLFdBQVc7UUFDakIsT0FBTyxFQUFFLENBQUM7S0FDWCxDQUFDO0lBRUYsU0FBUyxNQUFNO1FBQ2IsSUFBSSxXQUFXLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FDdEIsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFF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