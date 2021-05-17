<?php
$data = "cons id";
$secretKey = "secret key";
// Computes the timestamp
date_default_timezone_set('UTC');
$tStamp = strval(time() - strtotime('1970-01-01 00:00:00'));
// Computes the signature by hashing the salt with the secret key as the key
$signature = hash_hmac('sha256', $data . "&" . $tStamp, $secretKey, true);
// base64 encode…
$encodedSignature = base64_encode($signature);

echo "X-cons-id: " . $data . " ";
echo "X-timestamp:" . $tStamp . " ";
echo "X-signature: " . $encodedSignature;
$ch = curl_init();
$headers = array(
  'X-cons-id: ' . $data . '',
  'X-timestamp: ' . $tStamp . '',
  'X-signature: ' . $encodedSignature . '',
  'Content-Type:application/json',
);
curl_setopt($ch, CURLOPT_URL, "http://dvlp.bpjs-kesehatan.go.id:8081/devWslokalrest/Peserta/Peserta/nomer_kartu");
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_TIMEOUT, 3);
curl_setopt($ch, CURLOPT_HTTPGET, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
$content = curl_exec($ch);
$err = curl_error($ch);
