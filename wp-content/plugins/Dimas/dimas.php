<?php

/**
 * Plugin Name: Dimas Lanjaka Plugins
 * Plugin URI: https://web-manajemen.blogspot.com
 * Description: Advanced Plugin
 * Version: 1.0
 * Author: Dimas Lanjaka
 * Author URI: https://web-manajemen.blogspot.com.
 */

defined('ABSPATH') or die('No script kiddies please!');
if (!defined('_PURL_')) {
  define('_PURL_', plugin_dir_url(__FILE__));
}
if (!defined('_PPATH_')) {
  define('_PPATH_', plugin_dir_path(__FILE__));
}
if (!defined('_PBS_')) {
  define('_PBS_', plugin_basename(__FILE__));
}
if (!defined('_PBSN_')) {
  define('_PBSN_', basename(dirname(__FILE__)));
}
require _PPATH_ . 'src/vendor/autoload.php';
require _PPATH_ . 'src/init.php';
require _PPATH_ . 'session.php';
require _PPATH_ . 'recaptcha.php';
require _PPATH_ . 'cleaner.php';
require _PPATH_ . 'dashboard-widget.php';

//add_action('init', ['dimas', 'session_start'], 1);

$home = parse_url(get_home_url());
$host = $_SERVER['HTTP_HOST'];
if ($home['host'] != $host) {
  if (is_ssl()) {
    $protocol = 'https://';
  } else {
    $protocol = 'http://';
  }
  update_option('siteurl', $protocol . $host);
  update_option('home', $protocol . $host);
}

add_action('wp_meta_tag', function () {
  return;
});

if (!iscookie('update_site')) {
  add_action('init', 'fix_domain');
  cook('update_site', 1, 18750);
}
/**
 * Update site url
 *
 * @return void
 */
function fix_domain()
{
  if (WP_SITEURL != get_option('siteurl')) {
    update_option('siteurl', WP_SITEURL);
  }
  if (WP_HOME != get_option('siteurl')) {
    update_option('home', WP_HOME);
  }
}

// Hook the appropriate WordPress action
add_action('init', 'prevent_wp_login');
/**
 * Disable wordpress login
 *
 * @return void
 */
function prevent_wp_login()
{
  // WP tracks the current page - global the variable to access it
  global $pagenow;
  // Check if a $_GET['action'] is set, and if so, load it into $action variable
  $action = (isset($_GET['action'])) ? $_GET['action'] : '';
  // Check if we're on the login page, and ensure the action is not 'logout'
  if ($pagenow == 'wp-login.php' && (!$action || ($action && !in_array($action, array('logout', 'lostpassword', 'rp', 'resetpass'))))) {
    // Load the home page url
    $page = get_bloginfo('url');
    // Redirect to the home page
    //wp_redirect($page);
    wp_redirect('https://web-manajemen.blogspot.com');
    // Stop execution to prevent the page loading for any reason
    exit();
  }
}

/* disable wp-admin */
add_action('init', 'disable_wp_admin');

function disable_wp_admin()
{
  if (
    is_admin() && !current_user_can('administrator') &&
    !(defined('DOING_AJAX') && DOING_AJAX)
  ) {
    wp_redirect(home_url());
    exit;
  }
}

/**
 * remove admin bar for non publishers
 *
 * @param mixed $content
 * @return void
 */
function HideAdminBar($content)
{
  return (current_user_can('administrator')) ? $content : false;
}
add_filter('show_admin_bar', 'HideAdminBar');

add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar()
{
  if (!current_user_can('administrator') && !is_admin()) {
    show_admin_bar(false);
  }
}

/** jQuery Update */
function replace_core_jquery_version()
{
  wp_deregister_script('jquery-core');
  wp_register_script('jquery-core', 'https://code.jquery.com/jquery-3.1.1.min.js', [], '3.1.1');
  wp_deregister_script('jquery-migrate');
  wp_register_script('jquery-migrate', 'https://code.jquery.com/jquery-migrate-3.0.0.min.js', [], '3.0.0');
}
add_action('wp_enqueue_scripts', 'replace_core_jquery_version');

/* Extra Profile */

add_action('show_user_profile', 'extra_user_profile_fields');
add_action('edit_user_profile', 'extra_user_profile_fields');
//add_shortcode('user_profile', 'extra_user_profile_fields');

