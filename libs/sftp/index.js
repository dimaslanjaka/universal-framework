const connection = require('./connect');

connection.client().on('ready', function() {
  let listSent = false;
  let names = [];

  connection.client().sftp(function(err, sftp) {
    console.log(sftp);
    connection.client().end();
  });
}).connect(connection.conf());