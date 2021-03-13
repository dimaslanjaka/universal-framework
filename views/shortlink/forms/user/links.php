<?php

$uid = get_current_user_id();
$lists = $wpdb->get_results("SELECT * FROM short_url WHERE userid = '$uid'");
if (!$lists) {
  if (user_can($uid, 'administrator')) {
    wpdb_utility::i()->err($wpdb);
  } else {
    exit(null);
  }
}
