const config = require('./config.json');
const fs = require('fs');

var parsed = JSON.stringify(parseConfig(config, true), null, 2);

fs.writeFileSync('./config-backup.json', parsed);
var str = fs
  .readFileSync('./libs/src/compiler/config.ts', {
    encoding: 'utf-8',
  })
  .replace(/\s|\t/gm, ' ');

parsed = JSON.stringify(parseConfig(config, false), null, 2)
  .replace(/\"string\"/gm, 'string')
  .replace(/\"boolean\"/gm, 'boolean')
  .replace(/\"number\"/gm, 'number');

var regex = /config\:((.|\n)*)\=\srequire/gm;
var mod = str.replace(regex, `config:${parsed} = require`);
fs.writeFileSync('./libs/src/compiler/config.ts', mod);

function parseConfig(config, usingExclude) {
  const excluded = function (key) {
    return ['vscode'].indexOf(key) == -1;
  };
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      if (!excluded(key) && usingExclude) {
        continue;
      }
      const element = config[key];
      const type = typeof element;
      if (['number', 'string', 'boolean'].indexOf(type) != -1) {
        config[key] = type;
      } else if (type == 'object') {
        config[key] = parseConfig(config[key]);
      } else if (Array.isArray(config[key])) {
        config[key].forEach(parseConfig);
      }
    }
  }
  return config;
}
