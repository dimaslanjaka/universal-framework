<?php
if (!isset($router_dump)) {
  $router_dump = [];
}
$data = [
  'site_default' => get_option('site_default'),
  'site_source_replacement' => preg_replace('#/+#', '/', str_replace(get_option('site_default'), '', '/warkop/penjualan')),
  'class' => router::i(),
  'troot' => $troot,
  'root_view' => $root_view,
  'request' => $request,
  'subrequest' => $subrequest,
  'squence' => $squence,
  'form' => [$form_, (is_string($form_) && file_exists($form_))],
  'theme_header' => $theme_header,
  'theme_footer' => $theme_footer,
  'theme_content' => $theme_content,
  'content' => $content,
  'style' => $style,
  'script' => $script,
  'router_dump' => $router_dump
];
if (isreq('json')) {
  $core->dump($data);
} else {
  $core->vardump($data);
}
