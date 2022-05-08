<?php

use GuzzleHttp\Client;

class wpgoogle extends dimas_google
{
  public $token;
  public $token_file;
  public $callback;
  public $redirect;
  public $auth_code;
  public $user;
  public static $email;
  /**
   * @var \Google_Client $client
   */
  public $client;
  public static $sclient;
  public $scopes;
  public $auth_state;
  public $auth_request;
  public $reset = null;

  public function __construct($conf = ['manual' => false])
  {
    $this->auth_state = isset($_GET['state']) ? trim($_GET['state']) : (isset($_GET['session_state']) ? trim($_GET['session_state']) : false);
    $this->auth_code = isreq('code');
    $this->auth_request = $this->auth_code && $this->auth_state; // && isses('tokenState');
    $this->conf = $conf;
    if (!isset($conf['manual'])) {
      $this->defaultInit($conf);
    }
    parent::__construct($conf);
  }

  function defaultInit($conf = [], $callback = null)
  {
    $this->Google_Client($conf);
    $this->setTokenFile('');
    $this->google_process_token();
  }
  /**
   * Delete default token
   */
  function delToken()
  {
    $g = $this;
    $g->deleteFile($g->defaultToken(false));
    $g->deleteFile(ROOT . '/assets/config/token/' . md5($_SERVER['HTTP_USER_AGENT']) . '.json');
    $g->deleteFile(ROOT . '/assets/config/token/' . iscookie('ip') . '.json');
  }

  function Google_Client($conf = ['scope' => 'default', 'redirect' => null, 'redirect_uri' => null])
  {
    $conf = (array) $conf;
    if (empty($conf)) {
      $conf = ['scope' => 'default'];
    }
    if (!isset($conf['scope'])) {
      $conf['scope'] = 'default';
    }
    $gClient = $this->setCredentials(new Google_Client());
    $scope = $this->google_scopes($conf['scope']);
    $gClient->setScopes($scope);
    $gClient->setApprovalPrompt('force');
    $gClient->setAccessType('offline');
    $gClient->logged_in = false;
    $dr = [];
    if (isset($conf['redirect_uri']) && isURL($conf['redirect_uri'])) {
      $redirect = $conf['redirect_uri'];
      $dr[__LINE__] = $redirect;
    } elseif (isset($conf['redirect']) && isURL($conf['redirect'])) {
      $redirect = $conf['redirect'];
      $dr[__LINE__] = $redirect;
    } elseif (isses('redirect_uri')) {
      $redirect = isses('redirect_uri');
      $dr[__LINE__] = $redirect;
    } else {
      $redirect = GOOGLE_REDIRECT_URL;
      $dr[__LINE__] = $redirect;
    }
    $this->client = $gClient;
    $this->google_redir($redirect);
    return $this->client;
  }

  /**
   * Delete file if exists.
   */
  public function deleteFile($path)
  {
    if (file_exists($path)) {
      unlink($path);
    }
  }

  public function properties()
  {
    return $this->getMethodClass(__CLASS__);
  }

  public function google_redir($redirect)
  {
    $redirect = str_replace([ROOT, '/views'], '', $redirect);
    $redirect = $this->fix_slash($redirect);
    $this->redirect = $redirect;
    $this->client->setRedirectUri($redirect);
    return $this->client;
  }

  public function google_process_token()
  {
    /**
     * @var Google_Client
     */
    $gClient = $this->google_auth();

    if (!$gClient->getAccessToken() || $this->reset) {
      $accessToken = $this->get_token($gClient);
      if (!$accessToken && !$this->auth_request) {
        if (file_exists($this->token_file)) {
          $accessToken = json_decode(file_get_contents($this->token_file));
        }
      }

      if (!empty($accessToken)) {
        $gClient->setAccessToken((array) $accessToken);
      }
    }

    if ($gClient->getAccessToken()) {
      unses('tokenState');
      $gClient->logged_in = true;
      /*
       * if token is expired
       */
      if ($gClient->isAccessTokenExpired()) {
        /**
         * @var mixed $gClient
         */
        $gClient->fetchAccessTokenWithRefreshToken($gClient->getRefreshToken());
        $_SESSION['token'] = $gClient->getAccessToken();
      }
      /*
       * if token is valid
       */
      if (!$gClient->isAccessTokenExpired()) {
        if (!is_user_logged_in() || isreq('re-login') || !iscookie('loginGoogle')) {
          $this->wp_login();
          cook('loginGoogle', 1, 100);
        }
        if (!$this->isSubsribed()) {
          check_subscriber($gClient);
        }
      }
      /*
       * update token when auth request initiated
       */
      if ($this->auth_request) {
        $this->update_token();
      }

      if (isset($_SESSION['token']) && !empty($_SESSION['token']) && !headers_sent()) {
        if (!headers_sent()) {
          setcookie('token', json_encode($_SESSION['token']), time() + 60 * 60 * 24 * 1);
        }
      }

      if (is_user_logged_in() && $this->client->getAccessToken()) {
        $this->fetch_google_user();
        $this->setBlogger();
        $this->token = $this->client->getAccessToken();
        $this->delToken();
      }
    }
  }

