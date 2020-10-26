<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  header("Content-type: application/json");
  echo json_encode($_SERVER);
  exit;
}
