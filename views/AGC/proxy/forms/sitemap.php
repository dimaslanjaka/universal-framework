<?php
header("Content-Type: text/plain");

$a = new gtrans();
$curl = $a->cURL(true);
$f1 = file(__DIR__ . '/../../forms/proxy.txt', FILE_SKIP_EMPTY_LINES);
$f2 = $a->fetch_contents($curl, 'https://wp.webmanajemen.com/receiver/proxy.txt', 'proxy', ['fileExt' => 'txt']);
$f2 = parse_proxy($f2->response);
$f3 = parse_proxy(grab_proxy());
$p = array_merge($f1, $f2, $f3);
$p = array_map('trim', $p);
shuffle($p);

foreach ($p as $key => $value) {
  break;
  if (empty($value)) continue;
  echo WP_ORIGIN . '/AGC/proxy/info?p=' . $value . PHP_EOL;
}
echo WP_ORIGIN . '/AGC/proxy/index' . PHP_EOL;
echo WP_ORIGIN . '/AGC/proxy/checker' . PHP_EOL;
exit;
