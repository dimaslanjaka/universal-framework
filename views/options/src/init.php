<?php
if (!isset($core)) {
  $core = new dimas(['redirect_uri' => '/options/callback', 'router' => '/options/callback']);
}
if (!isAdmin()) {
  exit('Disallowed access');
}

function backUP()
{
  $all_options = wp_load_alloptions();
  _file_(__DIR__ . '/options.json', $all_options, true);
}
