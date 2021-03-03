<?php

class Lainnya
{
  protected $dbh;
  protected $db;
  protected $date = DATE;
  protected $time = TIME;
  public $username;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
  }

  // tambah aktifitas
  public function tambahakt($aksi, $username)
  {
    $ip = get_client_ip();
    $username = $_SESSION['user']['username'];
    $this->dbh->query("INSERT INTO aktifitas VALUES('','$username','$aksi','$ip','$this->date','$this->time')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  // tambah riwayatsaldo
  public function riwayatsaldo($aksi, $nominal, $pesan, $username = 'ya')
  {
    if ('ya' == $username) {
      $username = $_SESSION['user']['username'];
    }
    $this->dbh->query("INSERT INTO riwayat_saldo_koin VALUES('','$username','Saldo','$aksi','$nominal','$pesan','$this->date','$this->time')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  public function riwayatsaldo2($aksi, $nominal, $pesan, $username)
  {
    $this->dbh->query("INSERT INTO riwayat_saldo_koin VALUES('','$username','Saldo','$aksi','$nominal','$pesan','$this->date','$this->time')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  // top deposittttt
  //insert top deposit

  public function cek_topdepo($username)
  {
    $this->dbh->query("SELECT count(*) FROM top_depo WHERE username = '$username'");
    $this->dbh->execute();

    return $this->dbh->hitungBaris2();
  }

  public function masuk_topdepo($username, $nominal)
  {
    $this->dbh->query("INSERT INTO top_depo VALUES('','Deposit','$username','$nominal','1')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  public function ubah_topdepo($username, $nominal, $total)
  {
    $this->dbh->query("UPDATE top_depo SET jumlah = '$nominal' , total = '$total' WHERE username = '$username'");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  // fetchtop deposit
  public function fetch_topdepo($username)
  {
    $this->dbh->query("SELECT * FROM top_depo WHERE username = '$username'");
    $this->dbh->execute();

    return $this->dbh->single();
  }

  // top deposittttt sampai siniii

  // halaman tarik saldo
  // get nama bank

  public function getnamabank()
  {
    $datagopay = $this->db->prepare("SELECT * FROM gopay WHERE id ='S1'");
    $datagopay->execute();
    $datagopay = $datagopay->fetch();

    $gopay = new GojekPay($datagopay['token']);

    return json_decode($gopay->getBankList(), true);
  }

  public function getinfonamebank($data)
  {
    $norekening = filter($data['norekening']);
    $namabank = filter($data['namabank']);
    $nominal = filter($data['nominal']);
    $pin = filter($data['pin']);
    $datagopay = $this->db->prepare("SELECT * FROM gopay WHERE id ='S1'");
    $datagopay->execute();
    $datagopay = $datagopay->fetch();

    $gopay = new GojekPay($datagopay['token']);

    return $gopay->getBankAccountName($namabank, $norekening);
  }

  public function transferbank($kode, $tujuan, $jumlah, $pin)
  {
    $datagopay = $this->db->prepare("SELECT * FROM gopay WHERE id ='S1'");
    $datagopay->execute();
    $datagopay = $datagopay->fetch();

    $gopay = new GojekPay($datagopay['token']);

    return json_decode($gopay->transferBank($kode, $tujuan, $jumlah, $pin), true);
  }

  // bagia hook , whatsapp
  public function info($nomor)
  {
    $this->dbh->query("SELECT * FROM users WHERE no_hp = '$nomor' ");
    $this->dbh->execute();
    $data = $this->dbh->single();

    return $data;
  }
}
