<?php

if (isset($_POST['pendapatan'])) {
  $inv = $form->post('invoice');
  $client = $form->post('client');
  $keterangan = $form->post('keterangan', 'SQLNULL');
  $total = $form->post('total');
  $masuk = $form->post('total-masuk');
  $method = $form->post('metode');
  $rek = $form->post('rekening', 0);
  if ($AChain->invoice($inv, 'pendapatan', $client, $total)->result()) {
    if ($AChain->transaksi($inv, $masuk, 0, $method, $rek)) {
      if ($AChain->keterangan($inv, $keterangan)->result()) {
        if ($AChain->pendapatan($inv, $total, $masuk)->result()) {
          $output['success'] = "INV#{$inv} telah dicatat";
          $output['reset'] = true;
          $output['refresh'] = true;
        } else {
          $output['error'] = "INV#{$inv} tidak bisa dicatat";
          $output['msg'] = $AChain->lastSQL(true);
        }
      } else {
        $output['error'] = "KET#{$inv} tidak bisa dicatat";
        $output['msg'] = $AChain->lastSQL(true);
      }
    }
  } else {
    $output['error'] = "INV#invoice#{$inv} tidak bisa dicatat";
    $output['msg'] = $AChain->lastSQL(true);
  }
  $core->dump($output);
}
