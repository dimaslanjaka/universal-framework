import * as chokidar from 'chokidar';
import * as upath from 'upath';
import * as chalk from 'chalk';
import * as process from 'process';
import { FSWatcher } from 'fs';
import Uploader from './Uploader';
import Config from './Config';
import CLI from './CLI';
const observatory = require('observatory');

export default class Watcher {
  files: FSWatcher;
  private tasks = {};

  constructor(
    private uploader: Uploader,
    private config: Config,
    private cli: CLI,
    private base: string = config.localPath
  ) {
    let defaultIgnores: Array<string | RegExp> = [
      /node_modules/,
      /.git/,
      /.svn/,
      /bower_components/,
      /vendor/,
      /tmp/,
    ];

    /*setInterval(function () {
            console.log(base);
        }, 5000);*/

    this.files = chokidar.watch(base, {
      ignored: defaultIgnores.concat(this.config.ignores),
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
        pollInterval: 100,
      },
      ignorePermissionErrors: false,
      persistent: true,
    });
    //const log = console.log.bind(console);

    // Attach events
    ['all', 'add', 'change', 'unlink', 'unlinkDir'].forEach((method) => {
      this.files.on(method, this.handler(method));
    });
  }

  ready(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.files.on('ready', resolve);
    });
  }

  eventToWord = {
    add: chalk.green('ADDED'),
    change: chalk.green('CHANGED'),
    unlink: chalk.red('DELETED'),
    unlinkDir: chalk.red('DELETED'),
  };

  private handler(method: string): Function {
    return (...args: string[]) => {
      let path: string,
        event = method;

      // Handle argument difference
      if (method === 'all') {
        path = args[1];
        event = args[0];
      } else {
        path = args[0];
      }
      //console.log(path);

      // If not, continue as ususal
      this[method](...args);
    };
  }

  private all = (event: string, path: string) => {
    if (event in this.eventToWord) {
      this.tasks[path] = observatory.add(
        this.eventToWord[event] + ' ' + path.replace(this.config.localPath, '')
      );
      this.tasks[path].status('Uploading');
    }
  };

  private add = (path: string) => {
    this.uploader
      .uploadFile(path)
      .then((remote) => {
        this.tasks[path].done('Done');
      })
      .catch((err) => {
        this.tasks[path].fail('Fail').details(err.message);
      });
  };

  private change = (path: string) => {
    this.uploader
      .uploadFile(path)
      .then((remote) => {
        //console.log('remote' + remote);
        this.tasks[path].done('Done');
      })
      .catch((err) => {
        this.tasks[path].fail('Fail').details(err.message);
      });
  };

  private unlink = (path: string) => {
    this.uploader
      .unlinkFile(path)
      .then((remote) => {
        this.tasks[path].done('Done');
      })
      .catch((err) => {
        this.tasks[path].fail('Fail').details(`Error deleting file ${err}`);
      });
  };

  private unlinkDir = (path: string) => {
    this.uploader
      .unlinkFolder(path)
      .then((remote) => {
        this.tasks[path].done('Done');
      })
      .catch((err) => {
        this.tasks[path].fail('Fail').details(`Error deleting folder ${err}`);
      });
  };
}
