<?php

/**
 * Checkpoint facebook.
 */
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, 'https://mbasic.facebook.com/login/checkpoint/');
curl_setopt($curl, CURLOPT_REFERER, 'https://mbasic.facebook.com/login.php?login_attempt=1');
curl_setopt($curl, CURLOPT_ENCODING, '');
curl_setopt($curl, CURLOPT_AUTOREFERER, true);
curl_setopt($curl, CURLOPT_COOKIEFILE, $cookieFile);
curl_setopt($curl, CURLOPT_COOKIEJAR, $cookieFile);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($_POST));
$curlData = curl_exec($curl);
echo $curlData;
curl_close($curl);
