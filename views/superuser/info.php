<?php
//require __DIR__ . '/config.php';
//phpinfo();

if (\MVC\helper::is_windows()) {
  exec('ipconfig -all', $output);
} else {
  exec("ifconfig | grep 'inet ' | grep -v '127.0.0.1' | cut -d: -f2 | awk '{ print $1}'", $output);
}
pre($output);
