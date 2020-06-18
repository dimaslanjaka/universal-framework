var config = require('./config');
const fs = require('fs');
var tar = require('tar-fs');
var zlib = require('zlib');

const sshconf = {
  host: config.host,
  port: 22,
  username: config.username,
  password: config.password
}
console.clear();

var Client = require('ssh2').Client;

var conn = new Client();

fs.mkdirSync(__dirname + '/tmp', {
  recursive: true
});

class connect {
  static conf() {
    return {
      host: config.host,
      port: 22,
      username: config.username,
      password: config.password
    };
  };
  static client() {
    return conn;
  }
  static list() {
    conn.on('ready', function() {
      conn.sftp(function(err, sftp) {
        if (err) throw err;
        sftp.readdir(config.remotePath, function(err, list) {
          if (err) throw err;
          //console.dir(list);

          fs.writeFile(__dirname + '/tmp/remote.json', JSON.stringify(list, null, 4), {
            encoding: "utf-8"
          }, function(err) {});

          list.forEach(function(entry, index) {
            //console.log(entry.filename, entry.longname, entry.attrs);
            console.log(entry.filename, entry.longname);
          });
          conn.end();
        });
      });
    }).connect(sshconf);
  }

  static transdir(local, remote) {
    conn.on('ready', function() {
      transferDir(conn,
        remote,
        local,
        true, // uses compression with default level of 6
        function(err) {
          if (err) throw err;
          console.log('Done transferring');
          conn.end();
        });
    }).connect(sshconf);
  }

  /**
   * transfer dir trigger
   * @param {ssh2} conn
   * @param {string} remotePath
   * @param {string} localPath
   * @param {*} compression
   * @param {*} cb
   */
  static transferDir(conn, remotePath, localPath, compression, cb) {
    var cmd = 'tar cf - "' + remotePath + '" 2>/dev/null';

    if (typeof compression === 'function')
      cb = compression;
    else if (compression === true)
      compression = 6;

    if (typeof compression === 'number' && compression >= 1 && compression <= 9)
      cmd += ' | gzip -' + compression + 'c 2>/dev/null';
    else
      compression = undefined;

    conn.exec(cmd, function(err, stream) {
      if (err)
        return cb(err);

      var exitErr;

      var tarStream = tar.extract(localPath);
      tarStream.on('finish', function() {
        cb(exitErr);
      });

      stream
        .on('exit', function(code, signal) {
          if (typeof code === 'number' && code !== 0)
            exitErr = new Error('Remote process exited with code ' + code);
          else if (signal)
            exitErr = new Error('Remote process killed with signal ' + signal);
        }).stderr.resume();

      if (compression)
        stream = stream.pipe(zlib.createGunzip());

      stream.pipe(tarStream);
    });
  }
}

module.exports = connect;