<?php

namespace Accounting;

class money
{
  public static function nominal($angka, $prefix = '$')
  {
    $jd = $prefix . ' ' . number_format($angka, 0, ',', '.');

    return $jd;
  }

  public static function rupiah($angka)
  {
    $hasil_rupiah = 'Rp ' . number_format($angka, 2, ',', '.');

    return $hasil_rupiah;
  }
}
