<?php

class WMI
{
  /**
   * google client.
   *
   * @var Google_Client
   */
  public $google;

  public function __construct()
  {
    $this->google();
  }

  public function google()
  {
    $this->google = new Google_Client();
  }

  public function set($config)
  {
    if ($config == 'default') {
      $config = ['redirect' => WP_HOME . '/AGC/admin/callback', 'scopes' => [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/blogger',
        'https://www.googleapis.com/auth/blogger.readonly'
      ], 'name' => get_bloginfo('name')];
    }
    if (!isset($config['redirect'])) throw new Exception('Redirect URL is needed');
    if (!isset($config['scopes'])) throw new Exception('Scopes URL is needed');
    $this->google->setScopes($config['scopes']);
    $this->google->setRedirectUri($config['redirect']);
    if (isset($config['name'])) $this->google->setApplicationName($config['name']);
    $this->google->setDeveloperKey(GOOGLE_CLIENT_KEY);
    $this->google->setClientId(GOOGLE_CLIENT_ID);
    $this->google->setClientSecret(GOOGLE_CLIENT_SECRET);
  }

  public function auth_url()
  {
    return $this->google->createAuthUrl();
  }
}
