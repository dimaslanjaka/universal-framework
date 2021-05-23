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
        var con_1 = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: database.pass,
            port: Number(database.port),
            database: database.dbname,
        });
        con_1.connect(function (err) {
            if (err) {
                log_1.default.log(log_1.default.error(err));
            }
            else {
                log_1.default.log(log_1.default.success("Connected!"));
                result = con_1;
            }
        });
    }
    return result;
}
//export = mysql_connection;
//export default mysql_connection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9teXNxbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBd0I7QUFDeEIsbURBQStCO0FBQy9CLG1DQUFrQztBQUVsQyxTQUFTLGdCQUFnQjtJQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbEIsSUFBSSxlQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25DLElBQU0sUUFBUSxHQUFHLGVBQU0sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBTSxLQUFHLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQy9CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDbkIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztZQUMzQixRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU07U0FDNUIsQ0FBQyxDQUFDO1FBQ0gsS0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQVE7WUFDMUIsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0I7aUJBQU07Z0JBQ0gsYUFBRyxDQUFDLEdBQUcsQ0FBQyxhQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sR0FBRyxLQUFHLENBQUM7YUFDaEI7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUVELDRCQUE0QjtBQUM1QixrQ0FBa0MifQ==