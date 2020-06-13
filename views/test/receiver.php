<?php

$result['method'] = $_SERVER['REQUEST_METHOD'];
$result['get'] = $_GET;
$result['post'] = $_POST;
$result['message'] = 'form successfully submitted';
if (isset($_REQUEST['error'])) {
  $result['error'] = true;
}
if (isset($_REQUEST['title'])) {
  $result['title'] = 'title response';
}
\JSON\json::json($result);
