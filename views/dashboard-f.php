<?php

use JSON\json;

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
  if (isset($_REQUEST['id']) && isset($_REQUEST['status'])) {
    if (gettype($_REQUEST['status']) == 'boolean') {
      $status = $_REQUEST['status'] ? 'active' : 'inactive';
    } else if (gettype($_REQUEST['status']) == 'string') {
      $status = $_REQUEST['status'] == 'active' ? 'active' : 'inactive';
    }
    json::json(telkomsel_api()->packages_status(trim($_REQUEST['id']), $status));
    exit;
  }
}
