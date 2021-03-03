<?php

class Deposit_model
{
  protected $dbh;
  protected $db;
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
  }

  public function datadeposit($id_depo)
  {
    $ha = $this->dbh->query("SELECT * FROM deposit WHERE kode_deposit = '$id_depo'");

    return $this->dbh->single();
  }

  /// konfirmasi deposit
  //baca mutasi
  public function bacamutasi($kode, $nominal)
  {
    $username = $_SESSION['user']['username'];

    $this->dbh->query("SELECT * FROM mutasi WHERE username = '$username' AND kode_deposit = '$kode' AND jumlah = '$nominal'");
    $this->dbh->execute();

    return $this->dbh->single();
  }

  // update saldo
  public function tambahsaldo($jumlahsaldo, $username)
  {
    $query = $this->db->prepare("UPDATE users SET saldo_top_up = '$jumlahsaldo' WHERE username ='$username' ");
    $query->execute();

    return $query->rowCount();
  }

  // ubah status deposit
  public function ubahdeposit($kode)
  {
    $query = $this->db->prepare("UPDATE deposit SET status = 'Success' WHERE kode_deposit = '$kode'");
    $query->execute();

    return $query->rowCount();
  }

  // ubah status mutasi
  public function ubahmutasi($kode)
  {
    $query = $this->db->prepare("UPDATE mutasi SET status = 'DONE' WHERE kode_deposit = '$kode'");
    $query->execute();

    return $query->rowCount();
  }

  // ambil riwayat deposit ( user)
  public function riwayatdeposit($username)
  {
    $this->dbh->query("SELECT * FROM deposit WHERE username = '$username' ORDER BY id DESC");
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  // riwayat redem
  public function riwayatredem($username)
  {
    $this->dbh->query("SELECT * FROM kode_voucher WHERE user_redem = '$username' AND status = 'Nonaktif' ORDER BY id DESC");
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  // riwayat transfer saldo
  public function riwayattransfer($user)
  {
    $this->dbh->query("SELECT * FROM riwayat_transfer WHERE pengirim = '$user'");
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }
}
