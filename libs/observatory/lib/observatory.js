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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JzZXJ2YXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2JzZXJ2YXRvcnkvbGliL29ic2VydmF0b3J5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN2QyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFMUIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXZDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzQixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFckMsZUFBZTtBQUNmLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUVwQjs7O0dBR0c7QUFDSCxTQUFTLFVBQVUsQ0FBQyxXQUFXO0lBQzdCOzs7Ozs7Ozs7Ozs7Ozs7OztPQWlCRztJQUNILElBQUksSUFBSSxHQUFHO1FBQ1QsV0FBVyxFQUFFLFdBQVc7UUFDeEIsV0FBVyxFQUFFLEVBQUU7UUFDZixZQUFZLEVBQUUsRUFBRTtRQUNoQixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNO1FBQzdCLElBQUksRUFBRSxXQUFXO1FBQ2pCLE9BQU8sRUFBRSxDQUFDO0tBQ1gsQ0FBQztJQUVGLFNBQVMsTUFBTTtRQUNiLElBQUksV0FBVyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVFLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQ3RCLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLFdB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