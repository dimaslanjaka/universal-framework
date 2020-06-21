"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
console.clear();
//import core from "./core";
var log_1 = require("./log");
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
                log_1.log.error(err);
            }
            else {
                log_1.log.success("Connected!");
                result = con;
            }
        });
    }
    return result;
}
//export = mysql_connection;
//export default mysql_connection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29tcGlsZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBRWhCLDRCQUE0QjtBQUM1Qiw2QkFBMEI7QUFDMUIsbURBQStCO0FBQy9CLDREQUFxQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxnQkFBYSxDQUFDO0FBRTNCLFNBQVMsZ0JBQWdCO0lBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDdkIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTTtTQUMxQixDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBUTtZQUM1QixJQUFJLEdBQUcsRUFBRTtnQkFDUCxTQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLFNBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzFCLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsNEJBQTRCO0FBQzVCLGtDQUFrQyJ9