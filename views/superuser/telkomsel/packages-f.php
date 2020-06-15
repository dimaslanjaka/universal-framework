<?php

use JSON\json;
use MVC\router;

useTsel();
if (user()->is_admin()) {
  if (!isset($_SESSION['login'])) {
    exit(header('Location: /signin'));
  }
  if (isset($_REQUEST['add-pkg'])) {
    if (isset($_REQUEST['id'])) {
      $id = trim($_REQUEST['id']);
      json::json(telkomsel_api()->add_packages($id));
      exit;
    }
  }
  if (isset($_REQUEST['status-pkg'])) {
    $status = isset($_REQUEST['status']) ? 'active' : 'inactive';
    $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : null;
    if ($id) {
      $result = pdo()->query("UPDATE `pkg` SET `status` = '$status' WHERE `pkg`.`code` = '$id'")->execute();
      if (!$result['error']) {
        $result['message'] = "$id changed to `$status` successfully";
      }
    } else {
      $result = [];
    }
    $result['title'] = 'Package Status';
    e($result);
  }

  if (isset($_REQUEST['list'])) {
    e(telkomsel_api()->list_packages());
  }
} else {
  router::safe_redirect('/');
  exit();
}
