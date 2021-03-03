<?php

class Akun extends Controller
{
  protected $username;
  protected $db;
  protected $dbh;
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
    new Session();
  }

  public function index()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $user = $data['user']['username'];
    $data['title'] = 'Profile';
    // data api key
    $key = $data['user']['api_key'];
    $this->dbh->query("SELECT  count(*) FROM api WHERE api_key = '$key'");
    $this->dbh->execute();

    if ($this->dbh->hitungBaris2() > 0) {
      $dataapikey = $this->db->prepare("SELECT * FROM api WHERE api_key = '$key'");
      $dataapikey->execute();
      $data['apikey'] = $dataapikey->fetch();
    } else {
      $insert = $this->model('Akun_model')->insertapi($key, $user);
      if ($insert > 0) {
        $dataapikey = $this->db->prepare("SELECT * FROM api WHERE api_key = '$key'");
        $dataapikey->execute();
        $data['apikey'] = $dataapikey->fetch();
      }
    }

    // data pembelian
    $data['pembelianppob'] = $this->model('Akun_model')->pembelianppob($data['user']['username']);
    $data['totalpembelianppob'] = $this->model('Akun_model')->totalpembelianppob($data['user']['username']);
    $data['pembeliansosmed'] = $this->model('Akun_model')->pembeliansosmed($data['user']['username']);
    $data['totalpembeliansosmed'] = $this->model('Akun_model')->totalpembeliansosmed($data['user']['username']);
    // total seluruh penggunaan saldo
    $data['penggunaansaldo'] = $this->model('Akun_model')->penggunaansaldo($data['user']['username']);
    // data deposit
    $data['deposituser'] = $this->model('Akun_model')->deposituser($data['user']['username']);
    $data['totaldeposituser'] = $this->model('Akun_model')->totaldeposituser($data['user']['username']);
    $this->view('templates/header', $data);
    $this->view('akun/index', $data);
    $this->view('templates/footer');
  }

  public function mutasi()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Mutasi Saldo';
    $data['mutasiakun'] = $this->model('Akun_model')->mutasiakun($data['user']['username']);
    $this->view('templates/header', $data);
    $this->view('akun/mutasi', $data);
    $this->view('templates/footer');
  }

  // ajax ubah nama
  public function ubahnamadepan()
  {
    $nama_depan = htmlspecialchars(rtrim($_POST['namadepan']));
    $username = $_SESSION['user']['username'];

    $this->dbh->query("UPDATE users SET nama_depan = :nama_depan WHERE username = '$username'");
    $this->dbh->bind('nama_depan', $nama_depan);
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $this->model('Lainnya')->tambahakt('Ubah Nama Depan', $username);
      $_SESSION['hasil']['pesan'] = 'berhasil diubah ';
      echo ' <div class="alert alert-primary alert-dismissible fade show  mb-0" role="alert">
                Nama depan ' . $_SESSION['hasil']['pesan'] . ' menjadi ' . $nama_depan . '
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
    } else {
      echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
            Gagal ubah!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
    }
  }

  // ajax ubah nama belakang
  public function ubahnamabelakang()
  {
    $nama_belakang = htmlspecialchars(rtrim($_POST['namabelakang']));
    $username = $this->model('Home_model')->datauser($_SESSION['user']['username'])['username'];

    $this->dbh->query("UPDATE users SET nama_belakang = :nama_belakang WHERE username = '$username'");
    $this->dbh->bind('nama_belakang', $nama_belakang);
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $this->model('Lainnya')->tambahakt('Ubah Nama Belakang ', $username);
      $_SESSION['hasil']['pesan'] = 'berhasil diubah ';
      echo ' <div class="alert alert-primary alert-dismissible fade show  mb-0" role="alert">
                Nama belakang ' . $_SESSION['hasil']['pesan'] . ' menjadi ' . $nama_belakang . '
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
    } else {
      echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
            Gagal ubah!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
    }
  }

  // ajax ubah email
  public function ubahemail()
  {
    $email = htmlspecialchars(rtrim($_POST['email']));
    $username = $this->model('Home_model')->datauser($_SESSION['user']['username'])['username'];

    $this->dbh->query("SELECT count(*) FROM users WHERE email = '$email'");
    $this->dbh->execute();
    $cek_email = $this->dbh->hitungBaris2();

    if ($cek_email > 0) {
      $_SESSION['hasil']['pesan'] = 'Sudah ada yang menggunakan';
      echo ' <div class="alert alert-warning alert-dismissible fade show  mb-0" role="alert">
                Email tersebut  ' . $_SESSION['hasil']['pesan'] . '
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
    } else {
      $this->dbh->query("UPDATE users SET email = :email WHERE username = '$username'");
      $this->dbh->bind('email', $email);
      $this->dbh->execute();
      if ($this->dbh->rowCount() > 0) {
        $this->model('Lainnya')->tambahakt('Ubah Email', $username);
        $_SESSION['hasil']['pesan'] = 'berhasil diubah ';
        echo ' <div class="alert alert-primary alert-dismissible fade show  mb-0" role="alert">
                Email ' . $_SESSION['hasil']['pesan'] . ' menjadi ' . $email . '
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
      } else {
        echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
            Gagal ubah!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
      }
    }
  }

  // ajax nomor hp
  public function ubahno_hp()
  {
    $no_hp = $_POST['no_hp'];
    $username = $this->model('Home_model')->datauser($_SESSION['user']['username'])['username'];
    $this->dbh->query("SELECT count(*) FROM users WHERE no_hp = '$no_hp'");
    $this->dbh->execute();
    $cek_nomor = $this->dbh->hitungBaris2();

    if ($cek_nomor > 0) {
      $_SESSION['hasil']['pesan'] = 'Sudah ada yang menggunakan';
      echo ' <div class="alert alert-warning alert-dismissible fade show  mb-0" role="alert">
                Nomor HP  ' . $_SESSION['hasil']['pesan'] . '
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
    } else {
      $this->dbh->query("UPDATE users SET no_hp  = '$no_hp'  WHERE username = '$username'");
      $this->dbh->execute();
      if ($this->dbh->rowCount() > 0) {
        $this->model('Lainnya')->tambahakt('Ubah Nomor HP', $username);
        $_SESSION['hasil']['pesan'] = 'berhasil diubah ';
        echo ' <div class="alert alert-success alert-dismissible fade show  mb-0" role="alert">
                Nomor HP  ' . $_SESSION['hasil']['pesan'] . ' menjadi ' . $no_hp . '
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
      } else {
        echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
            Gagal ubah!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
      }
    }
  }

  /// cek kata sandi ( ganti kata sandi user)
  public function ceksandisaatini()
  {
    $katasandi = $_POST['sandisaatini'];
    $datauser = $this->model('Home_model')->datauser($_SESSION['user']['username']);

    $cek_sandi = password_verify($katasandi, $datauser['password']);
    if (true == $cek_sandi) {
      echo '<small class="form-text text-success datahasil" data-hasil="success"><i class="simple-icon-check
            "></i>  Sip, Sandi benar!</small>';
    } else {
      echo '<small class="form-text text-danger datahasil" data-hasil="gagal"><i class="simple-icon-exclamation
            "></i>  Kata Sandi Salah!</small>';
    }
  }

  // ubah kata sandi
  public function ubahkatasandi()
  {
    $datauser = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $datauser['username'];
    $sandibaru = $_POST['sandibaru'];
    $hash_sandi = password_hash($sandibaru, PASSWORD_DEFAULT);
    $this->dbh->query("UPDATE users SET password  = '$hash_sandi'  WHERE username = '$username'");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $this->model('Lainnya')->tambahakt('Ubah Kata Sandi', $username);
      $_SESSION['hasil']['pesan'] = 'Berhasil Diubah';
      echo ' <div class="alert alert-success alert-dismissible fade show  mb-0" role="alert">
                Kata Sandi Berhasil Diubah
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
      unset($_SESSION['user']);
    } else {
      echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
            Gagal ubah kata sandi!
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>';
    }
  }

  // get api key random
  public function ubahapikey()
  {
    $api_baru = acak(30);
    $username = $this->model('Home_model')->datauser($_SESSION['user']['username'])['username'];

    $this->dbh->query("UPDATE users SET api_key = '$api_baru' WHERE username = '$username'");
    $this->dbh->execute();
    $update2 = $this->db->prepare("UPDATE api SET api_key = '$api_baru' WHERE user = '$username'");
    $update2->execute();

    if ($this->dbh->rowCount() > 0 && $update2->rowCount() > 0) {
      $this->model('Lainnya')->tambahakt('Ubah Api Key', $username);
      echo '<small class="form-text text-success datahasilalert" data-hasil="success" data-api="' . $api_baru . '"><i class="simple-icon-check
            "></i> Api key berhasil di ubah</small>';
    } else {
      echo '<small class="form-text text-success datahasilalert" data-hasil="success"><i class="simple-icon-check
            "></i> Api key berhasil di ubah</small>';
    }
  }

  public function aktifitas()
  {
    $username = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Aktifitas';
    $data['aktifitas'] = $this->model('Akun_model')->aktifitasakun($data['user']['username']);

    $this->view('templates/header', $data);
    $this->view('akun/aktifitas', $data);
    $this->view('templates/footer');
  }

  public function ubahipkey()
  {
    error_reporting(0);
    $username = $_SESSION['user']['username'];
    $key = $_POST['key'];

    $ipnew = $_POST['ipnew'];
    $cekapi = $this->db->prepare("SELECT * FROM api WHERE api_key = '$key' ");
    $cekapi->execute();
    $this->dbh->query("UPDATE api SET ip = '$ipnew' WHERE api_key = '$key'");
    $this->dbh->execute();
    $update = $this->dbh->rowCount();

    if ($update > 0) {
      $this->model('Lainnya')->tambahakt('Ubah IP Key', $username);
      echo '<small class="form-text text-success datahasilalert" data-hasil="success" data-IP="' . $ipnew . '"><i class="simple-icon-check
            "></i> Alamat IP  berhasil di ubah</small>';
    } else {
      echo '<small class="form-text text-danger datahasilalert" data-hasil="success"><i class="simple-icon-check
            "></i> IP key Gagal di ubah</small>';
    }
  }

  public function ubahstatuskey()
  {
    $username = $_SESSION['user']['username'];
    $key = $_POST['key'];
    $newstatus = $_POST['newstatus'];
    $this->dbh->query("UPDATE api SET status = '$newstatus' WHERE api_key = '$key'");
    $this->dbh->execute();

    if ($this->dbh->rowCount() > 0) {
      $this->model('Lainnya')->tambahakt('Ubah IP Key', $username);
      echo '<small class="form-text text-success datahasilalert" data-hasil="success" data-IP="' . $newstatus . '"><i class="simple-icon-check
            "></i> Status IP  berhasil di ubah</small>';
    } else {
      echo '<small class="form-text text-danger datahasilalert" data-hasil="success"><i class="simple-icon-check
            "></i> Status IP Gagal di ubah</small>';
    }
  }

  public function ubahpin()
  {
    $newpin = $_POST['newpin'];
    $username = $_SESSION['user']['username'];

    $ubah = $this->model('Akun_model')->ubahpin($newpin, $username);
    if ($ubah > 0) {
      echo 'true';
    } else {
      echo 'false';
    }
  }
}
