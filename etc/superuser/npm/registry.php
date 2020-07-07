<?php

//curl -H "Accept: application/vnd.npm.install-v1+json" https://registry.npmjs.org/npm
//https://registry.npmjs.org/toastr

disable_buffering();
disable_abort(false);
set_limit(0);
header('Content-Type: text/plain', true);


$curl = new \Extender\request('https://registry.npmjs.org');
$curl->setHeader('Accept', 'application/vnd.npm.install-v1+json');
$curl->cache = true;

$location = ROOT . '/package.json';
$package = \Filemanager\file::get($location, true);
$packages = [];
if (isset($package['dependencies'])) {
  $packages = array_merge($package['dependencies'], $packages);
}
if (isset($package['devDependencies'])) {
  $packages = array_merge($package['devDependencies'], $packages);
}
$packages = array_map(function ($pkg) {
  //var_dump($pkg);
  if (false === strpos($pkg, '@types/')) {
    return $pkg;
  } else {
    return null;
  }
}, array_keys($packages));
$packages = array_values(array_filter($packages));
$packages = array_map(function ($pkg) {
  return "@types/$pkg";
}, $packages);

if (isset($package['devDependencies'])) {
  array_map(function ($types) {
    $package['devDependencies'][$types] = '*';
  }, $packages);
}

\Filemanager\file::file($location, $package, true);

$cmd = function ($pkg) {
  return 'cd ' . ROOT . ' && echo "Installing ' . $pkg . ' On %cd%" && ';
};

$dev = json_decode(shell('npm list -json --depth=0 -dev -parseable'), true);
$prod = json_decode(shell('npm list -json --depth=0 -prod -parseable'), true);

foreach ($dev as $key => $value) {
  if (isset($prod[$key]) && is_array($dev[$key])) {
    $dev[$key] = array_merge($dev[$key], $prod[$key]);
  }
}

$list = array_merge($prod, $dev);

$result = $list;

if (!isset($_REQUEST['single'])) {
  for ($i = 0; $i < count($packages); ++$i) {
    if (is_aborted()) {
      break;
    }

    if ($i == count($packages) - 1) {
      if (isset($_REQUEST['install'])) {
        $result[] = shell($cmd('dedupe') . ' npm dedupe && npm install --prefer-offline');
      }
      e($result);
    } else {
      $exec = $curl->execute('get', "/{$packages[$i]}");

      if ($exec) {
        $response = $exec;
        if (isset($response['name']) && strpos($response['name'], '@types') !== false) {
          //$result[] = shell($cmd('dedupe') . ' npm dedupe && npm install --prefer-offline');
          if (isset($_REQUEST['install'])) {
            $result[] = shell($cmd($packages[$i]) . 'npm install ' . $packages[$i] . ' --save-dev --prefer-offline');
          } else {
            $result['types'][$packages[$i]] = '*';
          }
        } else {
          var_dump($response);
        }
      } else {
        var_dump($exec);
      }
    }
  }
}
