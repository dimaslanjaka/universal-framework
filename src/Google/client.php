<?php

namespace Google;

use Google_Client;
use Google_Exception;

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

  public function __construct(array $config = [
    'token' => [
      'folder' => __DIR__ . '/token',
    ],
  ])
  {
    parent::__construct($config);
    $this->filemanager = new \Filemanager\file();
    if (isset($config['token']['folder'])) {
      $token_folder = $config['token']['folder'];
    }
    $this->token_folder = $this->filemanager->_folder_($token_folder, null, null, true);
  }

  public function get_token_folder()
  {
    return $this->token_folder;
  }

  public function set_scope($scopes)
  {
    if (is_string($scopes)) {
      if ($this->is_url($scopes)) {
        $this->addScope($scopes);
      } else {
        throw new Google_Exception('Scope is URL format', 1);

        return null;
      }
    } elseif (is_array($scopes)) {
      $this->setScopes($scopes);
    }

    return $this;
  }

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

  public function is_url($string)
  {
    return filter_var($string, FILTER_VALIDATE_URL);
  }
}
