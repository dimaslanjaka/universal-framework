<?php

class dimas_google extends dimas_user
{
  public function __construct($O = null)
  {
    parent::__construct($O);
  }

  /**
   * set default credentials.
   *
   * @param Google_Client $gClient
   *
   * @return Google_Client
   */
  public function setCredentials($gClient)
  {
    $gClient->setApplicationName('Login to ' . WP_HOST);
    $gClient->setDeveloperKey(GOOGLE_CLIENT_KEY);
    $gClient->setClientId(GOOGLE_CLIENT_ID);
    $gClient->setClientSecret(GOOGLE_CLIENT_SECRET);

    return $gClient;
  }

  /**
   * google scopes initializer.
   *
   * @param Variadic ...$type
   *
   * @return void
   */
  public function google_scopes(...$type)
  {
    $scope = [
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ];

    foreach ($type as $sc) {
      switch ($sc) {
        case 'drive':
          $scope[] = 'https://www.googleapis.com/auth/drive';
          break;
        case 'blogger':
          $scope[] = 'https://www.googleapis.com/auth/blogger';
          $scope[] = 'https://www.googleapis.com/auth/blogger.readonly';
          break;
        case 'analystic':
          $scope[] = 'https://www.googleapis.com/auth/analytics.readonly';
          break;

        default:
          if ((isLocalhost() || $this->isAdmin()) && 'default' == $type[0]) {
            $scope[] = 'https://www.googleapis.com/auth/drive';
            $scope[] = 'https://www.googleapis.com/auth/youtube';
            $scope[] = 'https://www.googleapis.com/auth/youtube.force-ssl';
          }
          break;
      }
    }
    $scope = array_values(array_unique($scope));
    $this->scopes = $scope;

    return $scope;
  }

  public function wp_login()
  {
    try {
      $gClient = $this->google_auth();
      if ($gClient->getAccessToken()) {
        $service = new Google_Service_Oauth2($gClient);
        $gu = $service->userinfo->get();
        if (isset($gu->email)) {
          if (filter_var($gu->email, FILTER_VALIDATE_EMAIL)) {
            if (!email_exists($gu->email)) {
              $username = strtok($gu->email, '@');
              $password = md5($gu->email);
              $email = $gu->email;
              wp_create_user($username, $password, $email);
              $user = get_user_by('email', $gu->email);
              if (!is_wp_error($user)) {
                wp_clear_auth_cookie();
                wp_set_current_user($user->ID);
                wp_set_auth_cookie($user->ID);
                user_last_login($user);
                $this->update_token($gClient);
              }
            } elseif (is_user_logged_in()) {
              $current_user = wp_get_current_user();
              if ($current_user->user_email != $gu->email) {
                $this->delete_token($gClient);
                $user = get_user_by('email', $gu->email);
                if (!is_wp_error($user)) {
                  wp_clear_auth_cookie();
                  wp_set_current_user($user->ID);
                  wp_set_auth_cookie($user->ID);
                  user_last_login($user);
                  $this->update_token($gClient);
                }
              }
            } else {
              $user = get_user_by('email', $gu->email);
              if (!is_wp_error($user)) {
                wp_clear_auth_cookie();
                wp_set_current_user($user->ID);
                wp_set_auth_cookie($user->ID);
                user_last_login($user);
                $this->update_token($gClient);
              }
            }
          }
        }
        $_SESSION['google_user'] = $gu;
      }
    } catch (\Throwable $th) {
      return false;
    }
  }

  /**
   * Check user is admin.
   *
   * @return boolean
   */
  public function isAdmin()
  {
    return is_user_logged_in() && current_user_can('administrator');
  }

  /**
   * Check instance of google have an valid token or not.
   *
   * @return boolean
   */
  public function isValid()
  {
    $gClient = $this->client;

    return $gClient->getAccessToken() && !$gClient->isAccessTokenExpired();
  }

  /**
   * Check user is subscribed or not.
   *
   * @return boolean
   */
  public function isSubsribed()
  {
    if (!$this->subCek() && $this->client) {
      check_subscriber($this->client);
    }

    return $this->subCek();
  }

  public function subCek()
  {
    return isset($_SESSION['subscribed']) && 1 == $_SESSION['subscribed'];
  }
}
