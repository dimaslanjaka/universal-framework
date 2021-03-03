<?php

class OVO
{
  public $nomor;

  public $device;

  public function __construct($nomor, $device = '')
  {
    $this->nomor = $nomor;

    $this->device = $device;
  }

  public function getDevice()
  {
    $deviceId = rand(111, 999) . 'ff' . rand(111, 999) . '-b7fc-3b' . rand(11, 99) . '-b' . rand(11, 99) . 'd-' . rand(1111, 9999) . 'd2fea8e5';

    return $deviceId;
  }

  public function sendRequest2FA()
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.ovo.id/v1.1/api/auth/customer/login2FA');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS, '{"deviceId":"' . $this->device . '","mobile":"' . $this->nomor . '"}');

    curl_setopt($ch, CURLOPT_POST, 1);

    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'App-Version: 2.11.0',

      'Os: Android',

      'Content-Type: application/json; charset=UTF-8',

      'Host: api.ovo.id',

      'User-Agent: okhttp/3.11.0',
    ]);

    $result = curl_exec($ch);

    $reshttp = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    return (200 == $reshttp) ? true : false;
  }

  public function konfirmasiCode($verificationCode)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.ovo.id/v1.1/api/auth/customer/login2FA/verify');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, '{"deviceId":"' . $this->device . '","mobile":"' . $this->nomor . '","verificationCode":"' . $verificationCode . '"}');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'App-Version: 2.11.0',
      'Os: Android',
      'Content-Type: application/json; charset=UTF-8',
      'Host: api.ovo.id',
      'User-Agent: okhttp/3.11.0',
    ]);
    $result = curl_exec($ch);

    curl_close($ch);

    if ('true' == json_decode($result, true)['isSecurityCode']) {
      return true;
    } else {
      return false;
    }
  }

  public function konfirmasiSecurityCode($securityCode)
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.ovo.id/v1.1/api/auth/customer/loginSecurityCode/verify');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_POSTFIELDS, '{"mobile":"' . $this->nomor . '","securityCode":"' . $securityCode . '","deviceUnixtime":1539175105,"appVersion":"3.10.1","deviceId":"' . $this->device . '","macAddress":"08:62:66:67:81:39","osName":"android","osVersion":"8.1.0","pushNotificationId":"FCM|e1-j8yB55QI:APA91bFan4mLCWogE4ols2OFSmz1YjgB71tKwZA0Y-IkwJSiKzG1ALJ6oxGuSQLYXLQWG8dujmdeWOdPn-gWWc_0fDcaO8BaPeZQbiF9wd3pfFU1NcYv54CUU80yPAZMS0nbNqfgHosJ"}');

    curl_setopt($ch, CURLOPT_POST, 1);

    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'App-Version: 2.11.0',

      'Os: Android',

      'Content-Type: application/json; charset=UTF-8',

      'Host: api.ovo.id',

      'User-Agent: okhttp/3.11.0',
    ]);

    $result = json_decode(curl_exec($ch), true);

    $reshttp = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close($ch);

    return (200 == $reshttp) ? ['result' => true, 'data' => $result['token']] : ['result' => false, 'data' => $result['message']];
  }

  public function seeMutation($token, $limit = 10)
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://api.ovo.id/wallet/v2/transaction?page=1&limit=' . $limit . '&productType=001');

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');

    curl_setopt($ch, CURLOPT_ENCODING, 'gzip, deflate');

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Authorization: ' . $token,

      'App-Version: 3.25.1',

      'Os: Android',

      'Host: api.ovo.id',

      'User-Agent: okhttp/3.11.0',
    ]);

    $result = json_decode(curl_exec($ch), true);

    curl_close($ch);

    $http = (200 == $result['status']) ? true : false;

    $data = (200 == $result['status']) ? $result['data'][0]['complete'] : $result['message'];

    return ['result' => $http, 'data' => $data];
  }

  public function cekSaldo($saldo, $mutasi)
  {
    return (false !== strpos($mutasi, $saldo)) ? true : false;
  }
}
