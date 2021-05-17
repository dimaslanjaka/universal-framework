"use strict";

import position from "ansi-escapes";
import _ from "lodash";

import constants from "./constants";

import out from "./out";
import settings from "./settings";

// global state
var currentLine = 1;

/**
 * Create Task
 * @param description
 */
function createTask(description: string) {
  var task: {
    description?: string;
    statusLabel?: string;
    detailsLabel?: string;
    state?: string;
    line?: number;
    longest?: number;
    render?: Function;
    update?: Function;
    setStatusLabel?: Function;
    setState?: Function;
    details?: (arg0: string) => any;
    status?: (arg0: string) => any;
    done?: (arg0: string) => any;
    fail?: (arg0: string) => any;
  } = {
    description: description,
    statusLabel: "",
    detailsLabel: "",
    state: constants.state.active,
    line: currentLine,
    longest: 0,
  };

  function render() {
    var statusLabel = " " + settings.formatStatus(task.statusLabel, task.state);
    var margin = out.padding(
      settings.width() - out.ln(task.description) - out.ln(statusLabel)
    );
    var output =
      settings.prefix() +
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

export = {
  add: add,
  STATE: constants.state,
  settings: function (options: any) {
    settings.setSettings(options);
    return module.exports;
  },
};
