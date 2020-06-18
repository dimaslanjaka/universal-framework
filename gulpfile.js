const gulp = require("gulp");
const ts = require("gulp-typescript");
const rename = require("gulp-rename");
const core = require('./libs/compiler/core');
const process = require('process');
const fs = require('fs');
const config = require('./config.json');
const argv = require('yargs').argv;
const spawn = require('child_process').spawn;

/**
 * Build to /src/MVC/themes/assets/js/app.js
 * Minify Views Assets
 */
gulp.task('build', function () {
  var tsProject = ts.createProject(__dirname + "/tsconfig.build.json");
  var processTSC = tsProject.src()
    .pipe(tsProject())
    .pipe(rename(function (path) {
      path.extname = ".js";
    }))
    .pipe(gulp.dest("./"));
  processTSC.on("end", function () {
    minify(core.normalize(process.cwd() + '/src/MVC/themes/assets/js/app.js'));
    multiMinify(views());
  });
  return processTSC;
});

// watch libs/js/**/*
gulp.task("watch", function () {
  gulp.watch(["./libs/js/**/*", "./views/**/*"], gulp.series('build'));
});

gulp.task('default', gulp.series('build', 'watch'));

/**
 * minify assets
 * @param {string} file
 */
function minify(file) {
  fs.exists(file, function (exists) {
    if (exists) {
      if (file.endsWith('.js') && !file.endsWith('.min.js')) {
        core.minJS(file);
        core.obfuscate(file);
      } else if (file.endsWith('.css') && !file.endsWith('.min.css')) {
        core.minCSS(file);
      } else if (file.endsWith('.scss') && !file.endsWith('.min.scss')) {
        core.scss(file);
      }
    }
  });
}

/**
 * List views folder
 */
function views() {
  var views = core.readdir(__dirname + `/${config.app.views}`);
  return views.filter(function (item) {
    return /\.(js|scss|css|sass|less)$/.test(item) && !/\.min\.(js|css)$/.test(item) && !/\-ori|\-original|\-backup|\.bak/s.test(item);
  }).map(function (asset) {
    return core.normalize(asset);
  });
}

/**
 * minify multiple assets
 * @param {any[]} assets
 */
function multiMinify(assets) {
  assets.map(
    /**
     * mapper
     * @param {string} item
     */
    function (item) {
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
}

