import Config from './Config';
import * as upath from 'upath';
import * as fs from 'fs';
import * as process from 'process';
import chokidar from 'chokidar';
import observatory from 'observatory';
import { Client } from 'scp2';
import { readFileSync } from 'fs';
import sftp from './sftp';

export default class sync {
  config: Config;
  task: any;
  client: Client;
  sftp: sftp;

  constructor() {
    this.task = observatory.add('Initializing...');

    // Get config
    this.config = new Config();
    this.task.status('reading config');

    this.config
      .ready()
      .then(() => {
        // Get Command line interface
        //this.cli.write("Connecting");
        //this.cli.startProgress();
        this.task.status('watching files');

        var ori = this.config.localPath;
        var root = process.cwd();
        if (upath.isAbsolute(this.config.localPath)) {
          var mod = upath.normalizeSafe(
            this.config.localPath.replace(root, '')
          );
          if (mod == ori) {
            throw new Error('Cannot find absolute path');
          } else {
            this.config.localPath = '.' + mod;
          }
        }

        this.config.localPath = upath.normalizeSafe(this.config.localPath);
        fs.exists(this.config.localPath, function (es) {
          if (!es) {
            throw new Error('Local path not exists');
          }
        });

        this.sftp = new sftp(this.config);

        return true;
      })
      .then(() => {
        this.task.status('connecting server');

        return this.sftp.connect();
      })
      .then((any) => {
        //console.log(any);
        // this.cli.stopProgress();
        //this.task.done(`Connected ${any}`).details(this.config.host);
        //this.cli.workspace();
        //this.task.done(any);
      });
  }
}
