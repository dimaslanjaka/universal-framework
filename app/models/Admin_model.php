<?php

class Admin_model
{
  protected $db;
  protected $dbh;
  protected $date = DATE;
  protected $time = TIME;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
  }

  // DASHBOARDDD
  // total user
  public function totaluser()
  {
    $this->dbh->query('SELECT count(*) FROM users  ORDER BY id ASC');

    return $this->dbh->hitungBaris2();
  }

  public function countsaldousers()
  {
    $this->dbh->query('SELECT SUM(saldo_top_up) AS total FROM users ');

    return $this->dbh->single();
  }

  // semua pesanan pending
  public function allorderspending()
  {
    $this->dbh->query("SELECT count(*) FROM semua_pembelian WHERE status = 'Pending' ORDER BY id DESC");

    return $this->dbh->hitungBaris2();
  }

  public function countorderspending()
  {
    $this->dbh->query("SELECT SUM(harga) AS total FROM semua_pembelian WHERE status = 'Pending'");

    return $this->dbh->single();
  }

  // semua pesanan success
  public function allorderssuccess()
  {
    $this->dbh->query("SELECT count(*) FROM semua_pembelian WHERE status = 'Success' ORDER BY id DESC");

    return $this->dbh->hitungBaris2();
  }

  public function countorderssuccess()
  {
    $this->dbh->query("SELECT SUM(harga) AS total FROM semua_pembelian WHERE status = 'Success'");

    return $this->dbh->single();
  }

  // semua deposit success
  public function alldepositsuccess()
  {
    $this->dbh->query('SELECT count(*) FROM deposit ORDER BY id DESC');

    return $this->dbh->hitungBaris2();
  }

  public function countdepositsuccess()
  {
    $this->dbh->query('SELECT SUM(jumlah_transfer) AS total FROM deposit');

    return $this->dbh->single();
  }

  // array semua deposit
  public function alldeposit()
  {
    $this->dbh->query('SELECT * FROM deposit ORDER BY id DESC');

    return $this->dbh->resultSet();
  }

  // aktifitas user

  public function aktifitasuser()
  {
    $date = $this->date;
    $this->dbh->query("SELECT * FROM aktifitas WHERE DATE = '$date' ORDER BY id DESC");

    return $this->dbh->resultSet();
  }

  /// kelola pengguna
  // allusers
  public function allusers()
  {
    $this->dbh->query('SELECT * FROM users  ORDER BY id ASC');
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  /// update user
  public function updateuser($data)
  {
    $id = $data['id'];
    $email = $data['email'];
    $no_hp = $data['no_hp'];
    $username = $data['username'];
    if ('' == $data['password']) {
      $iduser = $data['id'];
      $this->dbh->query("SELECT * FROM users WHERE id = '$iduser'");
      $datauser = $this->dbh->single();
      $password = $datauser['password'];
    } else {
      $pass = $data['password'];
      $password = password_hash($pass, PASSWORD_DEFAULT);
    }
    $saldo = $data['saldo_top_up'];
    $level = $data['level'];
    $status = $data['status_akun'];
    $pin = $data['pin'];

    $update = $this->db->prepare("UPDATE users SET email = '$email', no_hp = '$no_hp', username = '$username', password = '$password',  saldo_top_up = '$saldo' , level = '$level', status = '$status', pin = '$pin' WHERE id = '$id'");
    $update->execute();

    return $update->rowCount();
  }

  /// sampai sini kelola pengguna

  // kelola pesanan ppob
  // orderan ppob
  public function allordersppob()
  {
    $this->dbh->query('SELECT count(*) FROM pembelian_pulsa ');

    return $this->dbh->hitungBaris2();
  }

  public function countordersppob()
  {
    $this->dbh->query('SELECT SUM(harga) AS total FROM pembelian_pulsa ');

    return $this->dbh->single();
  }

  public function arrayordersppob()
  {
    $this->dbh->query('SELECT * FROM pembelian_pulsa ORDER BY id ASC');

    return $this->dbh->resultSet();
  }

  // orderan sosmed
  public function arrayorderssosmed()
  {
    $this->dbh->query('SELECT * FROM pembelian_sosmed ORDER BY id ASC');

    return $this->dbh->resultSet();
  }

  public function allorderssosmed()
  {
    $this->dbh->query('SELECT count(*) FROM pembelian_sosmed');

    return $this->dbh->hitungBaris2();
  }

  public function countorderssosmed()
  {
    $this->dbh->query('SELECT SUM(harga) AS total FROM pembelian_sosmed');

    return $this->dbh->single();
  }

  // sampai sini kelola orderan

  //  kelola berita
  public function allnews()
  {
    $this->dbh->query('SELECT * FROM berita ORDER BY id DESC');

    return $this->dbh->resultSet();
  }

  public function updatenews($data)
  {
    $id = $data['id'];
    $kategori = $data['kategori'];
    $tipe = $data['tipe'];
    $title = $data['title'];
    $konten = $data['konten'];

    $update = $this->db->prepare("UPDATE berita SET icon = '$kategori', title = '$title', tipe = '$tipe', konten = '$konten' WHERE id = '$id'");
    $update->execute();

    return $update->rowCount();
  }

  public function editusernoread()
  {
    $this->dbh->query("UPDATE users SET read_news = '1' ");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  // sampaisini kelolaberita

  // KELOLA FAQ
  public function allfaqs()
  {
    $this->dbh->query('SELECT * FROM pertanyaan_umum ORDER BY id DESC');

    return $this->dbh->resultSet();
  }

  // SAMPAI SINI KELOLA FAQ
  // all admin
  public function alladmins()
  {
    $this->dbh->query('SELECT * FROM kontak_admin ORDER BY id DESC');

    return $this->dbh->resultSet();
  }

  public function addadmin($data)
  {
    $nama = filter($data['nama']);

    $jabatan = $data['jabatan'];
    $deskripsi = filter($data['deskripsi']);
    $lokasi = filter($data['lokasi']);
    $jam_kerja = filter($data['jam_kerja']);
    $email = filter($data['email']);
    $no_hp = filter($data['no_hp']);
    $link_fb = filter($data['link_fb']);
    $link_ig = filter($data['link_ig']);

    $this->dbh->query("INSERT INTO kontak_admin VALUES ('', :nama, :jabatan, :deskripsi, :lokasi, :jam_kerja, :email, :no_hp, :link_fb, :link_ig)");
    $this->dbh->bind('nama', $nama);
    $this->dbh->bind('jabatan', $jabatan);
    $this->dbh->bind('deskripsi', $deskripsi);
    $this->dbh->bind('lokasi', $lokasi);
    $this->dbh->bind('jam_kerja', $jam_kerja);
    $this->dbh->bind('email', $email);
    $this->dbh->bind('no_hp', $no_hp);
    $this->dbh->bind('link_fb', $link_fb);
    $this->dbh->bind('link_ig', $link_ig);
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  public function updateadmin($data)
  {
    $id = $data['id'];
    $nama = filter($data['nama']);
    $jabatan = $data['jabatan'];
    $deskripsi = filter($data['deskripsi']);
    $lokasi = filter($data['lokasi']);
    $jam_kerja = filter($data['jam_kerja']);
    $email = filter($data['email']);
    $no_hp = filter($data['no_hp']);
    $link_fb = filter($data['link_fb']);
    $link_ig = filter($data['link_ig']);

    $this->dbh->query("UPDATE kontak_admin SET nama = '$nama', jabatan = '$jabatan', deskripsi = '$deskripsi', lokasi = '$lokasi', jam_kerja = '$jam_kerja', email = '$email', no_hp = '$no_hp', link_fb = '$link_fb', link_ig = '$link_ig' WHERE id = '$id'");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  // sampai sini kelola admin

  // kelola layanan
  public function allcategory()
  {
    $this->dbh->query('SELECT * FROM kategori_layanan ORDER BY id ASC');

    return $this->dbh->resultSet();
  }

  public function allservicesppob()
  {
    $this->dbh->query('SELECT * FROM layanan_pulsa ORDER BY id DESC');

    return $this->dbh->resultSet();
  }

  public function addserviceppob($data)
  {
    $sid = filter($_POST['sid']);
    $pid = trim($_POST['pid']);
    $tipe = trim($_POST['tipe']);
    $operator = trim($_POST['operator']);
    $layanan = $_POST['layanan'];
    $deskripsi = $_POST['deskripsi'];
    $harga = $_POST['harga'];
    $harga_api = $_POST['harga_api'];
    $status = trim($_POST['status']);
    $provider = trim($_POST['provider']);

    $this->dbh->query("INSERT INTO layanan_pulsa VALUES ('', '$sid', '$pid', '$operator', '$layanan', '$deskripsi', '$harga', '$harga_api', '$status', '$provider', '$tipe', 'TOP UP')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  public function submiteditserviceppob($data)
  {
    $sid = filter($data['sid']);
    $pid = trim($data['pid']);
    $tipe = trim($data['provider']);
    $operator = trim($data['operator']);
    $layanan = $data['layanan'];
    $deskripsi = $data['deskripsi'];
    $harga = $data['harga'];
    $harga_api = $data['harga_api'];
    $status = trim($data['status']);
    $provider = trim($data['provider']);

    $this->dbh->query("UPDATE layanan_pulsa SET service_id = '$sid', provider_id = '$pid', operator = '$operator', layanan = '$layanan', deskripsi = '$deskripsi', harga = '$harga', harga_api = '$harga_api', status = '$status', provider_id = '$pid', provider = '$provider', tipe = '$tipe' WHERE service_id = '$sid'");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  public function allservicessosmed()
  {
    $this->dbh->query('SELECT * FROM layanan_sosmed ORDER BY id DESC');

    return $this->dbh->resultSet();
  }

  public function addservicesosmed($data)
  {
    $sid = filter($data['sid']);
    $pid = trim($data['pid']);
    $kategori = trim($data['kategori']);
    $layanan = $data['layanan'];
    $catatan = trim($data['catatan']);
    $min = trim($data['min']);
    $max = trim($data['max']);
    $harga = $data['harga'];
    $harga_api = $data['harga_api'];
    $status = trim($data['status']);
    $provider = trim($data['provider']);

    $this->dbh->query("INSERT INTO layanan_sosmed VALUES ('', '$sid', '$kategori', '$layanan', '$catatan', '$min', '$max', '$harga', '$harga_api', '$status', '$pid', '$provider', 'SOSIAL MEDIA')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  //sampai sini kelolalayanan

  // halaman mutasi saldo
  public function allmutasi()
  {
    $this->dbh->query('SELECT * FROM mutasi ORDER BY id ASC');
    $this->dbh->execute();
    $data = $this->dbh->resultSet();

    return $data;
  }

  // sampai sini halaman mutasi saldo

  // halaman metode deposit
  public function allmetodedeposit()
  {
    $this->dbh->query('SELECT * FROM metode_depo ORDER BY id DESC');
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  public function addmetodedeposit($data)
  {
    $provider = trim($data['provider']);
    $catatan = trim($data['catatan']);
    $rate = $data['rate'];
    $nama_penerima = $data['nama_penerima'];
    $tujuan = $data['tujuan'];
    $tipe = $data['tipe'];
    $minimal = $data['minimal'];
    $status = $data['status'];

    $this->dbh->query("INSERT INTO metode_depo VALUES ('', '$provider', '$catatan', '$rate', '$nama_penerima', '$tujuan', '$tipe', '$minimal', '$status')");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  public function submiteditdeposit($data)
  {
    $post_id = $data['id'];
    $provider = trim($data['provider']);
    $catatan = trim($data['catatan']);
    $rate = $data['rate'];
    $nama_penerima = $data['nama_penerima'];
    $tujuan = $data['tujuan'];
    $tipe = $data['tipe'];
    $minimal = $data['minimal'];
    $status = $data['status'];

    $this->dbh->query("UPDATE metode_depo SET provider = '$provider', catatan = '$catatan', rate = '$rate', tujuan = '$tujuan', nama_penerima = '$nama_penerima', tipe = '$tipe', minimal = '$minimal', status = '$status' WHERE id = '$post_id'");
    $this->dbh->execute();

    return $this->dbh->rowCount();
  }

  // sampai sini halaman metode deposit

  // untuk haalaman pengaturan akaun ovo, bca, dan metode deposit lainnya
  //ovo
  public function accountovo()
  {
    $this->dbh->query("SELECT * FROM ovo WHERE id = 'S1'");
    $this->dbh->execute();

    return $this->dbh->single();
  }

  public function mutasiovo()
  {
    $this->dbh->query('SELECT * FROM mutasi_ovo ORDER BY id DESC');
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  // bank bca
  public function accountbank()
  {
    $this->dbh->query("SELECT * FROM bca WHERE id = 'S1'");
    $this->dbh->execute();

    return $this->dbh->single();
  }

  public function mutasibca()
  {
    $this->dbh->query('SELECT * FROM mutasi_bank ORDER BY id DESC');
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  // gopay
  public function accountgopay()
  {
    $this->dbh->query("SELECT * FROM gopay WHERE id = 'S1'");
    $this->dbh->execute();

    return $this->dbh->single();
  }

  public function mutasigopay()
  {
    $this->dbh->query('SELECT * FROM mutasi_gopay ORDER BY id DESC');
    $this->dbh->execute();

    return $this->dbh->resultSet();
  }

  // untuk haalaman pengaturan akaun ovo, bca, dan metode deposit lainnya , sampai sini

  // ini untuk halaman provider & layanan provider
  public function updateprovider($data)
  {
    $code = filter($data['code']);
    $link = filter($data['link']);
    $link_service = filter($data['link_service']);
    $api_key = filter($data['apikey']);
    $api_id = filter($data['apiid']);
    $provider = $data['jenis'];
    if ('sosmed' == $provider) {
      $provider = 'provider';
    } elseif ('PPOB' == $provider) {
      $provider = 'provider_pulsa';
    }

    $update = $this->db->prepare("UPDATE $provider SET code = '$code', link = '$link', link_service = '$link_service', api_key = '$api_key', api_id = '$api_id'");
    $update->execute();

    return $update->rowCount();
  }

  // sampai sini halaman provider & layanan provider
}
