"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.call_user_func_array = exports.call_user_func = exports.sprintf = void 0;
var tslib_1 = require("tslib");
var locutus = tslib_1.__importStar(require("../locutus/src/index"));
exports.sprintf = locutus.php.strings.sprintf;
exports.call_user_func = locutus.php.funchand.call_user_func;
exports.call_user_func_array = locutus.php.funchand.call_user_func_array;
