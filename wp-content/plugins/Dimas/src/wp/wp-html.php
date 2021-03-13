<?php

class dimas_user_html
{
  public static function init()
  {
    return new self();
  }

  public function select_options($data)
  {
    $o = ['<option value="">Pilih Client</option>'];
    foreach ($data as $user) {
      $o[] = '<option value="' . $user->ID . '">' . $user->data->display_name . '</option>';
    }

    return join("\n", $o);
  }

  public function select_method($n, $ex = null)
  {
    $o = ['<option value="">Pilih Metode ' . ucwords($n) . '</option>', '<option value="cash">Cash</option>', '<option value="debit">Debet</option>', ('credit' != $ex ? '<option value="credit">Credit</option>' : '')];

    return join("\n", $o);
  }

  public function build_select_invoice($invoice = false, $display = false, $SQL_result = null)
  {
    $s = [];
    if ($SQL_result) {
      foreach ($SQL_result as $r) {
        $dname = dimas_user::user_init((array) $r)->set_user($r->client)->dname();
        $total = strtok($r->total, '.');
        $in = strtok($r->in, '.');
        $sisa = $total - $in;
        $s[] = '<option value="' . $r->inv . '" total="' . $sisa . '" client="'.$r->client.'">' . $dname . ' ' . uang::format($sisa) . '</option>';
      }
    }

    return join("\n", $s);
  }
}
