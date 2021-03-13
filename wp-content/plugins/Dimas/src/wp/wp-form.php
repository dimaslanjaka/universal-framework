<?php

class dimas_form extends dimas_google
{
  private $form;

  public function __construct($o)
  {
    parent::__construct($o);
  }

  public static function form($o)
  {
    return new self($o);
  }

  public function formcheck($method, $captcha = false)
  {
    $m = strtolower($method);
    if ($captcha) {
      $captcha_verify = $this->recaptcha_check();
      if (true !== $captcha_verify) {
        if (!$this->isadmin()) {
          $this->header_redirect('/akuntansi/piutang');
        }
      }
    }
    if ('post' == $m) {
      return 'POST' == $_SERVER['REQUEST_METHOD'];
    } elseif ('get' == $m) {
      return 'GET' == $_SERVER['REQUEST_METHOD'];
    }
  }

  public function recaptcha_check($user = false, $password = false)
  {
    if (isset($_POST['g-recaptcha-response'])) {
      $response = wp_remote_get('https://www.google.com/recaptcha/api/siteverify?secret=6LdSg5gUAAAAAL7aiyHjXKArlkF0R7HAlA99oMYG&response=' . $_POST['g-recaptcha-response']);

      $response = json_decode($response['body'], true);

      if (isset($response['success']) && true == $response['success']) {
        if ($user) {
          return $user;
        } else {
          return true;
        }
      } else {
        return new WP_Error('Captcha Invalid', __('<strong>ERROR</strong>: You are a bot <p style="word-wrap:break-word">' . json_encode($response) . '</p>'));
      }
    } else {
      return new WP_Error('Captcha Invalid', __('<strong>ERROR</strong>: You are a bot. If not then enable JavaScript.'));
    }
  }

  public function postc($str)
  {
    return isset($_POST[$str]);
  }

  public function validate_referer($REDIRECT_TO = false)
  {
    $referer = parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST);
    $host = parse_url(get_site_url(), PHP_URL_HOST);
    if (true === $REDIRECT_TO) {
      $REDIRECT_TO = $_SERVER['HTTP_REFERER'];
    }
    if (substr($referer, 0 - strlen($host)) == $host) {
      return true;
    } elseif (false !== $REDIRECT_TO) {
      $this->header_redirect($REDIRECT_TO);
    }
  }

  public function post($str, $return = false)
  {
    if ($this->formcheck('post')) {
      $post = $_POST[$str];
      if (empty($post) && !is_numeric($post)) {
        if (is_numeric($return)) {
          return (int) $return;
        } elseif (is_string($return) && !is_numeric($return)) {
          $null = ['SQLNULL', 'SQLN', 'SNULL', 'SNUL'];
          if (!in_array($return, $null)) {
            return (string) $return;
          } elseif (in_array($return, $null)) {
            return 'NULL';
          }
        } elseif (is_array($return) || is_object($return)) {
          return $return;
        } elseif (false == $return) {
          $this->dump(['error' => "String $str = $post is Empty"]);
        }
      } else {
        return $post;
      }
    } else {
      $this->dump(['error' => 'Request method isn\'t POST']);
    }
  }
}

class form
{
  public $value;
  public $key;
  public $request;

  public static function i()
  {
    return new self();
  }

  public function post($s)
  {
    if ('POST' !== $_SERVER['REQUEST_METHOD']) {
      return json::h()->err('REQUEST METHOD NOT POST');
    } else {
      $this->request = 'POST';
    }
    if (!isset($_POST[$s])) {
      return json::h()->err("$s is undefined");
    } else {
      $this->value = $_POST[$s];
      $this->key = $s;

      return $this;
    }
  }

  public function notempty()
  {
    $r = $this->dreq();
    $s = $this->key;
    if ($r && $s) {
      if (empty($r[$s])) {
        return json::h()->err([$this->request . " $s is empty"]);
      } else {
        return $this;
      }
    }
  }

  public function dreq()
  {
    $r = $this->request;
    switch ($r) {
      case 'POST':
        return $_POST;
        break;
      case 'GET':
        return $_GET;
        break;

      default:
        return json::h()->err('Request is empty');
        break;
    }
  }
}
