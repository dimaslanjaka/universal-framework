<?php

/**
 * Plugin Name: WMI (Wordpress Manajemen Indonesia)
 * Plugin URI: http://web-manajemen.blogspot.com
 * Description: Plugin for insert post dynamically
 * Version: 1.0
 * Author: Dimas Lanjaka
 * Author URI: http://web-manajemen.blogspot.com
 */
/*
MIT License (MIT)

Copyright (c) 2019 Dimas Lanjaka

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
if (!function_exists('get_option')) {
  header('HTTP/1.0 403 Forbidden');
  die;  // Silence is golden, direct call is prohibited
}
define('WMI_version', 1.2);
define('WMI_main', plugin_dir_path(__FILE__));

require_once(plugin_dir_path(__FILE__) . 'function.php');
require_once(plugin_dir_path(__FILE__) . 'post_webhook_global.php');
require_once(plugin_dir_path(__FILE__) . 'post_webhook_recaptcha.php');
require_once(plugin_dir_path(__FILE__) . 'post_webhook_receiver.php');
require_once(plugin_dir_path(__FILE__) . 'post_webhook_password.php');
require_once(plugin_dir_path(__FILE__) . 'post_webhook_info.php');
require_once(plugin_dir_path(__FILE__) . 'recaptchalib.php');
require_once(plugin_dir_path(__FILE__) . 'lib/updater.php');

add_action('init', ['WMI_post_inserter', 'session_start'], 1);
$GLOBALS['WMI_post_webhook'] = WMI_post_inserter::get_instance();

if (!($recaptcha_opt['pubkey'] && $recaptcha_opt['privkey']) && !isset($_POST['submit-recaptcha'])) {
  add_action('admin_notices', 'recaptcha_warning');
}

/**
 * Landing WMI
 *
 * @return void
 */
function landingWMI()
{
  include(plugin_dir_path(__FILE__) . 'tos.html');
}

add_action('admin_menu', 'WMI_admin_menu');
/**
 * Admin menu controller
 *
 * @return void
 */
function WMI_admin_menu()
{
  global $menu_path;
  global $recaptcha_path;
  global $password_path;
  global $info_admin_hook;
  add_menu_page('Webhook Post Inserter', 'WMI', 'manage_options', $menu_path, 'landingWMI', 'dashicons-tickets', 6);
  add_submenu_page($menu_path, 'Password Setup', '<i class="fas fa-user-lock"></i> Password', 'manage_options', $password_path, 'WMI_password_page');
  add_submenu_page($menu_path, 'Recaptcha Setup', '<i class="fas fa-key"></i> reCaptcha V3', 'manage_options', $recaptcha_path, 'WMI_reCaptcha');
  add_submenu_page($menu_path, 'WMI WebHook Info', '<i class="fas fa-info-circle"></i> WebHook Info', 'manage_options', $info_admin_hook, 'WMI_webHook_info');
}

add_action('admin_head', 'WMI_stylesheet');
/**
 * Initiate Stylesheet
 *
 * @return void
 */
function WMI_stylesheet()
{
  echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css" integrity="sha256-46qynGAkLSFpVbEBog43gvNhfrOj+BmwXdxFgVK/Kvc=" crossorigin="anonymous" />';
  $screen = get_current_screen();
  if (strpos($screen->id, WMI_slug)) {
    echo '<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">';
    echo '<style>';
    include(plugin_dir_path(__FILE__) . '/css/style.css');
    echo '</style>';
  }
}
