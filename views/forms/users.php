<?php

if (isset($_POST['register'])) {
  $registered = (email_exists($_r['email']) && username_exists($_r['username']));
  if (!$registered) {
    //wp_create_user($_r['username'], $_r['password'], $_r['email']);
    $user_id = wp_insert_user(
  [
    'user_login' => $_r['email'],
    'user_pass' => $_r['password'],
    'first_name' => $_r['first_name'],
    'last_name' => $_r['last_name'],
    'user_email' => $_r['email'],
    'display_name' => $_r['first_name'] . ' ' . $_r['last_name'],
    'nickname' => $_r['first_name'] . ' ' . $_r['last_name'],
    'role' => (isset($_r['role']) ? $_r['role'] : 'client'),
  ]
  );
    save_extra_user_profile_fields($user_id);
    $o['success'] = 'User Created Successfully';
  } else {
    $o['error'] = 'User Already Registered';
  }
  $core->dump($o);
}

if (isset($_POST['login'])) {
  $login_data['user_login'] = $_POST['email'];
  $login_data['user_password'] = $_POST['password'];
  $user_verify = wp_signon($login_data, false);
  if (is_wp_error($user_verify)) {
    $output['error'] = (is_array($user_verify->get_error_message()) ? json_encode($user_verify->get_error_message()) : $user_verify->get_error_message());
  } else {
    $_SESSION['wp-user'] = $user_verify;
    $output['success'] = 'Login Sucessfully.';
    $output['redirect'] = '/dashboard?set-company=' . get_user_meta($user_verify->data->ID, 'perusahaan', true);
  }
  $core->dump($output);
}
