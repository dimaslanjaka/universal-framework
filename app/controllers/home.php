<?php

class Home extends Controller
{
  protected $dbh;
  protected $db;
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->db = new Database();
    $this->dbh = $this->db->connect();
    new Session();
  }

  public function index()
  {
    $data['catsosmed'] = $this->model('Home_model')->categorysosmed();
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Dashboard';
    $data['pembelian'] = $this->model('Home_model')->pesananTerakhir($_SESSION['user']['username']);
    $data['metodedeposit'] = $this->model('Home_model')->metodedeposit();
    $this->view('templates/header', $data);
    $this->view('home/index', $data);
    $this->view('templates/footer');
  }

  public function orderpulsa()
  {
    $kategori = $_POST['kategori'];
    $operator = $_POST['operator'];

    $this->db->query("SELECT * FROM layanan_pulsa WHERE kategori = '$kategori'  AND operator = '$operator' AND tipe = 'Pulsa' ORDER BY harga ASC");
    $this->db->execute();
    $data = $this->db->resultSet();

    foreach ($data as $datanya) {
      echo '<button type="button" class="btn btn-outline-info btn-block mb-1 mr-2 mt-3">
            <input type="radio" value="' . $datanya['service_id'] . '" name="layanan"  required>' . $datanya['layanan'] . '<span class="text-danger text-small"><br>*' . $datanya['deskripsi'] . '</span><br>
            <span class="text-dark">Harga RP : ' . $datanya['harga'] . '</span>
        </button>';
    }
  }

  public function orderdata()
  {
    $kategori = $_POST['kategori'];
    $operator = $_POST['operator'];
    $this->db->query("SELECT * FROM layanan_pulsa WHERE kategori = '$kategori' AND tipe ='Data' AND operator = '$operator' ORDER BY harga ASC");
    $this->db->execute();
    $data = $this->db->resultSet();
    foreach ($data as $datanya) {
      echo '<button type="button" class="btn btn-outline-info btn-block mb-1 mr-2 mt-3">
            <input type="radio" value="' . $datanya['service_id'] . '" name="layanan"  required>' . $datanya['layanan'] . '<span class="text-danger text-small"><br>*' . $datanya['deskripsi'] . '</span><br>
            <span class="text-dark">Harga RP : ' . $datanya['harga'] . '</span>
        </button>';
    }
  }

  public function kategoripulsadata()
  {
    $operator = $_POST['operator'];
    $jenis = $_POST['jenis'];
    $this->db->query("SELECT * FROM kategori_lainnya WHERE operator = '$operator' AND tipe ='$jenis'");
    $this->db->execute();
    $data = $this->db->resultSet();
    echo '  
        <option value="0">Pilih Kategori</option>
    ';
    foreach ($data as $datanya) {
      if ('Umum' == $datanya['kategori']) {
        $dataaa = 'Pulsa Reguler';
      } else {
        $dataaa = $datanya['kategori'];
      }
      echo '  
            <option value="' . $datanya['kategori'] . '">' . $dataaa . '</option>
        ';
    }
  }

  public function pesanppob()
  {
    $aksi = $_POST['aksi'];
    $kategori = $_POST['kategori'];

    if ('kategori' == $aksi) {
      $this->db->query("SELECT * FROM kategori_layanan WHERE server = '$kategori' ORDER BY nama ASC");
      $this->db->execute();
      $data = $this->db->resultSet();

      echo '<option value="0">Pilih kategori</option>';
      foreach ($data as $datanya) {
        echo ' <option value="' . $datanya['kode'] . '">' . $datanya['nama'] . '</option>';
      }
    } elseif ('layanan' == $aksi) {
      $tipe = $_POST['tipe'];

      $this->db->query("SELECT * FROM layanan_pulsa WHERE operator = '$kategori' AND tipe ='$tipe' AND status = 'Normal' ORDER BY harga ASC");
      $this->db->execute();
      $data = $this->db->resultSet();

      echo ' <option value="0">Pilih Layanan</option>';
      foreach ($data as $datanya) {
        echo ' <option value="' . $datanya['service_id'] . '">' . $datanya['layanan'] . '</option>';
      }
    }
  }

  public function deskripsippob()
  {
    $id = $_POST['id'];
    $this->db->query("SELECT * FROM layanan_pulsa WHERE service_id = '$id'");
    $this->db->execute();
    $data = $this->db->resultSet();

    echo json_encode($data);
  }

  public function pesansosmed()
  {
    $aksi = $_POST['aksi'];
    $kategori = $_POST['kategori'];

    if ('kategori' == $aksi) {
      $this->db->query("SELECT * FROM kategori_layanan WHERE tipe = '$kategori' ");
      $this->db->execute();
      $data = $this->db->resultSet();

      echo json_encode($data);
    } elseif ('layanan' == $aksi) {
      $tipe = $_POST['tipe'];

      $this->db->query("SELECT * FROM layanan_sosmed WHERE kategori = '$kategori' AND tipe = '$tipe' ");
      $this->db->execute();
      $data = $this->db->resultSet();

      echo json_encode($data);
    }
  }

  public function deskripsisosmed()
  {
    $id = $_POST['id'];
    $this->db->query("SELECT * FROM layanan_sosmed WHERE service_id = '$id'");
    $this->db->execute();
    $data = $this->db->resultSet();

    echo json_encode($data);
  }

  public function ratesosmed()
  {
    $id = $_POST['id'];
    $this->db->query("SELECT harga FROM layanan_sosmed WHERE id = '$id'");
    $this->db->execute();
    $data = $this->db->single();

    echo $data;
  }

  public function cekdeposit()
  {
    $username = $_SESSION['user']['username'];
    $this->db->query("SELECT count(*) FROM deposit WHERE username = '$username' AND status ='Pending'");

    if ($this->db->hitungBaris2() > 0) {
      echo 'ada';
    } else {
      echo 'tidak ada';
    }
  }

  public function inputdeposit()
  {
    $date = $this->date;
    $time = $this->time;

    if ('' == $_POST['pengirim']) {
      $pengirim = '022';
    } else {
      $pengirim = $_POST['pengirim'];
    }
    $username = $_SESSION['user']['username'];
    $nominaldepo = $_POST['nominal'];
    $metoddepo = $_POST['metode'];

    $data_metod = $this->dbh->prepare("SELECT * FROM metode_depo WHERE provider = '$metoddepo' ");
    $data_metod->execute();
    $data_metod = $data_metod->fetch();

    // cek minimal deposit
    if ($nominaldepo < $data_metod['minimal']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Minimal deposit menggunakan ' . $metoddepo . ' adalah ' . $data_metod['minimal'],
      ];
      header('Location:' . BASEURL);
    } else {
      $rand = rand(1, 200);
      $kode_nn = acak_nomor(3) . acak_nomor(3);
      $kode = "19$kode_nn";
      // rate sesuai database metode depo
      $harga = $nominaldepo * $data_metod['rate'] + $rand;

      $this->db->query("INSERT INTO deposit VALUES('', '$kode', '$username', '" . $data_metod['tipe'] . "', '" . $data_metod['provider'] . "', '$pengirim', '" . $data_metod['tujuan'] . ' ' . $data_metod['nama_penerima'] . "', '" . $data_metod['catatan'] . " $harga','$harga', '$nominaldepo', 'saldo_top_up', 'Pending', '$date', '$time')");
      $this->db->execute();

      if ($this->db->rowCount() > 0) {
        $datauser = $this->model('Home_model')->datauser($username);
        $namalengkap = $datauser['nama_depan'] . ' ' . $datauser['nama_belakang'];
        $email = $datauser['email'];
        $nohp = $datauser['no_hp'];
        $jumlahtf = number_format($harga, 0, ',', '.');
        $didapat = number_format($nominaldepo, 0, ',', '.');
        $msg =
          '
*Permintaan deposit anda kami terima #' . $kode . '*
Hallo *' . $namalengkap . '*
Silahkan transfer Dengan Nominal RP *' . $jumlahtf . '* 
Ke ' . $data_metod['tujuan'] . ' ( ' . $data_metod['provider'] . ' )
Saldo yang akan kamu terima sejumlah RP *' . $didapat . '*
----------------------------------------
Jika sudah di transfer maka otomatis deposit bisa
di konfirmasi ( Maximal 10 Menit ) Dan jika dalam waktu 
10 menit deposit belum bisa di konfirmasi silahkan hubungi *085350505161*
-------------------------------

*Terima kasih telah menjadi bagian dari Chandra Pedia*

';
        // kirim wa
        $sendwa = new Menzwa();
        $sendwa->sendMessage($nohp, $msg);

        // kirim ke email
        $this->model('sendmail')->kirimemail('Invoice Deposit', $email, $msg);

        $this->dbh->query("INSERT INTO mutasi VALUES('','$kode','$username','" . $data_metod['tipe'] . "','$metoddepo','$harga','$nominaldepo','UNREAD','$date','$time')");

        header('Location:' . BASEURL . 'deposit/invoice/' . $kode);
      } else {
        echo 'deposit error';
      }
    }
  }

  /// ini halaman tarik saldo
  public function tariksaldo()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Tarik Saldo';

    $data['namabank'] = $this->model('Lainnya')->getnamabank();
    // var_dump($data['namabank']);
    // die;
    $this->view('templates/header', $data);
    $this->view('home/tariksaldo', $data);
    $this->view('templates/footer');
  }

  public function getinfobank()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $norekening = filter($_POST['norekening']);
    $namabank = filter($_POST['namabank']);
    $total = filter($_POST['nominal']);
    $pin = filter($_POST['pin']);
    $saldouser = $data['user']['saldo_top_up'];
    $pinuser = $data['user']['pin'];
    $pajak = 2700;
    $nominal = $pajak + $total;
    $data = $this->model('Lainnya')->getinfonamebank($_POST);
    if (null == $data) {
      echo 'nomor rekening tersebut tidak di temukan';
    } elseif ($nominal > $saldouser) {
      echo '<div class="text-center text-danger">Saldo Kamu tidak cukup</div>';
    } elseif ($nominal < 50000) {
      echo '<div class="text-center text-danger">Minimal penarikan adalah RP 50.000</div>';
    } elseif ($pin != $pinuser) {
      echo '<div class="text-center text-danger">Mohon di cek kembali pin mu</div>';
    } else {
      echo '
                <div class="text-center">
                <h1 class="text-center">ATAS NAMA TUJUAN : <br>' . $data . '</h1>
                </div><br>
                <form method="POST" action="' . BASEURL . 'home/submittariksaldo">
                <div class="form-group">
                    <label for="tujuanppob">No Rekening</label>
                    <input type="number" class="form-control" name="tujuanbank" value="' . $norekening . '" id="tujuanppob" aria-describedby="emailHelp" placeholder="08xx" readonly>
                </div>
                <div class="form-group position-relative" style="display: none;">
                    <input type="hidden" name="tipebank" value="' . $namabank . '">
                </div>
                <p class="alert alert-secondary deskripsippob" style="display:none"></p>
                <div class="form-group">
                    <label for="tujuanppob">JUMLAH</label>
                    <input type="number" class="form-control" name="jumlah" id="pinppob" placeholder="123456" value="' . $nominal . '"  readonly>
                </div>
                <div class="form-group">
                    <label for="tujuanppob">PAJAK</label>
                    <input type="number" class="form-control" name="jumlah" id="pinppob" placeholder="123456" value="' . $pajak . '"  readonly>
                </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-info" data-dismiss="modal">Kembali</button>
                <button type="submit" class="btn btn-info" id="buttonpesanppob">Lanjutkan</button>
            </div>
            </form>
        ';
    }
  }

  public function submittariksaldo()
  {
    $tujuanbank = filter($_POST['tujuanbank']);
    $jumlah = filter($_POST['jumlah']);
    $kodebank = filter($_POST['tipebank']);
    $akungopay = $this->model('Admin_model')->accountgopay();
    $pingopay = $akungopay['pin'];

    $hasil = $this->model('Lainnya')->transferbank($kodebank, $tujuanbank, $jumlah, $pingopay);
    if (true == $hasil['success']) {
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Terjadi masalah, error 98, Mohon infokan error ini ke admin',
      ];
    }
    header('Location:' . BASEURL . 'home/tariksaldo');
  }

  ///// sampai sini halaman tarik saldo

  // orderan sosmed
  public function layanansosmed()
  {
    if (isset($_POST['kategori'])) {
      $post_kategori = filter($_POST['kategori']);
      $cek_layanan = $this->dbh->query("SELECT * FROM layanan_sosmed WHERE kategori = '$post_kategori' AND status = 'Aktif' ORDER BY harga ASC");
      $cek_layanan->execute();

      echo '<option value="0">Pilih Salah Satu</option>';

      foreach ($cek_layanan->fetchAll() as $data_layanan) {
        echo '<option value="' . $data_layanan['service_id'] . '">' . $data_layanan['layanan'] . '</option>';
      }
    } else {
      echo '<option value="0">Error.</option>';
    }
  }

  public function notesosmed()
  {
    if (isset($_POST['layanan'])) {
      $post_layanan = filter($_POST['layanan']);
      $cek_layanan = $this->dbh->query("SELECT count(*) FROM layanan_sosmed WHERE service_id = '$post_layanan' AND status = 'Aktif'");
      $cek_layanan->execute();
      if (1 == $cek_layanan->fetch(PDO::FETCH_COLUMN)) {
        $cek_layanan2 = $this->dbh->query("SELECT * FROM layanan_sosmed WHERE service_id = '$post_layanan' AND status = 'Aktif'");
        $cek_layanan2->execute();
        $data_layanan = $cek_layanan2->fetch();

        echo '<div class="form-group row">
                    <label class="col-xl-3 col-lg-3 col-form-label">Minimal Pesan</label>
                    <div class="col-lg-9 col-xl-6">
                        <input type="text" name="min" class="form-control" placeholder="0" value="' . number_format($data_layanan['min'], 0, ',', '.') . '" readonly="">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-xl-3 col-lg-3 col-form-label">Maksimal Pesan</label>
                    <div class="col-lg-9 col-xl-6">
                        <input type="text" name="max" class="form-control" placeholder="0" value="' . number_format($data_layanan['max'], 0, ',', '.') . '" readonly="">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-xl-3 col-lg-3 col-form-label">Harga/1000</label>
                    <div class="col-lg-9 col-xl-6">
                        <div class="input-group">
                            <div class="input-group-prepend"><span class="input-group-text text-primary">Rp</span></div>
                            <input type="number" class="form-control" placeholder="0" id="jumlah" value="' . number_format($data_layanan['harga'], 0, ',', '.') . '" readonly="">
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-xl-3 col-lg-3 col-form-label">Keterangan</label>
                    <div class="col-lg-9 col-xl-6">
                        <textarea type="text" class="form-control" placeholder="' . $data_layanan['catatan'] . '" value="Keterangan" readonly=""></textarea>
                    </div>
                </div>';
      } else {
        echo
        '<div class="alert alert-icon alert-danger alert-dismissible fade in" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <i class="mdi mdi-block-helper"></i>
                    <b>Gagal :</b> Layanan Tidak Ditemukan
                </div>';
      }
    } else {
      echo '  <div class="alert alert-icon alert-danger alert-dismissible fade in" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <i class="mdi mdi-block-helper"></i>
                <b>Gagal : </b> Terjadi Kesalahan, Silahkan Hubungi Admin.
            </div>';
    }
  }

  public function hargasosmed()
  {
    if (isset($_POST['layanan'])) {
      $post_layanan = filter($_POST['layanan']);
      $cek_layanan = $this->dbh->prepare("SELECT count(*) FROM layanan_sosmed WHERE service_id = '$post_layanan' AND status = 'Aktif'");
      $cek_layanan->execute();
      if (1 == $cek_layanan->fetch(PDO::FETCH_COLUMN)) {
        $cek_layanan2 = $this->dbh->prepare("SELECT * FROM layanan_sosmed WHERE service_id = '$post_layanan' AND status = 'Aktif'");
        $cek_layanan2->execute();
        $data_layanan = $cek_layanan2->fetch();
        $result = $data_layanan['harga'] / 1000;
        echo $result;
      } else {
        die('0');
      }
    } else {
      die('0');
    }
  }
}
