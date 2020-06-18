/**
 * Universal PHPJS Framework
 * @description Automatically minify folder views and compile framework libraries
 * @todo minify javascript, css
 * @todo compile SCSS SASS LESS to css and minifying into min.css version
 * @todo compile babel to js and minifying into min.js version
 * @todo auto rebuild VSCode typehinting syntax for JS
 * @todo manipulate dom PHPDocs for PHP Intelephense VSCode Plugin
 */
const SINGLE = require.main;

const fs = require('fs');
const path = require('path');
const slash = require('slash');
const core = require('./core');
const shell = require('child_process');
const chalk = require('chalk');
const log = console.log;
const clear = console.clear;
const config = require('/dimaslanjaka.github.io/php-yt-api/config.json');
clear();

var views = core.readdir(core.root() + `/${config.app.views}`);
var assets = views.filter(function(item) {
  return /\.(js|scss|css|sass|less)$/.test(item) && !/\.min\.(js|css)$/.test(item) && !/\-ori|\-original|\-backup|\.bak/s.test(item);
}).map(function(asset) {
  return slash(asset);
});

assets.map(
  /**
   * mapper
   * @param {string} item
   */
  function(item) {
    var config = '/src/MVC/config/' + item.replace(core.root(), '');
    config = core.normalize(core.root() + config);
    config = config.replace(/\.(js|css)/s, '.json');
    if (fs.existsSync(config)) {
      config = require(config);
    }
    if (item.endsWith('.scss') && !item.endsWith('.min.scss')) {
      core.scss(item);
    } else if (item.endsWith('.css') && !item.endsWith('.min.css')) {
      core.minCSS(item);
    } else if (item.endsWith('.js') && !item.endsWith('.min.js')) {
      if (!item.endsWith('.babel.js')) {
        core.minJS(item);
        var deleteObfuscated = false;
        if (typeof config == 'object') {
          if (config.hasOwnProperty('obfuscate')) {
            if (config.obfuscate) {
              core.obfuscate(item);
            } else {
              deleteObfuscated = true;
            }
          } else {
            deleteObfuscated = true;
          }
        }
        if (deleteObfuscated) {
          var obfuscatedjs = item.replace(/\.js$/s, '.obfuscated.js');
          var obfuscatedminjs = item.replace(/\.js$/s, '.obfuscated.min.js');
          core.unlink(obfuscatedjs);
          core.unlink(obfuscatedminjs);
        }
      }
    }
  }
);

/**
 * Typescript library builder and minifier
 */
const tsconfig = core.root() + '/tsconfig.build.json';
var ext = core.isWin() ? '.cmd' : '';
var tsc = core.root() + `/node_modules/.bin/tsc${ext} -p ${tsconfig}`;
shell.exec(tsc, function(err, stdout, stderr) {
  if (!err) {
    var tsclog = slash(tsc).replace(core.root(), '');
    log(`${tsclog} ${chalk.green('success')}`);
    core.minJS(core.root() + `/src/MVC/themes/assets/js/app.js`);
  } else {
    log(stdout);
    log(stderr);
  }
});