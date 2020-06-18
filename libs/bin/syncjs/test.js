const chokidar = require('chokidar');
const config = require('./sync-config.json');
const upath = require('upath');
var defaultIgnores = [/node_modules/, /.git/, /.svn/, /bower_components/, /vendor/, /tmp/];
if (!config.hasOwnProperty('ignores')) {
  config.ignores = [];
}
if (upath.isAbsolute(config.localPath)) { config.localPath = '.' + upath.normalizeSafe(config.localPath.replace(__dirname, '')); }
console.log('is ' + upath.isAbsolute(config.localPath));



var watcher = chokidar.watch(config.localPath, {
  ignored: defaultIgnores.concat(config.ignores),
  ignoreInitial: true,
  followSymlinks: true,
  disableGlobbing: false,
  usePolling: false,
  interval: 100,
  binaryInterval: 300,
  alwaysStat: false,
  depth: 99,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  },
  ignorePermissionErrors: false,
  persistent: true
});

const log = console.log.bind(console);

watcher
  .on('addDir', path => log(`Directory ${path} has been added`))
  .on('unlinkDir', path => log(`Directory ${path} has been removed`))
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'))
  .on('raw', (event, path, details) => { // internal
    log('Raw event info:', event, path, details);
  });