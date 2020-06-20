"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.clear();
const core_1 = require("./core");
const log_1 = require("./log");
const mysql_1 = require("mysql");
var config = require(`${core_1.default.root()}/config.json`);
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
