const config_construct = {
  /**
   * Hostname SFTP
   */
  host: "string",
  /**
   * Password SFTP
   */
  password: "string",
  /**
   * Username SFTP
   */
  username: "string",
  /**
   * Port SFTP default 22
   */
  port: 22,
  /**
   * Remote ROOT for current SFTP
   */
  remotePath: "/root",
  /**
   * Regex ignore pattern
   * @example ["\/node_modules\/","\/vendor\/","\/.git\/"]
   * @type {string[]}
   */
  ignore: []
}
/**
 * @type {config_construct}
 */
var config = require('../../.vscode/sftp.json');

module.exports = config;