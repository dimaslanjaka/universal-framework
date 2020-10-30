<?php

$result = [];

if (isset($_POST['username'])) {
  $username = mysql_real_escape_string($_POST['username'], pdo()->mysqli());

  // check if name is taken already
  $link = pdo()->pdo();
  $stmt = $link->prepare("SELECT username FROM userdata WHERE username = :username");
  $stmt->execute([
    'username' => $username
  ]);
  $user = $stmt->fetch(PDO::FETCH_ASSOC);

  if (isset($user) && !empty($user)) {
    $result['username-taken'] = true;
    $result['message'] = 'Username already taken';
    $result['error'] = true;
  } else {
    $result['username-taken'] = false;
    $result['error'] = false;
  }
}


\JSON\json::json($result);
exit;
