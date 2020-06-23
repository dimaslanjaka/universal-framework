const gulp = require('gulp');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');
const process = require('process');
const fs = require('fs');
const config = require('./config.json');
const upath = require('upath');
const path = require('path');
const core = require('./libs/compiler/core');
const framework = require('./libs/compiler/index');
const log = require('./libs/compiler/log');
const { MD5 } = require('crypto-js');
const filemanager = require('./libs/compiler/filemanager');
console.clear();
filemanager.empty(upath.join(__dirname, 'tmp', 'compiler'), null);

/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task('build', function () {
  return createApp(false);
});

/**
 * Typescript compiler
 * @param {string} source
 * @param {string} destination
 * @param {Function} callback
 * @returns {function(source,destination)} if callback is function
 */
function typescriptCompiler(source, destination, callback) {
  const instance = ts.createProject(source);
  return instance
    .src()
    .pipe(instance())
    .pipe(
      rename(function (path) {
        path.extname = '.js';
      })
    )
    .pipe(gulp.dest(destination, { overwrite: true }))
    .on('end', function () {
      log.log(`successfully compiled ${log.success(core.filelog(source))}`);
      if (typeof callback == 'function') {
        callback(source, destination);
      }
    });
}

/**
 * Create App.js
 * @param {boolean} withoutView false to not compile views javascripts
 */
function createApp(withoutView) {
  return typescriptCompiler(
    __dirname + '/tsconfig.build.json',
    './',
    function () {
      return typescriptCompiler(
        __dirname + '/tsconfig.precompiler.json',
        './',
        function (source, destination) {
          var target = upath.normalizeSafe(
            upath.resolve(
              upath.join(__dirname, 'src/MVC/themes/assets/js/app.js')
            )
          );
          return typescriptCompiler(
            __dirname + '/tsconfig.compiler.json',
            './libs/compiler/',
            function () {
              minify(target);
              if (!withoutView) {
                multiMinify(views());
              }
            }
          );
        }
      );
    }
  );
}

// watch libs/js/**/* and views
gulp.task('watch', function () {
  console.clear();
  log.log(log.random('Listening ./libs and ./' + config.app.views));
  return gulp
    .watch([
      './libs/js/**/*',
      './libs/src/**/*',
      './src/MVC/**/*',
      './' + config.app.views + '/**/*',
    ])
    .on('change', function (file) {
      const lockfile = upath.join(
        __dirname,
        'tmp/compiler',
        MD5(file).toString()
      );
      const lockProcess = function () {
        log.log(log.random('locking process'));
        filemanager.mkfile(lockfile, 'lockfile');
      };
      const releaseLock = function () {
        log.log(log.random('releasing process'));
        filemanager.unlink(lockfile);
      };
      if (fs.existsSync(lockfile)) {
        return null;
      }
      lockProcess();
      const trigger = function () {
        file = core.normalize(path.resolve(file));
        /**
         * Check is library compiler or source compiler
         */
        const is_Lib = /libs\/(js|src)\//s.test(core.normalize(file));
        const filename_log = core.filelog(file);

        if (is_Lib) {
          log.log(
            log
              .chalk()
              .yellow(`start compile ${log.random('src/MVC/themes/assets/js')}`)
          );
          return function () {
            createApp(true).then(function () {
              releaseLock();
            });
          };
        } else {
          if (/\.(js|scss|css)$/s.test(file)) {
            if (!/\.min\.(js|css)$/s.test(file)) {
              minify(file);
            }
          } else {
            var reason = log.error(undefined);
            if (/\.php$/s.test(filename_log)) {
              reason = log.random('excluded');
            }
            log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
          }
        }
        releaseLock();
      };
      return trigger();
    });
});

gulp.task('composer', function () {
  const core = require('./libs/compiler/core');
  const log = core.log;
  return core.async(function () {
    var today = new Date().toLocaleDateString();
    var yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toLocaleDateString();
    if (
      !core.localStorage().getItem('composer') ||
      core.localStorage().getItem('composer') == yesterday
    ) {
      core.composer(core.root(), 'update');
      core.localStorage().setItem('composer', today);
    } else {
      today = new Date(today);
      yesterday = new Date(core.localStorage().getItem('composer'));
      log('Composer already updated at ' + yesterday);
      log('Today ' + today);
      log('Is Older ' + today.getTime() > yesterday.getTime());
    }
  });
});

gulp.task('default', gulp.series('watch'));

/**
 * minify assets
 * @param {string} file
 */
function minify(item) {
  const log = core.log;
  fs.exists(item, function (exists) {
    if (exists) {
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
  });
}

/**
 * List views folder
 */
function views() {
  const log = core.log;
  var views = core.readdir(__dirname + `/${config.app.views}`);
  return views
    .filter(function (item) {
      return (
        /\.(js|scss|css|sass|less)$/.test(item) &&
        !/\.min\.(js|css)$/.test(item) &&
        !/\-ori|\-original|\-backup|\.bak/s.test(item)
      );
    })
    .map(function (asset) {
      return core.normalize(asset);
    });
}

/**
 * minify multiple assets
 * @param {any[]} assets
 */
function multiMinify(assets) {
  assets.map(minify);
}
