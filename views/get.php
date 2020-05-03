<?php

use JSON\json;

$opt['url'] = 'https://www.google.com';
$opt['setopt'] = [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_AUTOREFERER => false,
  CURLOPT_FOLLOWLOCATION => false,
  CURLOPT_TIMEOUT => 400,
  CURLOPT_ENCODING => '',
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_POSTFIELDS => '',
];
$opt['cookie'] = true;

json::json(Extender\request::static_request($opt));
