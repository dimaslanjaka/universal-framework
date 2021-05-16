<?php

namespace GoogleExt;

use Filemanager\file;
use Google\Client as Google_Client;

//use Google_Client;

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
    public $application_name = 'Google Client Library';

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

  public static function get_profile()
  {
    if (isset($_SESSION['google']['login'])) {
      return $_SESSION['google']['login'];
    }

    return [];
  }

  public static function get_profile_picture()
  {
      if (!empty(self::get_profile())) {
          if (isset(self::get_profile()['picture'])) {
              return self::get_profile()['picture'];
          }
      }

      return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
  }

  public static function get_profile_name()
  {
      if (!empty(self::get_profile())) {
          if (isset(self::get_profile()['name'])) {
              return self::get_profile()['name'];
          }
      }

      return 'Login Required';
  }

  /**
   * @param string $redirect /auth/google
   */
  public function create_auth_url($scope, $redirect)
  {
    $this->custom_client($scope, $redirect);

    return $this->createAuthUrl();
  }

  /**
   * @return \GoogleExt\Client
   */
  public function custom_client($scope, $redirect)
  {
    $this->setApplicationName($this->application_name);
    $this->setCredentials(
      CONFIG['google']['client'],
      CONFIG['google']['secret'],
      CONFIG['google']['key']
    );
    $scopes = [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
    ];
    if (is_string($scope)) {
      switch ($scope) {
        case 'blogger':
          $scopes[] = 'https://www.googleapis.com/auth/blogger';
          break;
      }
    }
    $this->set_scope(array_unique($scopes));
    $this->set_offline(true);
    $this->setRedirectUri($this->getOrigin($redirect));
    //$this->auto_login($redirect);
    return $this;
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
    if (!$only_get_url) {
      /**
       * @var \Google\Client
       */
      $client = $this;
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

    /**
     * Auto get token from $_GET['code']
     * And auto refresh token.
     *
     * * @param string $redirect /auth/google
     */
  public function auto_login($redirect)
  {
    $config = $this->configuration;
    $this->setCredentials(
      CONFIG['google']['client'],
      CONFIG['google']['secret'],
      CONFIG['google']['key']
    );
    $this->setRedirectUri($this->getOrigin($redirect));
    // authenticating
    if (isset($_GET['code'])) {
      $token = $this->fetchAccessTokenWithAuthCode($_GET['code']);
      /*$this->authenticate($_GET['code']);
      $access_token = $this->getAccessToken();
      e($access_token, $token);*/
      if (!empty($token)) {
        if (isset($token['error'])) {
          e($token);
        }
        $this->setAccessToken($token);
      }
      if (isset($config['token']['folder']) && $this->getAccessToken()) {
        $user = $this->fetch_user();
        $_SESSION['google']['login'] = $user;
        file::file($config['token']['folder'] . '/' . $user['email'] . '.json', $token, true);
      }
    }

    $tokenpath = null;
    if (isset($_SESSION['google']['login'])) {
        $user = $_SESSION['google']['login'];
        $tokenpath = $config['token']['folder'] . '/' . $user['email'] . '.json';
        if (isset($user['email'])) {
            $email = $user['email'];
        }
        // auto refresh token
        if ($this->isAccessTokenExpired() && isset($user['email']) && $this->getAccessToken()) {
            $this->fetchAccessTokenWithRefreshToken($this->getRefreshToken());
            file::file($tokenpath, json_encode($this->getAccessToken()), true);
        }
    } elseif (isset($this->login_data()['email'])) {
        $email = $this->login_data()['email'];
        $tokenpath = $config['token']['folder'] . '/' . $email . '.json';
    }

    if (file_exists($tokenpath)) {
      $token = json_decode(file_get_contents($tokenpath), true);
      $this->setAccessToken($token);
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
    /**
     * @var \Google\Client
     */
    $client = $this;
    $service = new \Google_Service_Oauth2($client);
    $this->addScope(\Google_Service_Oauth2::USERINFO_EMAIL);
    $this->addScope(\Google_Service_Oauth2::USERINFO_PROFILE);
    $this->authenticate($_GET['code']);

    return (array) $service->userinfo->get();
  }
}
