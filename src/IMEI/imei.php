<?php

namespace IMEI;

class imei
{
  public function is_luhn($n)
  {
    $str = '';
    foreach (str_split(strrev((string) $n)) as $i => $d) {
      $str .= 0 !== $i % 2 ? $d * 2 : $d;
    }

    return 0 === array_sum(str_split($str)) % 10;
  }

  public function is_imei2($n)
  {
    return $this->is_luhn($n) && 15 == strlen($n);
  }

  public function is_imei($imei)
  {
    // Should be 15 digits
    if (15 != strlen($imei) || !ctype_digit($imei)) {
      return false;
    }
    // Get digits
    $digits = str_split($imei);
    // Remove last digit, and store it
    $imei_last = array_pop($digits);
    // Create log
    $log = [];
    // Loop through digits
    foreach ($digits as $key => $n) {
      // If key is odd, then count is even
      if ($key & 1) {
        // Get double digits
        $double = str_split($n * 2);
        // Sum double digits
        $n = array_sum($double);
      }
      // Append log
      $log[] = $n;
    }
    // Sum log & multiply by 9
    $sum = array_sum($log) * 9;
    // Compare the last digit with $imei_last
    return substr($sum, -1) == $imei_last;
  }
}
