import log from "./log";
import * as mysql from "mysql";
import { config } from "./config";

function mysql_connection(): null | mysql.Connection {
    let result = null;
    if (config.hasOwnProperty("database")) {
        const database = config.database;
        const con = mysql.createConnection({
            host: database.host,
            user: database.user,
            password: database.pass,
            port: Number(database.port),
            database: database.dbname,
        });
        con.connect(function (err: any) {
            if (err) {
                log.log(log.error(err));
            } else {
                log.log(log.success("Connected!"));
                result = con;
            }
        });
    }
    return result;
}

//export = mysql_connection;
//export default mysql_connection;
