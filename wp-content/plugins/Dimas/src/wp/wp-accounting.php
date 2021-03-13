<?php

class dimas_accounting extends dimas_user
{
  protected $SQL;
  public $SQL_result;
  public $lresult;
  public $lquery;
  public $lerror;

  public function __construct($o)
  {
    parent::__construct($o);
    if ($this->isCompany(false)) {
      if (empty($this->company())) {
        $this->wperror('Company is empty');
      }
      $this->SQL = new wpdb($this->wpdb->dbuser, $this->wpdb->dbpassword, trim($this->company()), $this->wpdb->dbhost);
      $this->DB = $this->dbname();
    } else {
      $this->wperror('You not registered at any companies');
    }
  }

  public static function chain($o)
  {
    return new self($o);
  }

  public function trim($str)
  {
    return preg_replace('/\s+/m', ' ', $str);
  }

  public function get_records_current_month($table, $column, $where = false)
  {
    $sql = " SELECT *
    FROM {$table}
    WHERE MONTH({$column}) = MONTH(CURRENT_DATE())
    AND YEAR({$column}) = YEAR(CURRENT_DATE()) ";
    if ($where) {
      $sql .= " {$where} ";
    }
    $this->SQL_result = $this->SQL->get_results($this->trim($sql));

    return $this;
  }

  public function count_row($add = 1)
  {
    return !empty($this->SQL_result) ? count($this->SQL_result) + $add : (int) 1;
  }

  public function count()
  {
    return $this->count_row();
  }

  public function lastSQL($print = false)
  {
    $this->lresult = $this->SQL->last_result;
    $this->lquery = $this->SQL->last_query;
    $this->lerror = $this->SQL->last_error;

    if (!$print) {
      return $this;
    } else {
      $e = [];
      $e['last_result'] = $this->lresult;
      $e['last_query'] = $this->lquery;
      $e['last_error'] = $this->lerror;

      return $e;
    }
  }

  public function keterangan($inv, $ket)
  {
    $this->SQL_result = $this->SQL->insert('keterangan', ['inv' => $inv, 'ket' => $ket]);
    $this->lastSQL();

    return $this;
  }

  public function pendapatan($inv, $total, $in)
  {
    $this->SQL_result = $this->SQL->insert('j-pendapatan', ['inv' => $inv, 'total' => $total, 'in' => $in]);
    $this->lastSQL();

    return $this;
  }

  public function invoice($inv, $type, $client, $total)
  {
    $this->SQL_result = $this->SQL->insert('invoice', ['inv' => $inv, 'client' => $client, 'type' => $type, 'total' => $total, 'staff' => get_current_user_id()]);
    $this->lastSQL();

    return $this;
  }

  public function transaksi($inv, $in = 0, $out = 0, $method, $rek = 0)
  {
    $this->SQL_result = $this->SQL->insert('j-transaksi', ['inv' => $inv, 'in' => $in, 'out' => $out, 'method' => $method, 'rek' => $rek]);
    $this->lastSQL();

    return $this;
  }

  public function piutang($inv, $start, $end, $total, $sisa, $log)
  {
    $this->SQL_result = $this->SQL->insert('j-piutang', ['inv' => $inv, 'start' => $start, 'end' => $end, 'total' => $total, 'sisa' => $sisa, 'log' => $log]);
    $this->lastSQL();

    return $this;
  }

  public function get_transaksi()
  {
    $sql = 'SELECT
    `invoice`.*,
    `j-transaksi`.`in`,
    `j-transaksi`.`out`,
    `j-transaksi`.`method`,
    `j-transaksi`.`rek`,
    `keterangan`.`ket` AS keterangan
FROM
    `invoice`
INNER JOIN `j-transaksi` ON `invoice`.`inv` = `j-transaksi`.`inv`
INNER JOIN `keterangan` ON `invoice`.`inv` = `keterangan`.`inv`
GROUP BY
    `invoice`.`inv`
ORDER BY
    `invoice`.`pdate` ASC';
    $this->SQL_result = $this->SQL->get_results($this->trim($sql));
    $this->lastSQL();

    return $this;
  }

