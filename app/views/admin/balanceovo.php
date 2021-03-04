<?php

$db = new Database();
$dbh = $db->connect();
$data_ovo = $data['accountovo'];
$token = $data_ovo['token'];
$AndroidDeviceID = rand(111, 999) . 'ff' . rand(111, 999) . '-b7fc-3b' . rand(11, 99) . '-b' . rand(11, 99) . 'd-' . rand(1111, 9999) . 'd2fea8e5';
$ovo = (!$data_ovo['nomor'] || !$data_ovo['device']) ? '' : new OVO($data_ovo['nomor'], $data_ovo['device']);

$arrobj = $ovo->getBalance($token)['result']['balance'];
$result = [];
foreach ($arrobj as $arrX) {
  $result[] = $arrX;
}

disableCache();
dumpJSON($result);
