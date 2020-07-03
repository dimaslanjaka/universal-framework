"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var log_1 = tslib_1.__importDefault(require("./log"));
var mysql = tslib_1.__importStar(require("mysql"));
var config_1 = tslib_1.__importDefault(require("./config"));
var config = config_1.default;
function mysql_connection() {
    var result = null;
    if (config.hasOwnProperty('database')) {
        var database = config.database;
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
                log_1.default.log(log_1.default.success('Connected!'));
                result = con;
            }
        });
    }
    return result;
}
//export = mysql_connection;
//export default mysql_connection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9saWJzL3NyYy9jb21waWxlci9teXNxbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBd0I7QUFDeEIsbURBQStCO0FBQy9CLDREQUFxQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxnQkFBYSxDQUFDO0FBRTNCLFNBQVMsZ0JBQWdCO0lBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDckMsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDL0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1lBQ25CLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtZQUNuQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQzNCLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTTtTQUMxQixDQUFDLENBQUM7UUFDSCxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBUTtZQUM1QixJQUFJLEdBQUcsRUFBRTtnQkFDUCxhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxhQUFHLENBQUMsR0FBRyxDQUFDLGFBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsTUFBTSxHQUFHLEdBQUcsQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCw0QkFBNEI7QUFDNUIsa0NBQWtDIn0=