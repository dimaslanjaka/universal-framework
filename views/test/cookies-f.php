<?php

if (isset($_REQUEST['get'])) {
  $get = $_REQUEST['get'];
  if (!empty($get) && isset($_COOKIE[$get])) {
    echo \Cookie\helper::get($get, false);
  } else {
    \JSON\json::json($_COOKIE);
  }
  exit;
} else if (isset($_REQUEST['set'])) {
  $set = $_REQUEST['set'];
}

\Cookie\helper::set('test', 'test from php', '10m');
