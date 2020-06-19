<?php

if (user()->is_admin()) {
  $api = new Telkomsel\api3();
  $pdo = pdo()->select('pkg')->where(['name' => 'Unknown Package Name'])->row_array();
  foreach (\ArrayHelper\helper::get_rand_arr($pdo, 30) as $x) {
    $api->cek_paket3($x['code'], pdo());
  }
}
