<?php

$curl = curl_init();
curl_setopt_array($curl, [
  CURLOPT_URL => 'https://api.rajaongkir.com/starter/city',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_CUSTOMREQUEST => 'GET',
  CURLOPT_HTTPHEADER => ['key:5ae805b941436ed335a92d007f105895'],
]);

$respon = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

var_dump($respon);
