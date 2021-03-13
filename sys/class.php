<?php
class sys_router {
  public $url;

  public function __construct()
  {
    $this->url = strtok($_SERVER["REQUEST_URI"], '?');
    $this->part = explode('/', $this->url);
  }
}
