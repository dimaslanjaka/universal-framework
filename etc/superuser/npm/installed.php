<?php
if (!user()->is_admin()) {
  safe_redirect('/');
}

\JSON\json::headerJSON();


$list = shell('npm list --depth=0 --json');
$list = json_decode($list, true);
//$list = str_replace(['+-- ', '`-- '], '', $list);

foreach ($list['dependencies'] as $key => $value) {
  $value['name'] = $key;
  $value['folder'] = normalize_path(realpath(ROOT . '/node_modules/' . $key));
  $list['dependencies'][$key] = $value;
}

e(array_values($list['dependencies']));
