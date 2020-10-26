<?php

namespace Proxy;

$GLOBALS['proxy_loaded'] = null;

class db
{
  /**
   * PDO.
   *
   * @var \DB\pdo
   */
  private $pdo = null;

  public function __construct(\DB\pdo $pdo)
  {
    global $GLOBALS;
    if (!$GLOBALS['proxy_loaded']) {
      $this->load_proxies_db();
    }
    $this->pdo = $pdo;
  }

  public function random_proxy(int $n = 1)
  {
  }

  public function inactive_proxies()
  {
    return $this->pdo->query("SELECT * FROM `proxies` WHERE `status` = 'inactive'")->row_array();
  }

  public function load_proxies_db()
  {
    $proxies = $this->pdo
      ->select('proxies')
      ->where(['country' => null, 'status' => 'active'])
      ->row_array();
    \Filemanager\file::file(__DIR__ . '/proxies/db.json', $proxies, true);

    return $proxies;
  }

  public function load_proxies()
  {
    return json_decode(\Filemanager\file::get(__DIR__ . '/proxies/db.json'));
  }
}
