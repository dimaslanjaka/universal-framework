const gulp = require('gulp');
const ts = require('gulp-typescript');
const rename = require('gulp-rename');
const fs = require('fs');
const config = require('./config.json');
const upath = require('upath');
const path = require('path');
const framework = require('./libs/compiler/index');
const log = require('./libs/compiler/log');
const process = require('./libs/compiler/process');
console.clear();

/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task('build', function () {
  return createApp(false);
});

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
      const trigger = function () {
        file = framework.normalize(path.resolve(file));
        /**
         * Check is library compiler or source compiler
         */
        const is_Lib = /libs\/(js|src)\//s.test(framework.normalize(file));
        const filename_log = framework.filelog(file);

        if (is_Lib) {
          log.log(
            log
              .chalk()
              .yellow(`start compile ${log.random('src/MVC/themes/assets/js')}`)
          );
          return process.doProcess('builder' + file, function () {
            createApp(true);
          });
        } else {
          if (/\.(js|scss|css)$/s.test(file)) {
            if (!/\.min\.(js|css)$/s.test(file)) {
              minify(file);
            }
          } else {
            var reason = log.error(undefined);
            if (/\.(php|log|txt|htaccess)$/s.test(filename_log)) {
              reason = log.random('excluded');
            }
            log.log(`[${reason}] cannot modify ${log.random(filename_log)}`);
          }
        }
      };
      return trigger();
    });
});

gulp.task('composer', function () {
  const core = require('./libs/compiler/core');
  const log = framework.log;
  return framework.async(function () {
    var today = new Date().toLocaleDateString();
    var yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toLocaleDateString();
    if (
      !framework.localStorage().getItem('composer') ||
      framework.localStorage().getItem('composer') == yesterday
    ) {
      framework.composer(framework.root(), 'update');
      framework.localStorage().setItem('composer', today);
    } else {
      today = new Date(today);
      yesterday = new Date(framework.localStorage().getItem('composer'));
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
  const log = framework.log;
  fs.exists(item, function (exists) {
    if (exists) {
      var config = '/src/MVC/config/' + item.replace(framework.root(), '');
      config = framework.normalize(framework.root() + config);
      config = config.replace(/\.(js|css)/s, '.json');
      if (fs.existsSync(config)) {
        config = require(config);
      }
      if (item.endsWith('.scss') && !item.endsWith('.min.scss')) {
        framework.scss(item);
      } else if (item.endsWith('.css') && !item.endsWith('.min.css')) {
        framework.minCSS(item);
      } else if (item.endsWith('.js') && !item.endsWith('.min.js')) {
        if (!item.endsWith('.babel.js')) {
          framework.minJS(item);
          var deleteObfuscated = false;
          if (typeof config == 'object') {
            if (config.hasOwnProperty('obfuscate')) {
              if (config.obfuscate) {
                framework.obfuscate(item);
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
            framework.unlink(obfuscatedjs);
            framework.unlink(obfuscatedminjs);
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
  const log = framework.log;
  var views = framework.readdir(__dirname + `/${config.app.views}`);
  return views
    .filter(function (item) {
      return (
        /\.(js|scss|css|sass|less)$/.test(item) &&
        !/\.min\.(js|css)$/.test(item) &&
        !/\-ori|\-original|\-backup|\.bak/s.test(item)
      );
    })
    .map(function (asset) {
      return framework.normalize(asset);
    });
}

/**
 * minify multiple assets
 * @param {any[]} assets
 */
function multiMinify(assets) {
  assets.map(minify);
}

/**
 * Create App.js
 * @param {boolean} withoutView false to not compile views javascripts
 */
async function createApp(withoutView) {
  var target = upath.normalizeSafe(
    upath.resolve(upath.join(__dirname, 'src/MVC/themes/assets/js/app.js'))
  );
  await typescriptCompiler(__dirname + '/tsconfig.build.json', './');
  await typescriptCompiler(__dirname + '/tsconfig.precompiler.json', './');
  await typescriptCompiler(
    __dirname + '/tsconfig.compiler.json',
    './libs/compiler/'
  );
  minify(target);
  if (!withoutView) {
    multiMinify(views());
  }
}

/**
 * Typescript compiler
 * @param {string} source
 * @param {string} destination
 * @param {function(source,destination)} callback
 */
function typescriptCompiler(source, destination, callback) {
  const instance = ts.createProject(source);
  return new Promise((resolve, reject) => {
    instance
      .src()
      .pipe(instance())
      .pipe(
        rename(function (path) {
          path.extname = '.js';
        })
      )
      .pipe(gulp.dest(destination, { overwrite: true }))
      .on('end', function () {
        log.log(
          `successfully compiled ${log.success(framework.filelog(source))}`
        );
        if (typeof callback == 'function') {
          callback(source, destination);
        }
        return resolve(true);
      });
  });
}
