"use strict";

import constants from "./constants";
import _ from "lodash";

var settings = constants.defaultSettings;

function setSettings(options?: any) {
  if (!options) {
    return _.merge(constants.defaultSettings, {});
  }

  return _.merge(settings, options);
}

function width() {
  return settings.width;
}

function prefix() {
  return settings.prefix;
}

function write(text) {
  return settings.write(text);
}

function formatStatus(statusLabel, state) {
  return settings.formatStatus(statusLabel, state);
}

settings = setSettings();

export = {
  setSettings: setSettings,
  width: width,
  prefix: prefix,
  write: write,
  formatStatus: formatStatus,
};
