<?php
user()->login_required('/user/login');

if (!isset($_COOKIE['check_brands'])) {
  if (!pdo()->check_table("brands")) {
    pdo()->query("CREATE TABLE `brands` (
      `brand_id` int(11) NOT NULL AUTO_INCREMENT,
      `brand_name` varchar(255) NOT NULL,
      `brand_active` int(11) NOT NULL DEFAULT 0,
      `brand_status` int(11) NOT NULL DEFAULT 0,
      PRIMARY KEY (`brand_id`)
     ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1
     ");
  }
  Cookie\helper::set("check_brands", "true", "1d");
}
