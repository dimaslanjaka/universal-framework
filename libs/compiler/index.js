"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
console.clear();
//import core from "./core";
var log_1 = tslib_1.__importDefault(require("./log"));
var mysql = tslib_1.__importStar(require("mysql"));
var config_1 = tslib_1.__importDefault(require("./config"));
var config = config_1.default;
function mysql_connection() {
    var result = null;
    if (config.hasOwnProperty("database")) {
        var database = config.database;
        var con = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: database.pass,
            port: database.port,
            database: database.dbname,
        });
        con.connect(function (err) {
            if (err) {
                log_1.default.log(log_1.default.error(err));
            }
            else {
                log_1.default.log(log_1.default.success("Connected!"));
                result = con;
            }
        });
    }
    return result;
}
//export = mysql_connection;
//export default mysql_connection;
