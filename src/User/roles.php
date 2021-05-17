<?php

namespace User;

$json = [];
$configPath = __DIR__ . '/config/roles.json';

if (file_exists($configPath)) {
    $json = json_decode(file_get_contents($configPath), true);
}
if (empty($json)) {
    $json['superadmin'] = ['*'];
    $json['manager'] = ['*'];
}

$json_string = json_encode($json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
file_put_contents($configPath, $json_string);

class roles
{
    private $user = null;

    public function __construct(user $u)
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