  function resetToken()
  {
    $this->token = null;
  }

  public function google_auth()
  {
    $gClient = $this->client;

    if ($this->auth_request) {
      $gClient->authenticate($_GET['code']);
      $gClient->fetchAccessTokenWithAuthCode($_GET['code']);
      if ($gClient->getAccessToken()) {
        $gClient->setAccessToken($gClient->getAccessToken());
        $this->update_token();
        $gClient->logged_in = true;
        $this->token = $gClient->getAccessToken();
      }
      //var_dump($gClient->getAccessToken(), $gClient->authenticate($_GET['code']), $gClient->fetchAccessTokenWithAuthCode($_GET['code']));
      unses('tokenState');
    } else {
      sess('tokenState', md5(date('dmy')));
    }

    return $gClient;
  }

  public function update_token()
  {
    sess('token', $this->client->getAccessToken());
    $tokenstring = base64_encode(json_encode($this->client->getAccessToken()));
    if (is_user_logged_in()) {
      update_user_meta(get_current_user_id(), 'google_token', $tokenstring);
    }
    _file_($this->token_file, json_encode($this->client->getAccessToken()), true);
  }

  public function get_token()
  {
    $accessToken = false;
    if (isses('token') && !$this->auth_request) {
      return isses('token');
    } elseif (is_user_logged_in() && !$this->auth_request) {
      $accessToken = base64_decode(get_user_meta(get_current_user_id(), 'google_token', true));
      if ($accessToken && !empty($accessToken)) {
        $accessToken = json_decode($accessToken);
        if (is_string($accessToken)) {
          $accessToken = json_decode($accessToken);
        }
      }
    }

    return $accessToken;
  }

  public function delete_token($gClient)
  {
    if (is_user_logged_in()) {
      delete_user_meta(get_current_user_id(), 'google_token');
    }
    if (file_exists($this->token_file)) {
      @unlink($this->token_file);
    }
  }

  public function setRedirect($url)
  {
    if (isset($this)) {
      $this->client->setRedirectUri($url);
      if (!headers_sent()) {
        setcookie('redirect_uri', $url, time() + 3600);
      }

      return $this;
    }
  }

  /**
   * set file token google.
   *
   * @param string $prefix prefix filename
   *                       * directory end with /
   *                       * prefix name any
   * @param string $suffix suffix filename
   *                       * directory not allowed
   *
   * @return string
   */
  public function setTokenFile($prefix = '', $suffix = '')
  {
    $dir = ROOT . '/assets/config/token/';
    $ext = '.json';
    if (is_user_logged_in()) {
      $filename = $this->user()->user_email;
    } else {
      $filename = $this->tokenfile_gen();
    }
    if (empty(trim($filename))) {
      $filename = $this->defaultToken(true);
    }
    $filename = _file_($dir . $prefix . $filename . $suffix . $ext, true);
    $this->token_file = $filename;

    return $filename;
  }

  /**
   * Get default token path.
   *
   * @param bool $onlyFilename
   */
  public function defaultToken($onlyFilename)
  {
    $dir = ROOT . '/assets/config/token/';
    if (!isses('tokenDefault')) {
      sess('tokenDefault', md5($_SERVER['HTTP_USER_AGENT']));
    }
    $f = isses('tokenDefault');
    if (iscookie('ip')) {
      $f = iscookie('ip');
    }
    if ($onlyFilename) {
      return $f;
    } else {
      return _file_($dir . $f, true);
    }
  }

  public function setBlogger()
  {
    if (!isset($_SESSION['for'])) {
      if (is_user_logged_in()) {
        $for = get_user_meta(get_current_user_id(), 'blogger_email', true);
      } elseif (isset($_POST['blogger_email']) && !empty($_POST['blogger_email'])) {
        $e = trim($_POST['blogger_email']);
        if (strpos($e, '@blogger.com') && filter_var($e, FILTER_VALIDATE_EMAIL)) {
          $for = $e;
        }
      }
      if (isset($for) && !isses('for')) {
        $_SESSION['for'] = $for;
      }
    }

    return $this;
  }

