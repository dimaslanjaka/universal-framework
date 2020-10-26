<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  header("Content-type: application/json");
  echo json_encode($_SERVER, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}
