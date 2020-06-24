const fs = require('fs');
const upath = require('upath');
const log = require('./libs/compiler/log');
const filemanager = require('./libs/compiler/filemanager');
//shared packages.json
const root_pkg = require('./package.json');
const packages = {};
const axios = require('axios');

Object.assign(packages, root_pkg.dependencies, root_pkg.devDependencies);

var TypesLists = [];
for (const key in packages) {
  if (packages.hasOwnProperty(key)) {
    const version = packages[key];
    if (!key.includes('@types')) {
      TypesLists.push(key);
      TypesLists = shuffle(TypesLists);
    }
  }
}

fetchTypes();
var TypesFound = [];

/**
 * fetch typescript
 * @param {string[]} TypesLists
 */
function fetchTypes() {
  if (TypesLists.length == 0) {
    log.log(log.error('queue empty'));
    if (TypesFound.length) {
      log.log(log.success('get ready to install'));
      const { exec } = require('child_process');
      exec('npmi ' + TypesFound.join(' '));
    }
    return;
  }

  findTypes(TypesLists[0], function (success, package) {
    if (success) {
      TypesFound.push(package);
    }

    log.log(success, package, TypesLists.length);
    TypesLists.shift();
    fetchTypes(TypesLists);
  });
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * find typescript
 * @param {string} package
 * @param {function(boolean,string)} callback callback(success,packagename)
 */
function findTypes(package, callback) {
  var cache = upath.join(__dirname, `tmp/npm/packages/@types/${package}.json`);
  filemanager.mkdir(upath.dirname(cache));

  if (fs.existsSync(cache)) {
    var data = fs.readFileSync(cache);
    var processNow = processPackage(data);
    processNow
      .then(function (success) {
        if (success) {
          return true;
        }
      })
      .catch(function () {
        getPackage(package);
      });
  } else {
    getPackage(package);
  }

  function processPackage(body) {
    try {
      const json = JSON.parse(body);
      console.log(json);
      if (json.hasOwnProperty('name') && json.hasOwnProperty('description')) {
        fs.writeFileSync(cache, body);
        if (typeof callback == 'function') {
          callback(true, '@types/' + package);
          return true;
        }
      }
    } catch (error) {
      getPackage(package);
    }
  }

  function getPackage(package) {
    axios
      .get('https://registry.npmjs.org/@types/' + package, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
          'Content-Type':
            'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
          Accept:
            'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
          Referer: 'https://registry.npmjs.org/',
          Connection: 'keep-alive',
        },
        timeout: 60000,
      })
      .catch(function (error) {
        log.log(log.error(error));
        if (typeof callback == 'function') {
          return callback(false, '@types/' + package);
        }
      })
      .then(function (res) {
        if (res && res.hasOwnProperty('data')) {
          processPackage(res.data);
        }
      });
  }
}