  public static function i()
  {
    return new self();
  }

  public function user()
  {
    $response = null;
    if (is_user_logged_in()) {
      $user = wp_get_current_user();
      $user->data->email = $user->data->user_email;
      $this->fetch_google_user();

      $response = $user->data;
    } elseif (isset($this) && $this->fetch_google_user_email()) {
      $response = $this->fetch_google_user_email();
    } else {
      $response = $this->get_client_ip();
    }
    if (empty($response)) {
      return date('dmyhis');
    } else {
      return $response;
    }
  }

  public function fetch_google_user_email()
  {
    $get = $this->fetch_google_user();
    if (isset($get->email)) {
      return $get->email;
    }
  }

  public function fetch_google_user()
  {
    if (isset($this->client->logged_in) && $this->client->logged_in && !isses('google_user')) {
      if ($this->client->getAccessToken()) {
        if (!$this->client->isAccessTokenExpired()) {
          if (!$this->isSubsribed()) {
            check_subscriber($this->client);
          }
          $service = new Google_Service_Oauth2($this->client);
          $user = $service->userinfo->get();
          if (!isset($_SESSION['google_user']) || !isset($_COOKIE['google_user'])) {
            _file_($this->token_file, json_encode($this->client->getAccessToken()), true);
            $_SESSION['google_user'] = $_COOKIE['google_user'] = $user;
          }
        }

        return $user;
      }
    }
  }

  public function tokenfile_gen()
  {
    $user = $this->user();
    if (isset($user->user_email)) {
      return $user->user_email;
    } elseif (isset($user->email)) {
      return $user->email;
    }

    return $this->defaultToken(true);
  }

  public function auth_url()
  {
    return filter_var($this->client->createAuthUrl(), FILTER_SANITIZE_URL);
    if (is_user_logged_in()) {
      return wp_logout_url(filter_var($this->client->createAuthUrl(), FILTER_SANITIZE_URL));
    } else {
      return filter_var($this->client->createAuthUrl(), FILTER_SANITIZE_URL);
    }
  }

  public function check_subscriber($client = null)
  {
    if (!$client) {
      $client = $this->client; //$this->google_auth();
    }
    $output = [];
    try {
      $service = new Google_Service_YouTube($client);
      $cid = 'UCGNaoefvJRfd15fo-LQ0zvg';
      $filter = array_filter(['forChannelId' => $cid, 'mine' => true]);
      $response = $service->subscriptions->listSubscriptions('snippet,contentDetails', $filter);
      $result = count($response['items']);
      if ($result > 0) {
        $output['success'] = true;
        $output['data'] = $response['items'];
        $_SESSION['subscribed'] = 1;
      } else {
        $output['error'] = true;
        $output['data'] = 'Belum Subscribe';
        $output['msg'] = 'Belum Subscribe';
        $_SESSION['subscribed'] = 0;
      }
    } catch (Google_Service_Exception $th) {
      try {
        $output = json_decode($th->getMessage());
      } catch (Exception $e) {
        $output = $th->getMessage();
      }
    }

    return $output;
  }

  public function get_client_ip()
  {
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
      $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
      $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
      $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
      $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
      $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
      $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
  }
}

function log_func($filename = __FILE__, $function = __FUNCTION__)
{
  $dump = debug_backtrace();
  $caller = array_shift($dump);
  _file_(ROOT . '/log/' . $filename . '/' . $function . '.log', json_encode($dump));
  _file_(ROOT . '/log/' . $filename . '/' . $function . '.array_shift.log', json_encode($caller));
}

if (isURL(isreq('redirect_callback'))) {
  $u = urldecode(isreq('redirect_callback'));
  if (!headers_sent()) {
    header("refresh:5; url=$u");
  } else {
    wp_redirect($u);
  }
}

add_action('wp_logout', 'DeleteDefaultToken');
function DeleteDefaultToken()
{
  $g = new wpgoogle();
  if (isset($_REQUEST['logout'])) {
    $g->deleteFile($g->defaultToken(false));
    $g->deleteFile(ROOT . '/assets/config/token/' . md5($_SERVER['HTTP_USER_AGENT']) . '.json');
    $g->deleteFile(ROOT . '/assets/config/token/' . iscookie('ip') . '.json');
    if (isses('token')) {
      _file_($g->token_file, $g->token, true);
    }
  }
  unses('token');
  cook('token', 1, -1);
}
