<?php

$json = [];
if (file_exists(__DIR__ . '/roles.json')) {
  $json = json_decode(file_get_contents(__DIR__ . '/roles/json'), true);
}
if (empty($json)) {
  $json['master'] = '*';
  $json['manager'] = '*';
}

$json_string = json_encode($json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
file_put_contents(__DIR__ . '/roles.json', $json_string);


class roles
{
  private $user = null;

  function __construct(\User\user $u)
  {
    $this->user = $u;
  }

  public function can()
  {
  }

  public function toJSON()
  {
    global $json_string;
    header('content-type: application/json');

    echo $json_string;
  }
}
