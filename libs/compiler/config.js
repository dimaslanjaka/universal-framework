"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = tslib_1.__importDefault(require("./core"));
var config = require(`${core_1.default.root()}/config.json`);
exports.default = config;
