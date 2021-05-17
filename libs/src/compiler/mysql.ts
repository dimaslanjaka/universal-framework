import log from "./log";
import * as mysql from "mysql";
import configuration from "./config";

var config = configuration;

function mysql_connection(): null | mysql.Connection {
  var result = null;
  if (config.hasOwnProperty("database")) {
    const database = config.database;
    var con = mysql.createConnection({
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
