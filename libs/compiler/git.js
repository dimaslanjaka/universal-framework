const Git = require("nodegit");
const core = require('./core');
const chalk = require('chalk');
const log = console.log;
const clear = console.clear;
const shell = require('child_process');
const fs = require('fs');
clear();

var cmd = `cd ${core.root()}\n`;

Git.Repository.open(core.root())
  .then(function(repo) {
    repository = repo;
    var status = repo.getStatus();
    status.then(function(statuses) {
      var runmin = false;
      statuses.forEach(function(file) {
        var path = file.path();
        var status = statusToText(file);
        cmd += `git add ${path}\ngit commit -m "Update ${path}"\n`;
        if (file.isModified()) {
          if (/\.(js|css|scss)/s.test(path)) {
            runmin = true;
          }
        }
      });
      var target = `${core.root()}/git.sh`;
      cmd += '\n\nrm -- "$0"\n';
      fs.writeFile(target, cmd, function(err) {
        if (!err) {
          log(`writed to ${chalk.green(target)}`);
        }
      });
      if (runmin) {
        require('./single');
      }
    });

  });

/**
 * get status text
 * @param {Git.StatusFile} status
 * @returns {"NEW"|"MODIFIED"|"TYPECHANGE"|"RENAMED"|"IGNORED"}
 */
function statusToText(status) {
  var words = [];
  if (status.isNew()) {
    words.push("NEW");
  }
  if (status.isModified()) {
    words.push("MODIFIED");
  }
  if (status.isTypechange()) {
    words.push("TYPECHANGE");
  }
  if (status.isRenamed()) {
    words.push("RENAMED");
  }
  if (status.isIgnored()) {
    words.push("IGNORED");
  }
  return words.join(" ").trim();
}