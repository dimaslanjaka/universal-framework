<?php

namespace Office;

/**
 * Office Module Loader.
 *
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
class loader
{
  /**
   * PDO instance.
   *
   * @var \DB\pdo
   */
  private $pdo;
  /**
   * User instance.
   *
   * @var user
   */
  public $user;
  /**
   * User meta instance.
   *
   * @var \User\meta
   */
  public $usermeta;
  /**
   * Warehouse instance.
   *
   * @var inventory\warehouse\index
   */
  public $warehouse;
  /**
   * Config instance.
   *
   * @var config
   */
  public $config;

  public function __construct(\DB\pdo $pdo)
  {
    $this->pdo = $pdo;
    $this->user = new user($pdo);
    $this->usermeta = $this->user->usermeta;
    $this->warehouse = new inventory\warehouse\index($pdo);
  }

  /**
   * Set Config warehouse.
   *
   * @return void
   */
  public function config(string $officeName)
  {
    $this->config = new config($officeName);
  }
}