function extra_user_profile_fields($user)
{ ?>
  <h3><?php _e('Extra profile information', 'blank'); ?>
  </h3>

  <table class="form-table">
    <tr>
      <th><label for="phone"><?php _e('Number Phone'); ?></label>
      </th>
      <td>
        <input type="text" name="phone" id="phone" value="<?php echo esc_attr(get_the_author_meta('phone', $user->ID)); ?>" class="regular-text" /><br />
        <span class="description"><?php _e('Please enter your phone number.'); ?></span>
      </td>
    </tr>
    <tr>
      <th><label for="address"><?php _e('Address'); ?></label></th>
      <td>
        <input type="text" name="address" id="address" value="<?php echo esc_attr(get_the_author_meta('address', $user->ID)); ?>" class="regular-text" /><br />
        <span class="description"><?php _e('Please enter your address.'); ?></span>
      </td>
    </tr>
    <tr>
      <th><label for="city"><?php _e('City'); ?></label></th>
      <td>
        <input type="text" name="city" id="city" value="<?php echo esc_attr(get_the_author_meta('city', $user->ID)); ?>" class="regular-text" /><br />
        <span class="description"><?php _e('Please enter your city.'); ?></span>
      </td>
    </tr>
    <tr>
      <th><label for="province"><?php _e('Province'); ?></label></th>
      <td>
        <input type="text" name="province" id="province" value="<?php echo esc_attr(get_the_author_meta('province', $user->ID)); ?>" class="regular-text" /><br />
        <span class="description"><?php _e('Please enter your province.'); ?></span>
      </td>
    </tr>
    <tr>
      <th><label for="postalcode"><?php _e('Postal Code'); ?></label></th>
      <td>
        <input type="text" name="postalcode" id="postalcode" value="<?php echo esc_attr(get_the_author_meta('postalcode', $user->ID)); ?>" class="regular-text" /><br />
        <span class="description"><?php _e('Please enter your postal code.'); ?></span>
      </td>
    </tr>
    <tr>
      <th><label for="perusahaan"><?php _e('Perusahaan'); ?></label></th>
      <td>
        <input type="text" name="perusahaan" id="perusahaan" value="<?php echo esc_attr(get_the_author_meta('perusahaan', $user->ID)); ?>" class="regular-text" /><br />
        <span class="description"><?php _e('Please enter your company code.'); ?></span>
      </td>
    </tr>
  </table>
<?php }

add_action('personal_options_update', 'save_extra_user_profile_fields');
add_action('edit_user_profile_update', 'save_extra_user_profile_fields');
//add_shortcode('save_user_profile', 'save_extra_user_profile_fields');

function save_extra_user_profile_fields($user_id)
{
  if (!current_user_can('edit_user', $user_id)) {
    return false;
  }
  update_user_meta($user_id, 'phone', (isset($_POST['phone']) ? $_POST['phone'] : '0'));
  update_user_meta($user_id, 'address', (isset($_POST['address']) ? $_POST['address'] : '-'));
  update_user_meta($user_id, 'city', (isset($_POST['city']) ? $_POST['city'] : '-'));
  update_user_meta($user_id, 'province', (isset($_POST['province']) ? $_POST['province'] : '-'));
  update_user_meta($user_id, 'postalcode', (isset($_POST['postalcode']) ? $_POST['postalcode'] : '-'));
  update_user_meta($user_id, 'perusahaan', (isset($_POST['perusahaan']) ? $_POST['perusahaan'] : '-'));
}

function createFolder($name)
{
  if (!is_dir($name)) {
    $oldmask = umask(0);
    mkdir($name, 0777);
    umask($oldmask);
  } else {
    throw new Exception("$name Already Exists");
  }
}

/**
 * Capture user login and add it as timestamp in user meta data.
 * @param WP_User $user
 */
function user_last_login(WP_User $user)
{
  catchBot();
  $user = get_user_by('login', $user);
  if (isset($user->ID)) {
    update_user_meta($user->ID, 'last_login', time());
    update_user_meta($user->ID, 'login_ip', getUIP());
    update_user_meta($user->ID, 'login_ua', $_SERVER['HTTP_USER_AGENT']);
  } elseif (get_current_user_id()) {
    update_user_meta(get_current_user_id(), 'last_login', time());
    update_user_meta(get_current_user_id(), 'login_ip', getUIP());
    update_user_meta(get_current_user_id(), 'login_ua', $_SERVER['HTTP_USER_AGENT']);
  }
}
add_action('wp_login', 'user_last_login', 10, 2);

function catchBot()
{
  $exit = false;
  if (!isset($_SERVER['HTTP_USER_AGENT'])) {
    $exit = 1;
  } else if (preg_match('/robot|spider|crawler|curl|^$/i', $_SERVER['HTTP_USER_AGENT'])) {
    $exit = 1;
  }
  if ($exit) {
    do_action('wp_logout');
    return exit('a bot');
  }
  return false;
}

/**
 * User metadata [ALL].
 */
function all_metadata()
{
  $r = [];
  $users = get_users(['fields' => ['ID']]);
  foreach ($users as $user_id) {
    $r[] = get_user_meta($user_id->ID);
  }

  return $r;
}
add_shortcode('all_metadata', 'all_metadata');

function all_user_last_login()
{
  $users = all_metadata();
  $R = [];
  for ($i = 0; $i < count($users); ++$i) {
    if (isset($users[$i]['last_login'])) {
      $nickname = $users[$i]['nickname'];
      $last_login = $users[$i]['last_login'];
      $last_ip = $users[$i]['login_ip'];

      if (!$last_login) {
        continue;
      }
      $build = ['nickname' => $nickname[0], 'login' => $last_login[0], 'ip' => $last_ip[0]];
      if (isset($users[$i]['login_ua'])) {
        $build['ua'] = $users[$i]['login_ua'];
      }
      $R[] = $build;
    }
  }

  return CJSON($R);
}




/**
 * Script ip.
 */
function scriptIP()
{
  if (!iscookie('ip') && headers_sent()) {
    echo '<script src="' . plugin_dir_url(__FILE__) . 'assets/ip.js"></script>';
  }
}
add_action('wp_footer', 'scriptIP');
add_action('admin_footer', 'scriptIP');
add_shortcode('script_ip', 'scriptIP');
