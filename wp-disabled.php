<?php
error_reporting(E_ALL);
$disabled_functions = ini_get('disable_functions');
if ($disabled_functions != '') {
  $arr = explode(',', $disabled_functions);
  sort($arr);
  echo 'Disabled Functions:<hr/>';
  for ($i = 1; $i < count($arr); $i++) {
    echo $i . ' - ' . $arr[$i] . '<br>';
  }
} else {
  echo 'No functions disabled';
}
