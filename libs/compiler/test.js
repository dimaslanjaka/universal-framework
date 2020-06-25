"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = tslib_1.__importDefault(require("./core"));
var process_1 = tslib_1.__importDefault(require("process"));
var read = core_1.default.readdir(process_1.default.cwd(), [], ['.git']);
console.log(read);
