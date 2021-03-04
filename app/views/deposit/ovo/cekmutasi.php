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
/**
 * cek depo UNREAD
 */
$result['cek_depo'] = $data['interface']->model('Ambildata_model')->cekdepositmutasi($data['mutasi']['jumlah']) === 1;

$mcek = $ovo->seeMutation($token);
$result['ovo_test'] = $mcek['result'];

if (trim(strtolower($data['mutasi']['provider'])) == 'ovo' && $result['cek_depo']) {
}

if (isDev()) {
  $result['mutasi_cek'] = $mcek;
}

if (isset($mcek['result'])) {
  $do_update = false;
  if ($mcek['result']) { // jika result false, ada masalah pada api ovo
    foreach ($mcek['data'] as $single_mutation) {
      $transaction_amount = $single_mutation['transaction_amount'];
      if ($data['mutasi']['jumlah'] == $transaction_amount) {
        $do_update = true;
      } else if (isDev()) { // hanya untuk development mode
        if ($data['mutasi']['jumlah'] == get_cookie('fake-mutation')) {
          $do_update = true;
        }
      }
    }
  }

  if ($do_update) {
    /**
     * apabila ada mutasi dari riwayat mutasi (transaction history)
     * memiliki jumlah yang sama dengan jumlah deposit, maka
     * akan di kembalikan sebagai true/sukses
     */
    $result['result'] = true;

    /**
     * update status READ if match of history mutation
     * with requested topup ammounts
     */
    $result['update_read'] = $data['interface']->model('Ambildata_model')->aftercekdepositmutasi($data['mutasi']['jumlah'], 'ovo');
  }
}

dumpJSON($result);