  public function get_sisa_transaksi_not_in_piutang()
  {
    $sql = 'SELECT
    `invoice`.*,
    `j-transaksi`.`in`,
    `j-transaksi`.`out`,
    `j-transaksi`.`method`,
    `j-transaksi`.`rek`,
    `keterangan`.`ket` AS keterangan
FROM
    `invoice`
JOIN `j-transaksi` ON `invoice`.`inv` = `j-transaksi`.`inv`
JOIN `keterangan` ON `invoice`.`inv` = `keterangan`.`inv`
LEFT JOIN `j-piutang` i ON
    i.inv = `invoice`.`inv`
WHERE
    i.inv IS NULL AND `j-transaksi`.`in` <> `invoice`.`total`';
    if ($this->SQL) {
      $this->SQL_result = $this->SQL->get_results($this->trim($sql));
      $this->lastSQL();
    }

    return $this;
  }

  public function get_all_tables()
  {
    $sql = 'SELECT
    `invoice`.*,
    `j-transaksi`.`in`,
    `j-transaksi`.`out`,
    `j-transaksi`.`method`,
    `j-transaksi`.`rek`,
    `j-piutang`.`total` AS piutang_total,
    `j-piutang`.`start` AS piutang_start,
    `j-piutang`.`end` AS piutang_end,
    `j-piutang`.`sisa` AS piutang_sisa,
    `j-hutang`.`start` AS hutang_start,
    `j-hutang`.`end` AS hutang_end,
    `j-hutang`.`total` AS hutang_total,
    `j-hutang`.`sisa` AS hutang_sisa,
    `keterangan`.`ket` AS keterangan
FROM
    `invoice`
INNER JOIN `j-transaksi` ON `invoice`.`inv` = `j-transaksi`.`inv`
INNER JOIN `j-piutang` ON `invoice`.`inv` = `j-piutang`.`inv`
INNER JOIN `j-hutang` ON `invoice`.`inv` = `j-hutang`.`inv`
INNER JOIN `keterangan` ON `invoice`.`inv` = `keterangan`.`inv`
GROUP BY
    `invoice`.`inv`
ORDER BY
    `invoice`.`pdate` ASC';
    $this->SQL_result = $this->SQL->query($this->trim($sql));
    $this->lastSQL();

    return $this;
  }

  public function result()
  {
    return $this->SQL_result;
  }

  public function r()
  {
    return $this->SQL_result;
  }

  public function dbname()
  {
    return $this->SQL->dbname;
  }

  public function get_all_pendapatan()
  {
    $sql = "SELECT DISTINCT
    `invoice`.*,
    `j-pendapatan`.`in` AS pendapatan_in,
    `j-transaksi`.`method`,
    `j-transaksi`.`rek` AS rekening,
    `keterangan`.`ket` AS keterangan,
    `j-piutang`.`total` AS piutang_total,
    `j-piutang`.`start` AS piutang_start,
    `j-piutang`.`end` AS piutang_end,
    `j-piutang`.`sisa` AS piutang_sisa
FROM
    `invoice`
LEFT JOIN `j-transaksi` ON `invoice`.`inv` = `j-transaksi`.`inv` AND `invoice`.`type` = 'pendapatan'
LEFT JOIN `j-pendapatan` ON `invoice`.`inv` = `j-pendapatan`.`inv` AND `invoice`.`type` = 'pendapatan'
LEFT JOIN `keterangan` ON `invoice`.`inv` = `keterangan`.`inv` AND `invoice`.`type` = 'pendapatan'
LEFT JOIN `j-piutang` ON `invoice`.`inv` = `j-piutang`.`inv` OR `j-piutang`.inv IS NULL
GROUP BY
    `invoice`.`inv`
ORDER BY
    `invoice`.`pdate` ASC";
    $this->SQL_result = $this->SQL->get_results($this->trim($sql));
    $this->lastSQL();

    return $this;
  }

