"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
//import core from "./core";
const log_1 = require("./log");
const mysql_1 = require("mysql");
const config_1 = require("./config");
var config = config_1.default;
function mysql_connection() {
    var result = null;
    if (config.hasOwnProperty("database")) {
        const database = config.database;
        var con = mysql_1.default.createConnection({
            host: database.host,
            user: database.user,
            password: database.pass,
            port: database.port,
            database: database.dbname,
        });
        con.connect(function (err) {
            if (err) {
                log_1.default.error(err);
            }
            else {
                log_1.default.success("Connected!");
                result = con;
            }
        });
    }
    return result;
}
exports.default = mysql_connection;
