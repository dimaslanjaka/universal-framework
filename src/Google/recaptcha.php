<?php

namespace Google;

use Crypto\crypt;
use Extender\request;
use JSON\json;

class recaptcha
{
  public $secret = '6LeLW-MUAAAAADaHQWVpUV5CqjNymO0cu_gbL0vv';
  public $siteKey = '6LeLW-MUAAAAALgiXAKP0zo2oslXXbCy57CjFcie';
  public static $secretKey;

  public function set_secret($key)
  {
    $this->secret = $key;
  }

  public static function setSecret($key)
  {
    $this->set_secret($key);
  }

  public static function verifyCaptcha($callback = null, $error = null)
  {
    $opt['url'] = 'https://www.google.com/recaptcha/api/siteverify?secret=' . $this->secret . '&response=' . $_REQUEST['g-recaptcha-response'];
    $req = request::static_request($opt);

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
}
