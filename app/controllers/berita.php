<?php

class Berita extends Controller
{
  protected $dbh;
  protected $db;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
    new Session();
  }

  public function index()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'berita';
    $data['semuaberita'] = $this->model('Berita_model')->semuaberita();
    $this->view('templates/header', $data);
    $this->view('berita/index', $data);
    $this->view('templates/footer');
  }

  // auto baca berita ketika icon notif di klik

  public function bacaberita()
  {
    $user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $user['username'];
    // cek
    $this->dbh->query("UPDATE users SET read_news = '0' WHERE username ='$username'");
    $this->dbh->execute();
    $hasil = $this->dbh->rowCount();

    if ($hasil > 0) {
      echo 'success';
    }
  }
}
