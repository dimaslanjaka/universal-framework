<?php

if (!isset($form)) {
  $form = dimas_form::form(OPT());
}

if (isset($_POST['supplier'])) {
  $n = $form->post('supplier');
  $c = preg_replace('/\s+/m', '', $n);
  if (username_exists($c)) {
    $c = $c . date('dmyhis');
  }
  $m = $form->post('email', $c . '@' . $_SERVER['HTTP_HOST']);
  if (email_exists($m)) {
    $m = $c . date('dmyhis') . '@' . $_SERVER['HTTP_HOST'];
  }
  $user_id = wp_insert_user([
    'display_name' => $n,
    'nickname' => $n,
    'user_login' => $n,
    'user_email' => $m,
    'role' => 'supplier',
  ]);
  save_extra_user_profile_fields($user_id);
  $o['success'] = 'User Created Successfully';
  $o['reset'] = true;
  $o['refresh'] = true;
  $core->dump($o);
}
