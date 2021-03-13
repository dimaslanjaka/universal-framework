<?php
$recaptcha_opt = get_option('plugin_recaptcha');
if (!$recaptcha_opt) {
  $recaptcha_opt = array(
    'pubkey'  => '',
    'privkey'   => '',
  );
}
$slug = plugin_basename(__DIR__);
define('WMI_slug', $slug);
$plugin_path = $slug; //plugin_basename(__DIR__ . '/post_webhook.php');
$submenu_path = rtrim($plugin_path, '.php');
$menu_path = $submenu_path;
$recaptcha_path = "$submenu_path/_reCaptcha";
$recaptcha_admin_hook = $_SERVER['PHP_SELF'] . '?page=' . $recaptcha_path; //plugin_basename(__FILE__);
$password_path = "$submenu_path/_Password";
$password_admin_hook = $_SERVER['PHP_SELF'] . '?page=' . $password_path;
$info_path = "$submenu_path/_Info";
$info_admin_hook = $_SERVER['PHP_SELF'] . '?page=' . $info_path;
$privatekey = $recaptcha_opt['privkey'];
$publickey = $recaptcha_opt['pubkey'];
$recaptcha_public_hook = WMI_plugin_url() . basename($plugin_path);
