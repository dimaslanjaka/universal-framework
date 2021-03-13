<?php

$f = dimas_form::form(OPT());
if ($f->postc('pelunasan-piutang')) {
  $inv = $f->post('inv');
  $bayar = $f->post('bayar');
  $log = $f->post('log');
  $log = json_decode(file_get_contents($log));
  $log->{date('Y-m-d H:i:s')} = ['inv' => $inv, 'text', 'total', 'sisa'];
}
