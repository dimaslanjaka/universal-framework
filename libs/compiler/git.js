const Git = require("nodegit");
const core = require('./core');
const chalk = require('chalk');
const log = console.log;
const clear = console.clear;
clear();

var cmd = '';

Git.Repository.open(core.root())
  .then(function(repo) {
    repository = repo;
    var status = repo.getStatus();
    //var commits = repo.getMasterCommit();
    status.then(function(statuses) {
      var runmin = false;
      var commitCheck = new Promise((resolve, reject) => {
        statuses.forEach(function(file) {
          var path = file.path();
          var status = statusToText(file);
          if (file.isModified()) {
            if (/\.(js|css|scss)/s.test(path)) {
              runmin = true;
              cmd += `
              git add ${path}
              git commit -m Update ${path}
              `;
            }
          }
        });
      });
      commitCheck.then(function() {
        if (runmin) {
          require('./single');
        }
      });
    });

  });
/*
Git.Repository.open(core.root())
              .then(function(repository) {
                return repository.refreshIndex()
              })
              .then(function(index) {
                return index.addByPath(path)
                  .then(function() {
                    return index.write();
                  })
                  .then(function() {
                    return index.writeTree();
                  });
              })
              .then(function(oid) {
                return repository.createCommit('HEAD', signature, signature, `Update ${path}`, oid, []);
              });;*/


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