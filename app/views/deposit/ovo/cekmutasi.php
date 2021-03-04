<?php

$db = new Database();
$dbh = $db->connect();
$data_ovo = $data['accountovo'];
$token = $data_ovo['token'];
$AndroidDeviceID = rand(111, 999) . 'ff' . rand(111, 999) . '-b7fc-3b' . rand(11, 99) . '-b' . rand(11, 99) . 'd-' . rand(1111, 9999) . 'd2fea8e5';
$ovo = (!$data_ovo['nomor'] || !$data_ovo['device']) ? '' : new OVO($data_ovo['nomor'], $data_ovo['device']);
$result = [];
$result['result'] = false; // initialize default as false
$result['mutasi'] = $data['mutasi'];
if ($result['c_depo'] = $data['cek_depo']) {
  $result['modify'] = $data['interface']->model('Ambildata_model')->aftercekdepositmutasi2($data['mutasi']['jumlah'], $data['mutasi']['provider']);
}

$mcek = $ovo->seeMutation($token);
$result['ovo_test'] = $mcek['result'];

if (trim(strtolower($data['mutasi']['provider'])) == 'ovo') {
  if (isDev()) {
    $result['mutasi_cek'] = $mcek;
  }
  if (isset($mcek['result'])) {
    if ($mcek['result']) { // jika result false, ada masalah pada api ovo
      foreach ($mcek['data'] as $single_mutation) {
        $transaction_amount = $single_mutation['transaction_amount'];
        if ($data['mutasi']['jumlah'] == $transaction_amount) {
          /**
           * apabila ada mutasi dari riwayat mutasi (transaction history)
           * memiliki jumlah yang sama dengan jumlah deposit, maka
           * akan di kembalikan sebagai true/sukses
           */
          $result['result'] = true;
        } else if (isDev()) {
          if ($data['mutasi']['jumlah'] == '120136') {
            $result['result'] = true;
          }
        }
      }
    }
  }
}
dumpJSON($result);
