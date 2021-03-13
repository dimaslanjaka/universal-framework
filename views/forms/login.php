<?php

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
if (isset($_REQUEST['dimas'])) {
  setcookie('dimas', true);
}
