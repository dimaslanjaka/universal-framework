<?php
$valid['success'] = ['success' => false, 'error' => true, 'messages' => []];
if (isset($_POST['test'])) {
  if ($_POST['test'] == 'success') {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully';
    $valid['error'] = false;
  } else {
    $valid['error'] = true;
    $valid['success'] = false;
    $valid['messages'] = 'Error/Failed';
  }
  ksort($valid);
  JSON\json::json($valid);
  exit;
}
