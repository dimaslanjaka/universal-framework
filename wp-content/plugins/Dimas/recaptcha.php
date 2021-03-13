<?php

/*
* These Functions Add and Verify the Invisible Google reCAPTCHA on Login
*/

add_action('login_enqueue_scripts', 'login_recaptcha_script');

function login_recaptcha_script()
{
  wp_register_script('recaptcha_login', 'https://www.google.com/recaptcha/api.js');

  wp_enqueue_script('recaptcha_login');
}

add_action('login_form', 're_register_form');

function re_register_form()
{
  wp_enqueue_script(
    'recaptchaV3',
    plugin_dir_url(__FILE__) . 'assets/recaptcha.js',
    ['jquery'],
    1,
    true
  );
}
/**
 * Call __DIR__ . '/assets/recaptcha.js'
 * @param bool $notag script html tags
 */
function short_recaptcha($notag = false)
{
  if (!$notag) {
    echo '<script>' . file_get_contents(__DIR__ . '/assets/recaptcha.js') . '</script>';
  } else {
    include __DIR__ . '/assets/recaptcha.js';
  }
}
add_shortcode('recaptcha', 'short_recaptcha');

add_filter('wp_authenticate_user', 'verify_recaptchav3', 10, 2);

function verify_recaptchav3($user = false, $password = false)
{
  if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['g-recaptcha-response'])) {
    $response = wp_remote_get('https://www.google.com/recaptcha/api/siteverify?secret=6LdSg5gUAAAAAL7aiyHjXKArlkF0R7HAlA99oMYG&response=' . $_POST['g-recaptcha-response']);

    $response = json_decode($response['body'], true);

    if (isset($response['success']) && true == $response['success']) {
      if ($user) {
        return $user;
      } else {
        return true;
      }
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
