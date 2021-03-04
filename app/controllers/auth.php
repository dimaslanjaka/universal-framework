<?php

class Auth extends Controller
{


  public function __construct()
  {
    $this->dbh = new Database();

    $this->db = $this->dbh->connect();
  }

  public function index()
  {
    if (isset($_SESSION['user'])) {
      header('Location:' . BASEURL . 'home');

      die;
    } else {
      $data['title'] = 'Login ' . WEB_NAME;

      $this->view('templates/header_auth', $data);

      $this->view('auth/index');

      $this->view('templates/footer_auth');
    }
  }

  public function register()
  {
    $data['title'] = 'Daftar ' . WEB_NAME;

    $this->view('templates/header_auth', $data);

    $this->view('auth/register');

    $this->view('templates/footer_auth');
  }

  public function login()
  {
    $sendwa = new Menzwa();
    $data_user = $this->model('Auth_model')->login($_POST);

    $nohp = $data_user['no_hp'];

    $verif_password = password_verify($_POST['password'], $data_user['password']);

    if ($verif_password != $data_user['password']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Username Atau password salah!',
      ];

      exit(header('Location:' . BASEURL));
    } elseif ('Suspended' == $data_user['status']) {
      $_SESSION['hasil'] = [
        'alert' => 'dahger',

        'pesan' => 'Akun anda telah di suspend!',
      ];

      exit(header('Location:' . BASEURL));
    } elseif ('Belum Verifikasi' == $data_user['status_akun']) {
      $_SESSION['hasil'] = [
        'alert' => 'warning',

        'pesan' => 'Akun kamu belum di verifikasi, silahkan di verifikasi terlebih dahulu!',
      ];

      exit(header('Location:' . BASEURL));
    } else {
      $_SESSION['user'] = $data_user;

      $ip = get_client_ip();

      $msg = 'Akun anda telah login di M pedia dengan IP ->' . $ip . 'Jika bukan anda, Silahkan amankan akun anda di pengaturan M PEDIA.';

      $sendwa->sendMessage($nohp, $msg);

      $this->model('Lainnya')->tambahakt('Masuk', $_SESSION['user']['username']);

      header('Location:' . BASEURL . 'home');
    }
  }

  public function submitreg()
  {
    $date = DATE;

    $time = TIME;

    $namadepan = rtrim(filter($_POST['nama_depan']));

    $namabelakang = rtrim(filter($_POST['nama_belakang']));

    $email = rtrim(filter($_POST['email']));

    $no_hp = rtrim(filter($_POST['no_hp']));

    $username = rtrim(filter($_POST['username']));

    $konfirmasipassword = rtrim(filter($_POST['konfirmasipassword']));

    $password = rtrim(filter($_POST['password']));

    $pin = rtrim(filter($_POST['pin']));

    $refferal = rtrim(filter($_POST['refferal']));

    if (strlen($username) < 5) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Username Minimal 5 karakter',
      ];
    } elseif ($this->model('Auth_model')->cekusername($username) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Nama Pengguna Sudah Terdaftar',
      ];
    } elseif ($this->model('Auth_model')->cekemail($email) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Email sudah terdaftar',
      ];
    } elseif (!preg_match('/628/', $no_hp)) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Format Nomor HP Harus 62',
      ];
    } elseif ($this->model('Auth_model')->ceknomorhp($no_hp) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Nomor HP Sudah Terdaftar',
      ];
    } elseif ($password != $konfirmasipassword) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Konfirmasi Password Tidak Sesuai',
      ];
    } elseif (strlen($password) < 6) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Minimal password 6 karakter',
      ];
    } elseif (6 != strlen($pin)) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Pin harus ^ digit',
      ];
    } else {
      $namalengkap = $namadepan . ' ' . $namabelakang;

      $api_key = acak(32);

      $hash_password = password_hash($password, PASSWORD_DEFAULT);

      $this->dbh->query("INSERT INTO users VALUES ('', :namadepan, :namabelakang, :namalengkap, :email, :username, :hash_password, '0', '0', 'Member',  'Active', 'Belum Verifikasi', :pin, :api_key, 'Kode', 'Free reg', '$date', '$time', '0', :no_hp, '', :refferal, '', '1')");

      // bind mencegah sql injection

      $this->dbh->bind('namadepan', $namadepan);

      $this->dbh->bind('namabelakang', $namabelakang);

      $this->dbh->bind('namalengkap', $namalengkap);

      $this->dbh->bind('email', $email);

      $this->dbh->bind('username', $username);

      $this->dbh->bind('hash_password', $hash_password);

      $this->dbh->bind('pin', $pin);

      $this->dbh->bind('api_key', $api_key);

      $this->dbh->bind('no_hp', $no_hp);

      $this->dbh->bind('refferal', $refferal);

      ////

      $this->dbh->execute();

      if ($this->dbh->rowCount() > 0) {
        $kirimemail = $this->model('sendmail')->verif_akun($namalengkap, $hash_password, $email, $username);

        $_SESSION['hasil'] = [
          'alert' => 'info',

          'pesan' => 'Kami telah mengirimkan Link verifikasi ke email kamu, silahkan cek Inbox/spam.',
        ];
      }
    }

    header('Location:' . BASEURL . 'auth/register');
  }

  public function logout()
  {
    $this->model('Lainnya')->tambahakt('Keluar', $_SESSION['user']['username']);

    session_destroy();

    exit(header('Location:' . BASEURL));
  }

  public function resetpassword()
  {
    $data['title'] = 'Reset password ' . WEB_NAME;

    $this->view('templates/header_auth', $data);

    $this->view('auth/resetpass');

    $this->view('templates/footer_auth');
  }

  public function cekemail()
  {
    $email = $_POST['email'];

    $cekemail = $this->model('Auth_model')->cekemail($email);

    if ($cekemail > 0) {
      $random_kode = acak(50);

      $cekuser = $this->db->prepare("SELECT * FROM users WHERE email = '$email'");

      $cekuser->execute();

      $datauser = $cekuser->fetch();

      $namalengkap = $datauser['nama_depan'] . ' ' . $datauser['nama_belakang'];

      $this->dbh->query("UPDATE users SET random_kode = '$random_kode' WHERE email = '$email'");

      $this->dbh->execute();

      if ($this->dbh->rowCount() > 0) {
        $kirimemail = $this->model('sendmail')->forgotpassword($namalengkap, $random_kode, $email);

        if (true == $kirimemail) {
          echo 'true';
        }
      } else {
        echo 'gagal';
      }
    } else {
      echo 'false';
    }
  }

  public function ubahpassreset($random_kode)
  {
    $cek_user = $this->db->prepare("SELECT * FROM users WHERE random_kode = '$random_kode'");

    $cek_user->execute();

    $data_user = $cek_user->fetch();

    if (is_array($data_user)) {
      $data['title'] = 'Reset Password';

      $data['username'] = $data_user['username'];

      $data['randomkode'] = $random_kode;

      $this->view('templates/header_auth', $data);

      $this->view('auth/ubah_password', $data);

      $this->view('templates/footer_auth');
    } else {
      $data['nomorerror'] = '404';

      $data['pesanerror'] = 'Halaman tidak di temukan/sudah pernah dipakai';

      $this->view('error/index', $data);
    }
  }

  public function ubah_password()
  {
    $password = $_POST['newpassword'];

    $password2 = $_POST['confirmnewpassword'];

    $username = $_POST['username'];

    $kode = $_POST['randomkode'];

    if (strlen($password) < 6) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Password Minimal 6 karakter',
      ];

      header('Location:' . BASEURL . 'auth/ubahpassreset/' . $kode);
    } elseif ($password != $password2) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',

        'pesan' => 'Password Dan Konfirmasi password harus sesuai',
      ];

      header('Location:' . BASEURL . 'auth/ubahpassreset/' . $kode);
    } else {
      $hash = password_hash($password, PASSWORD_DEFAULT);

      $this->dbh->query("UPDATE users SET password = :password , random_kode = 'null' WHERE username = '$username'");

      $this->dbh->bind('password', $hash);

      $this->dbh->execute();

      if ($this->dbh->rowCount() > 0) {
        $data_user = $this->model('Home_model')->datauser($username);

        $_SESSION['user'] = $data_user;

        $_SESSION['hasil'] = [
          'alert' => 'success',

          'pesan' => 'Ubah Kata Sandi berhasil.',
        ];

        header('Location:' . BASEURL . 'home');
      }
    }
  }

  public function verifakun($user, $hash)
  {
    $sendwa = new Menzwa();

    $this->dbh->query("SELECT * FROM users WHERE username = '$user' ");

    $this->dbh->execute();

    $data_user = $this->dbh->single();

    $nohp = $data_user['no_hp'];

    if (is_array($data_user)) {
      $update = $this->db->prepare("UPDATE users SET status_akun = 'Sudah Verifikasi' WHERE username = '$user'");

      $update->execute();

      if ($update->rowCount() > 0) {
        $msg = 'Terimakasih telah mendaftar di M PEDIA,Akunmu berhasil di verifikasi';

        $sendwa->sendMessage($nohp, $msg);

        $_SESSION['hasil'] = [
          'alert' => 'success',

          'pesan' => 'Sip, Akunmu berhasil di verifikasi!',
        ];

        $_SESSION['user'] = $data_user;

        header('Location:' . BASEURL . 'home');
      }
    } else {
      $data['nomorerror'] = '404';

      $data['pesanerror'] = 'Akun tersebut tidak di temukan, coba daftar ulang,atau hubungi admin yaa';

      $data['title'] = 'error';

      $this->view('error/index', $data);
    }
  }
}
