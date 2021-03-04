<?php

class Auth_model
{
  protected $db;
  protected $dbh;
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
  }

  public function login($data)
  {
    $username = htmlspecialchars(rtrim($data['username']));
    $password = $data['password'];

    $this->dbh->query('SELECT * FROM users WHERE username = :username OR email = :username');
    $this->dbh->bind('username', $username);
    $this->dbh->bind('email', $username);
    $cek_user = $this->dbh->single();

    if (is_array($cek_user)) {
      return $cek_user;
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Kesalahan system, periksa lagi username atau password anda!',
      ];
      exit(header('Location:' . BASEURL));
    }
  }

  public function cekusername($datanya)
  {
    $this->dbh->query("SELECT count(*) FROM users WHERE username = '$datanya' ");
    $this->dbh->execute();

    return $this->dbh->hitungBaris2();
  }

  public function cekemail($email)
  {
    $this->dbh->query("SELECT count(*) FROM users WHERE email = '$email' ");
    $this->dbh->execute();

    return $this->dbh->hitungBaris2();
  }

  public function ceknomorhp($no)
  {
    $this->dbh->query("SELECT count(*) FROM users WHERE no_hp = '$no' ");
    $this->dbh->execute();

    return $this->dbh->hitungBaris2();
  }
}
