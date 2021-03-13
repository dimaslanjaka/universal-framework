<?php

if (isset($_POST['piutang'])) {
  $inv = $form->post('invoice-piutang');
  $client = $form->post('client-piutang');
  $total = $form->post('total-piutang');
  $sisa = $form->post('sisa-piutang');
  $start = $form->post('start-piutang');
  $end = $form->post('end-piutang');
  $log = $_SERVER['DOCUMENT_ROOT'] . '/log/' . $user->company() . '/piutang/' . $inv . '.json';
  $a_log = [date('Y-m-d H:i:s') => ['inv' => $inv, 'text' => 'Piutang added', 'total' => $total, 'sisa' => $sisa, 'staff' => $user->id()]];
  $core->file($log, $a_log, false);
  if ($AChain->invoice($inv, 'piutang', $client, $total)->result()) {
    if ($AChain->piutang($inv, $start, $end, $total, $sisa, $log)) {
      $output['success'] = "PI#{$inv} tercatat di piutang";
      $output['reset'] = true;
      $output['refresh'] = true;
    } else {
      $output['error'] = "PI#{$inv} tidak bisa dicatat";
      $output['msg'] = $AChain->lastSQL(true);
    }
  } else {
    $output['error'] = "PI#invoice#{$inv} tidak bisa dicatat";
    $output['msg'] = $AChain->lastSQL(true);
  }
  $core->dump($output);
}
