<?php

namespace Google;

use Filemanager\file;
use Google_Client;

class client extends Google_Client
{
  /**
   * Google Client Instances.
   *
   * @var \Google_Client
   */
  private $Client;
  /**
   * Filemanager instance.
   *
   * @var \Filemanager\file
   */
  private $filemanager;
  private $token_folder;
  private $configuration;

  public function __construct(array $config = ['token' => ['folder' => __DIR__ . '/token']])
  {
    parent::__construct($config);
    $this->filemanager = new \Filemanager\file();
    if (isset($config['token']['folder'])) {
      $token_folder = $config['token']['folder'];
      $this->token_folder = $token_folder;
      file::folder($token_folder, null, null, true);
      file::file($token_folder . '/.htaccess', 'deny from all');
      file::file($token_folder . '/.gitignore', "*\n!.gitignore\n!.htaccess");
    }
    $this->configuration = $config;
  }

  /**
   * Check user google is login.
   *
   * @return bool
   */
  public function is_login()
  {
    return isset($_SESSION['google']['login']) && !empty($_SESSION['google']['login']) && isset($_SESSION['google']['login']['email']);
  }

  /**
   * Revoke token.
   *
   * @return $this
   */
  public function revoke()
  {
    $this->revokeToken();

    $this;
  }

  /**
   * Get current origin url.
   *
   * @return string
   */
  public function getOrigin(string $path = null)
  {
    return (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://$_SERVER[HTTP_HOST]$path";
  }

  public function get_token_folder()
  {
    return $this->token_folder;
  }

  public function set_token_folder(string $path)
  {
    if ($path = realpath($path)) {
      $this->token_folder = $path;
    }

    return $this;
  }

  public function set_scope($scopes)
  {
    if (is_string($scopes)) {
      if ($this->is_url($scopes)) {
        $this->addScope($scopes);
      } else {
        throw new \MVC\Exception('Scope is URL format', 1);

        return null;
      }
    } elseif (is_array($scopes)) {
      $this->setScopes($scopes);
    }

    return $this;
  }

  /**
   * Set access token offline.
   *
   * @param bool $offline
   *
   * @return client
   */
  public function set_offline($offline = true)
  {
    if ($offline) {
      $this->setAccessType('offline');
      $this->setApprovalPrompt('force');
    } else {
      $this->setApprovalPrompt('auto');
    }

    return $this;
  }

  /**
   * Set default credentials.
   *
   * @return client
   */
  public function setCredentials(string $client, string $secret, string $key)
  {
    $this->setApplicationName('Login to ' . $_SERVER['HTTP_HOST']);
    $this->setDeveloperKey($key);
    $this->setClientId($client);
    $this->setClientSecret($secret);
    $this->addScope('https://www.googleapis.com/auth/userinfo.email');
    $this->addScope('https://www.googleapis.com/auth/userinfo.profile');

    return $this;
  }

  /**
   * Check if current instance is valid.
   *
   * @return bool
   */
  public function isValid()
  {
    return $this->getAccessToken() && !$this->isAccessTokenExpired();
  }

  public function is_url($string)
  {
    return filter_var($string, FILTER_VALIDATE_URL);
  }

  /**
   * Check user has subscribed to youtube channel.
   *
   * @param string $cid          channel id
   * @param bool   $only_get_url = return URL channel
   */
  public function check_subscriber(string $cid = 'UCGNaoefvJRfd15fo-LQ0zvg', bool $only_get_url = false)
  {
    $client = $this;
    if (!$only_get_url) {
      $service = new \Google_Service_YouTube($client);
      $response = $service->subscriptions->listSubscriptions(
        'snippet,contentDetails',
        array_filter(['forChannelId' => $cid, 'mine' => true])
      );

      $result = count($response['items']);
      $output = [];
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
    } else {
      $output = 'https://www.youtube.com/channel/' . $cid;
    }

    return $output;
  }

  public function auto_login()
  {
    $config = $this->configuration;
    if (isset($_GET['code'])) {
      $token = $this->fetchAccessTokenWithAuthCode($_GET['code']);
      /*$this->authenticate($_GET['code']);
      $access_token = $this->getAccessToken();
      e($access_token, $token);*/
      if (!empty($token)) {
        if (isset($token['error'])) {
          e($token);
        }
        //$this->setAccessToken($token);
      }
      if (isset($config['token']['folder']) && $this->getAccessToken()) {
        $user = $this->fetch_user();
        $_SESSION['google']['login'] = $user;
        file::file($config['token']['folder'] . '/' . $user['email'] . '.json', $token, true);
      }
    } else {
      if (isset($this->login_data()['email'])) {
        $email = $this->login_data()['email'];
        $tokenpath = $config['token']['folder'] . '/' . $email . '.json';
        if (file_exists($tokenpath)) {
          $token = json_decode(file_get_contents($tokenpath), true);
          $this->setAccessToken($token);
        }
      }
    }

    if (isset($_SESSION['google']['login'])) {
      $user = $_SESSION['google']['login'];
      // auto refresh token
      if ($this->isAccessTokenExpired() && isset($user['email']) && $this->getAccessToken()) {
        $this->fetchAccessTokenWithRefreshToken($this->getRefreshToken());
        file::file($config['token']['folder'] . '/' . $user['email'] . '.json', json_encode($this->getAccessToken()), true);
      }
    }
  }

  /**
   * Get current user login ($_SESSION['login']).
   *
   * @return array
   */
  public function login_data()
  {
    return isset($_SESSION['login']) ? \ArrayHelper\helper::unset($_SESSION['login'], ['password']) : [];
  }

  /**
   * Get current google user data.
   *
   * @return void
   */
  public function userdata()
  {
    return isset($_SESSION['google']['login']) ? \ArrayHelper\helper::unset($_SESSION['google']['login'], ['password']) : [];
  }

  /**
   * Fetch user information from google.
   *
   * @return array
   */
  public function fetch_user()
  {
    $service = new \Google_Service_Oauth2($this);
    $this->addScope(\Google_Service_Oauth2::USERINFO_EMAIL);
    $this->addScope(\Google_Service_Oauth2::USERINFO_PROFILE);
    $this->authenticate($_GET['code']);

    return (array) $service->userinfo->get();
  }
}
