<?php

global $wpdb;
$agc_db_version = '0.0.7';
$table_name = $wpdb->prefix . 'agc';
$charset_collate = $wpdb->get_charset_collate();

if (get_option('agc_db_version') != $agc_db_version) {
  $sql = "CREATE TABLE $table_name (
    `id` mediumint(9) NOT NULL AUTO_INCREMENT,
    `ids` varchar(255) NOT NULL COMMENT 'Hash',
    `author_id` int(255) NOT NULL,
    `title` text DEFAULT NULL COMMENT 'Article title',
    `body` longtext DEFAULT NULL COMMENT 'Article body',
    `sl` varchar(50) NOT NULL COMMENT 'Source language',
    `tl` longtext NOT NULL COMMENT 'Target language',
    `visit` mediumint(11) NOT NULL DEFAULT 0,
    `mp3` mediumint(11) NOT NULL DEFAULT 0,
    `mp4` mediumint(11) NOT NULL DEFAULT 0,
    `google_drive` longtext DEFAULT NULL,
    `base64` longtext DEFAULT NULL,
    `pathname` text DEFAULT NULL,
    `sendto` varchar(255) DEFAULT NULL,
    `created` datetime NOT NULL DEFAULT current_timestamp(),
    `modified` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (id)
  );";

  require_once ABSPATH . 'wp-admin/includes/upgrade.php';
  dbDelta($sql);

  update_option('agc_db_version', $agc_db_version);
}
