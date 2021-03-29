<?php

if (isset($_POST['set-blog'])) {
  $blog = trim($_POST['set-blog']);
  $setb['title'] = 'Blogger';
  if (is_url($blog)) {
    $_SESSION['blogger']['url'] = $blog;
    $setb['error'] = false;
    $setb['message'] = 'Blog url set successful';
  } else {
    $setb['error'] = true;
    $setb['message'] = 'Blog url invalid';
  }
  e($setb);
}
