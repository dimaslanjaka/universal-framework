<?php

namespace user;

use Google_Client;

class client_helper extends Google_Client
{
  private $scopes = [];
  private $client = null;
  private $token = [];
  function __construct()
  {
    parent::__construct();
    $this->client = new Google_Client();
    $this->client->setApplicationName("Blogger tools");
  }
}
