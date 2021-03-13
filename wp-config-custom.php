<?php

if (!get_option('GRV3K')) {
  update_option('GRV3K', '6LdSg5gUAAAAAKrfCL7OkHCFrS3m09xoWyvFKieF'); //google recaptcha v3 key
}
if (!get_option('GRV3S')) {
  update_option('GRV3S', '6LdSg5gUAAAAAL7aiyHjXKArlkF0R7HAlA99oMYG'); //google recaptcha v3 secret
}
$option['roles'] = $wp_roles;
$option['wpdb'] = $wpdb;
$option['user'] = wp_get_current_user();
$option['google'] = json_decode(file_get_contents(realpath($_SERVER['DOCUMENT_ROOT'] . '/config/google.json')));
$option['callback'] = '/callback';
$option['recaptcha-secret'] = get_option('GRV3S');
$option['recaptcha-key'] = get_option('GRV3K');
$option['root'] = $_SERVER['DOCUMENT_ROOT'];
$option['gkey'] = 'AIzaSyBYr0oEXIBLNXg4otQXfFO5fnomPQsDx4I';
define('CUSTOPT', serialize($option));

return $option;
