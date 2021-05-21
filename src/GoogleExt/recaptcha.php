<?php

namespace GoogleExt;

use Extender\request;
use JSON\json;

class recaptcha
{
  public static $secretKey;
  private static $_instance = null;
  public $secret = CONFIG['google']['recaptcha']['key'];
  public $siteKey = CONFIG['google']['recaptcha']['secret'];

  public function verifyCaptchaOld($callback = null, $error = null)
  {
    $opt['url'] = 'https://www.google.com/recaptcha/api/siteverify?secret=' . self::getInstance()->secret . '&response=' . $_REQUEST['g-recaptcha-response'];

    $req = request::static_request($opt);

    exit(var_dump($req));

    if (isset($req['response']['body']['success']) && false !== $req['response']['body']['success']) {
      if ($req['response']['body']['success']) {
        if (is_callable($callback)) {
          return call_user_func($callback);
        }
      }
    } elseif (is_callable($error)) {
      return call_user_func($error);
    } else {
      if (isset($req['response']['body'])) {
        $req = $req['response']['body'];
      }
      json::json($req);
    }
  }

  public static function getInstance()
  {
    if (null === self::$_instance) {
      self::$_instance = new self();
    }

    return self::$_instance;
  }

  /**
   * Verify Recaptcha
   *
   * @param callable $callback
   * @return void
   */
  public function verifyCaptcha($callback)
  {
    if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) {
      $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    if (preg_match('/^192|^127/s', $_SERVER['REMOTE_ADDR'])) {
      //return call_user_func($callback, true);
    }
    if (!isset($_POST['g-recaptcha-response'])) {
      if (ob_get_level()) {
        ob_end_clean();
      }
      \JSON\json::json(['error' => true, 'message' => 'Recaptcha token required']);
      exit;
    }
    // Verify captcha
    $post_data = http_build_query(
      [
        'secret' => $this->secret,
        'response' => $_POST['g-recaptcha-response'],
        'remoteip' => $_SERVER['REMOTE_ADDR'],
      ]
    );
    $opts = [
      'http' => [
        'method' => 'POST',
        'header' => 'Content-type: application/x-www-form-urlencoded',
        'content' => $post_data,
      ],
    ];
    $context = stream_context_create($opts);
    $response = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
    $result = json_decode($response, true);

    if (!$result['success']) {
      $result['error'] = true;
      unset($result['success']);
      $result['message'] = 'Captcha not valid, please reload the page or submit the form again';
      $result['title'] = 'reCaptcha information';
      json::json($result);
      exit;
    } else {
      return call_user_func($callback, true);
    }
  }

  public function set_secret($key)
  {
    $this->secret = $key;
  }

  public function setSecret($key)
  {
    $this->set_secret($key);
  }
}
