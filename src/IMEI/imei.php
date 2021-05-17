<?php

namespace IMEI;

class imei
{
    /**
     * Generates IMEI code valid and random
     * Generates 14 aleatory digits. These 14, multiplies the multiples of 2 by 2 and sum the result
     * The result Must be divisible by 10,
     * Then get the diference and genaretes the last digit.
     *
     * @return int $imei
     */
    public static function rand_imei()
    {
        $code = self::intRandom(14);
        $position = 0;
        $total = 0;
        while ($position < 14) {
            if (0 == $position % 2) {
                $prod = 1;
            } else {
                $prod = 2;
            }
            $actualNum = $prod * $code[$position];
            if ($actualNum > 9) {
                $strNum = strval($actualNum);
                $total += $strNum[0] + $strNum[1];
            } else {
                $total += $actualNum;
            }
            ++$position;
        }
        $last = 10 - ($total % 10);
        if (10 == $last) {
            $imei = $code . 0;
        } else {
            $imei = $code . $last;
        }

        if (strlen($imei) < 15) {
            $digits = 15 - strlen($imei);
            $imei .= rand(pow(10, $digits - 1), pow(10, $digits) - 1);
        } else {
            $imei = substr($imei, 0, 15);
        }

        return $imei;
    }

    /**
     * @param int $size
     *
     * @return $int
     */
    public static function intRandom($size)
    {
        $validCharacters = utf8_decode('0123456789');
        $validCharNumber = strlen($validCharacters);
        $int = '';
        while (strlen($int) < $size) {
            $index = mt_rand(0, $validCharNumber - 1);
            $int .= $validCharacters[$index];
        }

        return $int;
    }

    public function is_imei2($n)
    {
        return $this->is_luhn($n) && 15 == strlen($n);
    }

    public function is_luhn($n)
    {
        $str = '';
        foreach (str_split(strrev((string)$n)) as $i => $d) {
            $str .= 0 !== $i % 2 ? $d * 2 : $d;
        }

        return 0 === array_sum(str_split($str)) % 10;
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
