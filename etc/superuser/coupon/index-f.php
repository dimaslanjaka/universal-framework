<?php

$captcha = new \MVC\captcha();
$captcha->receiver('sname');
$coupon = new \User\coupon();

if (!user()->is_admin()) {
  safe_redirect('/');
}

if (isset($_REQUEST['create'])) {
  $result = [
    'error' => true,
    'message' => 'action required',
    'title' => 'Coupon creator',
  ];
  if (user()->is_admin()) {
    if (isset($_REQUEST['code'])) {
      $code = \MVC\helper::clean_whitespace(\MVC\helper::clean_special_characters($_REQUEST['code']));
      $limit = $_REQUEST['max'];
      settype($limit, 'integer');
      $result = array_replace($result, $coupon->create($code, $limit));
    }
  }
  e($result);
}

if (user()->is_admin()) {
  if (isset($_REQUEST['report'])) {
    e(pdo()->query('SELECT * FROM `coupon_log`')->row_array());
  }

  if (isset($_REQUEST['list'])) {
    include __DIR__ . '/list.php';
    exit;
  }
}
