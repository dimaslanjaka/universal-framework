import { parse } from 'jsonplus';
import { readFileSync, existsSync } from 'fs';
import { join as pathJoin } from 'path';

export interface SyncConfig {
  username?: string;
  password?: string;
  port?: number;
  /**
   * Host
   */
  host: string;
  /**
   * Local path
   */
  localPath: string;
  /**
   * Remote path target
   */
  remotePath: string;
  /**
   * SSH private key
   */
  privateKey?: string;
  ignores?: Array<string | RegExp>;
  pathMode?: string;
}

export enum EXIT_CODE {
  /**
   * Exit normally
   */
  NORMAL = 0,

  /**
   * Any kind exit with error
   */
  RUNTIME_FAILURE = 1,

  /**
   * If user terminates with ctrl-c use this
   */
  TERMINATED = 130,

  /**
   * Tell user that arguments were wrong
   */
  INVALID_ARGUMENT = 128,
}

export const CONFIG_FILE_NAME = 'sync-config.json';

export default class Config implements SyncConfig {
  username?: string;
  password?: string;
  port?: number;
  host: string;
  localPath: string;
  remotePath: string;
  privateKey?: string;
  ignores?: (string | RegExp)[];
  pathMode?: string;
  private _filename: string;
  private _config: SyncConfig;

  constructor() {
    this._filename = pathJoin(process.cwd(), CONFIG_FILE_NAME);
  }

  ready(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this._fetch();
      this._expand();

      // Temporary
      if (!this.password) {
        reject('Password required');
        throw 'Password required';
        //resolve();
      } else {
        resolve();
      }
    });
  }

  private _fetch() {
    if (existsSync(this._filename)) {
      let configraw;
      if ((configraw = readFileSync(this._filename))) {
        try {
          this._config = parse(configraw.toString());
        } catch (e) {
          console.log(
            'Could not parse DB file. Make sure JSON is correct',
            EXIT_CODE.RUNTIME_FAILURE
          );
        }
      } else {
        console.log(
          'Cannot read config file. Make sure you have permissions',
          EXIT_CODE.INVALID_ARGUMENT
        );
      }
    } else {
      console.log('Config file not found', EXIT_CODE.INVALID_ARGUMENT);
    }
  }

  /**
   * @TODO add checks on required values
   */
  private _expand() {
    [
      'host',
      'port',
      'username',
      'password',
      'pathMode',
      'localPath',
      'remotePath',
      'ignores',
      'privateKey',
    ].forEach((prop) => {
      this[prop] = this._config[prop] || this[prop];
    });
  }
}
