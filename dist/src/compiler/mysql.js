"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var log_1 = tslib_1.__importDefault(require("./log"));
var mysql = tslib_1.__importStar(require("mysql"));
var config_1 = require("./config");
function mysql_connection() {
    var result = null;
    if (config_1.config.hasOwnProperty("database")) {
        var database = config_1.config.database;
        var con = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: database.pass,
            port: Number(database.port),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9teXNxbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBd0I7QUFDeEIsbURBQStCO0FBQy9CLG1DQUFrQztBQUVsQyxTQUFTLGdCQUFnQjtJQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbEIsSUFBSSxlQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3JDLElBQU0sUUFBUSxHQUFHLGVBQU0sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU07U0FDMUIsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQVE7WUFDNUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sR0FBRyxHQUFHLENBQUM7YUFDZDtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsNEJBQTRCO0FBQzVCLGtDQUFrQyJ9