  public function get_all_piutang($inv = false)
  {
    $where = '';
    if ($inv) {
      $where = "WHERE `j-piutang`.`inv` = '$inv'";
    }
    $sql = "SELECT
    `invoice`.*,
    `j-pendapatan`.`total` AS pendapatan_total,
    `j-piutang`.`total` AS piutang_total,
    `j-piutang`.`start` AS piutang_start,
    `j-piutang`.`end` AS piutang_end,
    `j-piutang`.`sisa` AS piutang_sisa,
    `j-piutang`.`log` AS piutang_log,
    `keterangan`.`ket` AS keterangan
    FROM
        `invoice`
    JOIN `j-piutang` ON `invoice`.`inv` = `j-piutang`.`inv` AND `invoice`.`type` = 'piutang'
    JOIN `keterangan` ON `invoice`.`inv` = `keterangan`.`inv`
    JOIN `j-pendapatan` ON `invoice`.`inv` = `j-pendapatan`.`inv`
    {$where}
    ORDER BY `j-piutang`.`sisa` DESC";
    if (!$inv) {
      $this->SQL_result = $this->SQL->get_results($this->trim($sql));
    } else {
      $this->SQL_result = $this->SQL->get_row($this->trim($sql));
    }
    $this->lastSQL();

    return $this;
  }
}
/**SELECT
  `invoice`.*,
  `j-pendapatan`.`total` AS pendapatan_total,
  `j-piutang`.`total` AS piutang_total,
  `j-piutang`.`start` AS piutang_start,
  `j-piutang`.`end` AS piutang_end,
  `j-piutang`.`sisa` AS piutang_sisa,
  `keterangan`.`ket` AS keterangan
FROM
  `invoice`
JOIN `j-piutang` ON `invoice`.`inv` = `j-piutang`.`inv` AND `invoice`.`type` = 'piutang'
JOIN `keterangan` ON `invoice`.`inv` = `keterangan`.`inv`
JOIN `j-pendapatan` ON `invoice`.`inv` = `j-pendapatan`.`inv`
WHERE
  `j-piutang`.`inv` = '1'
ORDER BY
  `j-piutang`.`sisa`
DESC
 */

class uang
{
  /*
  Method call :
  uang::rupiah('10002323');
  output -> Sepuluh Juta Dua Ribu Tiga Ratus Dua Puluh Tiga
  uang::format('10002323');
  output -> Rp. 10.002.323,-
  */
  public static function format($nominal, $sign = 'Rp. ', $end = ',-', $presisi = 0)
  {
    return $sign . number_format($nominal, $presisi, ',', '.') . $end;
  }

  public static function format_no_sign($nominal, $end = ',-', $presisi = 0)
  {
    return number_format($nominal, $presisi, ',', '.') . $end;
  }

  public static function rupiah($nominal)
  {
    if (strpos($nominal, '.') > 0) {
      $nilai = static::konversi(strstr($nominal, '.', true));
      $koma = static::tkoma(strstr($nominal, '.'));
    } else {
      $nilai = static::konversi($nominal);
      $koma = '';
    }

    return $nilai . ' ' . $koma;
  }

  public static function konversi($number)
  {
    $number = str_replace('.', '', $number);
    if (!is_numeric($number)) {
      throw new NotNumbersException();
    }
    $base = ['Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
    $numeric = ['1000000000000000', '1000000000000', '1000000000000', 1000000000, 1000000, 1000, 100, 10, 1];
    $unit = ['Kuadriliun', 'Triliun', 'Biliun', 'Milyar', 'Juta', 'Ribu', 'Ratus', 'Puluh', ''];
    $str = null;
    $i = 0;
    if (0 == $number) {
      $str = 'nol';
    } else {
      while (0 != $number) {
        $count = (int) ($number / $numeric[$i]);
        if ($count >= 10) {
          $str .= static::konversi($count) . ' ' . $unit[$i] . ' ';
        } elseif ($count > 0 && $count < 10) {
          $str .= $base[$count] . ' ' . $unit[$i] . ' ';
        }
        $number -= $numeric[$i] * $count;
        ++$i;
      }
      $str = preg_replace('/Satu Puluh (\w+)/i', '\1 Belas', $str);
      $str = preg_replace('/Satu Ribu/', 'Seribu\1', $str);
      $str = preg_replace('/Satu Ratus/', 'Seratus\1', $str);
      $str = preg_replace('/Satu Puluh/', 'Sepuluh\1', $str);
      $str = preg_replace('/Satu Belas/', 'Sebelas\1', $str);
      $str = preg_replace('/\s{2,}/', ' ', trim($str));
    }

    return $str;
  }

  public static function tkoma($nominal)
  {
    $base = ['Nol', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];

    $temp = 'Koma';
    $pjg = strlen($nominal);
    $pos = 1;
    while ($pos < $pjg) {
      $x = substr($nominal, $pos, 1);
      ++$pos;
      $temp .= ' ' . $base[$x];
    }

    return $temp;
  }
}
