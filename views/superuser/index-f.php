<?php

if (!user()->is_admin()) {
  redirect('/signin');
}

if (isset($_POST['config'])) {
  unset($_POST['config']);
  array_walk_recursive($_POST, function (&$key, $value) {
    if (preg_match('/^(true|false)$/s', $key, $match)) {
      if ($match[0] == 'true') {
        $key = true;
      } else {
        $key = false;
      }
    }
    if (preg_match('/^(true|false)$/s', $value, $match)) {
      if ($match[0] == 'true') {
        $value = true;
      } else {
        $value = false;
      }
    }
    if (is_numeric($key)) {
      settype($key, 'integer');
    }
    if (is_numeric($value)) {
      settype($value, 'integer');
    }
  });
  save_conf($_POST);
}
