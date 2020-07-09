<?php

namespace User;

class access
{
  private $config;
  /**
   * User instance.
   *
   * @var \User\user
   */
  private $user;

  public function __construct(\User\user $user)
  {
    $this->config = \Filemanager\file::file(__DIR__ . '/config/access/global.json', ['superuser' => '*']);
    $this->user = $user;
  }

  public function check()
  {
  }

  /**
   * Get access lists.
   *
   * @return array
   */
  public function getAccess()
  {
    return \Filemanager\file::get($this->config, true);
  }

  /**
   * Get root config.json.
   *
   * @return array
   */
  private function config()
  {
    return \Filemanager\file::get(ROOT . '/config.json', true);
  }

  private $managedAccess;

  /**
   * Get list of managed access, that requires spesific user roles.
   *
   * @return array
   */
  public function get_managed_access()
  {
    if (!$this->managedAccess) {
      $app = $this->config();
      if (isset($app['app'])) {
        $app = $app['app'];
      } else {
        throw new \MVC\Exception('Config failed, no `app` property', 1);
      }
      $read = \Filemanager\scan::scandir(ROOT . '/' . $app['views']);
      $flist = [];
      foreach ($read as $files) {
        $flist[] = \MVC\helper::get_url_path($files['path']);
      }
      $flist = array_map(function ($path) use ($app) {
        //strip extensions
        $withoutExt = preg_replace('/\\.[^.\\s]{3,4}$/', '', $path);
        /**
         * Group ignore patterns.
         */
        $patterns = [
          // ignore static file and form controller
          "\-f.php$|\.(js|css|json|txt|log|htaccess|gitignore)$",
          // ignore not special access
          "\/(login|logout|signup|test)\.php$",
          // ignore unmanaged zones
          "\/(fb|css|chat|comments|curl|snippets|vpngate|blog|server|php|proxy|im3|telkomsel|byu|axis|google|auth|agc|alquran|img|tools|coupon|login|test)\/",
          // ignore public access
          "^\/{$app['views']}\/(index|dashboard|profile|php-socket|user)\.php$",
        ];

        $ignore = preg_match_all('/' . implode('|', $patterns) . '/s', $path);
        if (!$ignore) {
          return $withoutExt;
        }

        return null;
      }, $flist);

      $this->managedAccess = array_values(array_filter($flist));
    }

    return $this->managedAccess;
  }

  /**
   * Save new configuration.
   *
   * @return bool
   */
  public function save(array $newData)
  {
    $config = $this->getAccess();
    $merge = array_replace($config, $newData);

    return !empty(trim(\Filemanager\file::file($this->config, $merge, true)));
  }
}
