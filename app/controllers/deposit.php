<?php

class Deposit extends Controller
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
  }

  // invoice deposit ,
  public function invoice($post = 0)
  {
    $data['data_depo'] = $this->model('Deposit_model')->datadeposit($post);
    $this->dbh->query("SELECT * FROM deposit WHERE kode_deposit = '$post'");

    if (is_array($this->dbh->single())) {
      // }
      $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
      $data['title'] = 'Invoice';
      $this->view('templates/header', $data);
      $this->view('deposit/invoice', $data);
      $this->view('templates/footer');
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Id deposit tersebut sudah dibayar / error!',
      ];
      header('Location:' . BASEURL);
    }
  }

  // jalankan ketika user membatalkan deposit
  public function batalkandeposit($kode_depo)
  {
    $user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $user['username'];
    $this->dbh->query("UPDATE deposit SET status = 'Error' WHERE kode_deposit = '$kode_depo'");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $this->model('Lainnya')->tambahakt('Membatalkan deposit ' . $kode_depo, $username);
      $_SESSION['hasil'] = [
        'alert' => 'info',
        'pesan' => 'Deposit #' . $kode_depo . ' Berhasil di batalkan.',
      ];
      header('Location:' . BASEURL);
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Terjadi kesalahan, mohon infokan ini ke admin',
      ];
      header('Location:' . BASEURL . 'deposit/invoice/' . $kode_depo);
    }
  }

  //konfirmasi deposit
  public function konfirmasideposit($kode, $nominal)
  {
    $user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $user['username'];
    $saldo = $_SESSION['user']['saldo_top_up'];
    $date = $this->date;
    $time = $this->time;
    $ip = get_client_ip();

    $datamutasi = $this->model('Deposit_model')->bacamutasi($kode, $nominal);
    if ('UNREAD' == $datamutasi['status']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Maaf ,Pembayaran belum kami terima.',
      ];
      header('Location:' . BASEURL . 'deposit/invoice/' . $kode);
    } elseif ('READ' == $datamutasi['status']) {
      $jumlahsaldo = $datamutasi['saldo'] + $user['saldo_top_up'];
      $updatesaldo = $this->model('Deposit_model')->tambahsaldo($jumlahsaldo, $user['username']);
      if ($updatesaldo > 0) {
        $ubahdeposit = $this->model('Deposit_model')->ubahdeposit($kode);
        $ubahmutasi = $this->model('Deposit_model')->ubahmutasi($kode);
        $insertakt = $this->model('Lainnya')->tambahakt('Membayar deposit ' . $kode, $username);
        $insertriwayat = $this->model('Lainnya')->riwayatsaldo('Penambahan Saldo', $nominal, 'Menambah saldo dengan menyelesaikan deposit ' . $kode, $username);

        if ($ubahdeposit > 0 && $ubahmutasi > 0 && $insertakt > 0 && $insertriwayat > 0) {
          $cektopdepo = $this->model('Lainnya')->cek_topdepo($username);
          if ($cektopdepo > 0) {
            $datatopdepo = $this->model('Lainnya')->fetch_topdepo($username);

            $nominal = $datatopdepo['jumlah'] + $datamutasi['saldo'];
            $total = $datatopdepo['total'] + 1;
            $this->model('Lainnya')->ubah_topdepo($username, $nominal, $total);
          } else {
            $this->model('Lainnya')->masuk_topdepo($username, $datamutasi['saldo']);
          }
          $_SESSION['hasil'] = [
            'alert' => 'success',
            'pesan' => 'Success, Terima Kasih, Saldo telah ditambahkan ke akun anda',
          ];
          header('Location:' . BASEURL . 'deposit/invoice/' . $kode);
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Error (82) ,Maaf terjadi kesalahan, mohon infokan alert ini ke admin!.',
          ];
        }
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Error (81) ,Terjadi kesalahan saat menambahkan saldo, mohon infokan ini ke admin!',
        ];
      }
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Error (80) ,Maaf terjadi kesalahan, mohon infokan alert ini ke admin!.',
      ];
      header('Location:' . BASEURL . 'deposit/invoice/' . $kode);
    }
  }

  // riwayat deposit
  public function riwayatdeposit()
  {
    $data_user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $data_user['username'];
    $this->dbh->query("SELECT count(*) FROM deposit WHERE username ='$username' AND status = 'Pending'");
    if ($this->dbh->hitungBaris2() > 0) {
      $this->dbh->query("SELECT * FROM deposit WHERE username ='$username' AND status = 'Pending'");
      $data = $this->dbh->single();
      $id = $data['kode_deposit'];
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Kamu memiliki deposit yang belum dibayar!',
      ];
      header('Location:' . BASEURL . 'deposit/invoice/' . $id);
    } else {
      $data['riwayat'] = $this->model('Deposit_model')->riwayatdeposit($username);
      $data['user'] = $data_user;
      $data['title'] = 'Riwayat Deposit';
      $this->view('templates/header', $data);
      $this->view('deposit/riwayat', $data);
      $this->view('templates/footer');
    }
  }

  // page redem voucher
  public function voucher()
  {
    $data['riwayat'] = $this->model('Deposit_model')->riwayatredem($_SESSION['user']['username']);
    $data_user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['user'] = $data_user;
    $data['title'] = 'Redem voucher';
    $this->view('templates/header', $data);
    $this->view('deposit/redem', $data);
    $this->view('templates/footer');
  }

  public function redemvoucher()
  {
    $voucher = $_POST['voucher'];
    $data_user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $data_user['username'];
    $date = $this->date;

    $this->dbh->query("SELECT count(*) FROM kode_voucher WHERE kode = '$voucher' AND status = 'Aktif'");
    $this->dbh->resultSet();
    if ($this->dbh->hitungBaris2() > 0) {
      $this->dbh->query("SELECT * FROM kode_voucher WHERE kode = '$voucher'");
      $datavoucher = $this->dbh->single();
      $saldovoucher = $datavoucher['jumlah_saldo'];
      $jumlahsaldo = $datavoucher['jumlah_saldo'] + $data_user['saldo_top_up'];
      if ($this->model('Deposit_model')->tambahsaldo($jumlahsaldo, $username) > 0) {
        $updatekode = $this->db->prepare("UPDATE kode_voucher SET status = 'Nonaktif' , user_redem = '$username' , tanggal_redem = '$date' WHERE kode = '$voucher'");
        $updatekode->execute();
        $insertakt = $this->model('Lainnya')->tambahakt('Redem voucher ' . $voucher, $username);
        $insertriwyt = $this->model('Lainnya')->riwayatsaldo('Penambahan Saldo', $saldovoucher, 'Redem voucher' . $voucher, $username);
        if ($updatekode->rowCount() > 0 && $insertakt > 0 && $insertriwyt > 0) {
          $cektopdepo = $this->model('Lainnya')->cek_topdepo($username);
          if ($cektopdepo > 0) {
            $datatopdepo = $this->model('Lainnya')->fetch_topdepo($username);

            $nominal = $datatopdepo['jumlah'] + $saldovoucher;
            $total = $datatopdepo['total'] + 1;
            $this->model('Lainnya')->ubah_topdepo($username, $nominal, $total);
          } else {
            $this->model('Lainnya')->masuk_topdepo($username, $saldovoucher);
          }
          /// alert sukses
          echo ' <div class="alert alert-success alert-dismissible fade show  mb-0" role="alert">
                    Berhail. Saldo telah di tambahkan ke akunmu
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>';

        // error 84
        } else {
          echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
                    Error (84) .Terjadi kesalahan, mohon hubungi admin!
                     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                         <span aria-hidden="true">&times;</span>
                     </button>
                 </div>';
        }
        // error 83
      } else {
        echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
               Error (83) .Terjadi kesalahan Saat menambah saldo, mohon hubungi admin!
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
      }
    } else {
      // eror normal
      // $_SESSION['hasil']['pesan'] = 'Kode tersebut tidak di temukan/ sudah di reddem!';
      echo ' <div class="alert alert-danger alert-dismissible fade show  mb-0" role="alert">
               `Kode tersebut tidak di temukan/sudah di Pakai!`
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>';
    }
  }

  // halaman kirim saldo
  public function kirimsaldo()
  {
    $data['riwayattransfer'] = $this->model('Deposit_model')->riwayattransfer($_SESSION['user']['username']);
    $data_user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['user'] = $data_user;
    $data['title'] = 'Kirim saldo';
    $this->view('templates/header', $data);
    $this->view('deposit/kirimsaldo', $data);
    $this->view('templates/footer');
  }

  public function ceknomortf()
  {
    $nomor = $_POST['nomor'];

    $this->dbh->query("SELECT count(*) FROM users WHERE no_hp = '$nomor' ");
    $this->dbh->execute();
    echo $this->dbh->hitungBaris2();
  }

  public function transfersaldo()
  {
    $date = $this->date;
    $time = $this->time;
    $notujuan = $_POST['no_tujuan'];

    $nominal = filter($_POST['nominal']);
    $pin = filter($_POST['pin']);
    $data_user = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $cekpenerima = $this->dbh->query("SELECT * FROM users WHERE no_hp = '$notujuan' ");
    $data_penerima = $this->dbh->single();
    $cek_no = $this->db->prepare("SELECT * FROM users WHERE no_hp = '$notujuan'");
    $cek_no->execute();
    if ($cek_no->rowCount() < 1) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Cek kembali nomor tujuan, nomor tersebut tidak terdaftar',
      ];
    } elseif ($nominal < 10000) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Minimal Transfer saldo adalah 10.000',
      ];
    } elseif ($pin != $data_user['pin']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Pin Kamu salah!',
      ];
    } elseif ($notujuan == $data_user['no_hp']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Tidak Bisa kirim saldo Ke akun sendiri!',
      ];
    } elseif ($nominal > $data_user['saldo_top_up']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Saldo kamu tidak cukup!',
      ];
    } else {
      $pengirim = $data_user['username'];
      $saldopengirim = $data_user['saldo_top_up'];
      $total = ($saldopengirim - $nominal);

      $this->dbh->query("UPDATE users SET saldo_top_up = '$total' WHERE username = '$pengirim' ");
      $this->dbh->execute();
      if ($this->dbh->rowCount() > 0) {
        $saldopenerima = $data_penerima['saldo_top_up'];
        $total2 = $saldopengirim + $nominal;
        $this->dbh->query("UPDATE users SET saldo_top_up = '$total2' WHERE no_hp = '$notujuan' ");
        $this->dbh->execute();
        if ($this->dbh->rowCount() > 0) {
          $penerima = $data_penerima['username'];

          // inser aktifitas dan riwayat saldo pengirim
          $insertakt = $this->model('Lainnya')->tambahakt('Mengirim Saldo ke ' . $notujuan, $nominal, $pengirim);
          $insertriwyt1 = $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $nominal, 'Transfer saldo RP :  ' . $nominal, $pengirim);

          $insertriwyt = $this->model('Lainnya')->riwayatsaldo2('Penambahan Saldo', $nominal, 'Transfer saldo ' . $nominal, $penerima);
          // insert riwayat transfer
          $insertriwayattf = $this->db->prepare("INSERT INTO riwayat_transfer VALUES ('','Saldo_top_up','$pengirim','$penerima','$nominal','$date','$time','$notujuan')");
          $insertriwayattf->execute();
          if ($insertakt > 0 && $insertriwyt > 0 && $insertriwyt1 > 0 && $insertriwayattf->rowCount() > 0) {
            $_SESSION['hasil'] = [
              'alert' => 'success',
              'pesan' => 'Berhasil! Saldo berhasil di transfer ke ' . $notujuan . ', Saldo senilai : ' . $nominal . ' Telah dikurangi di akun anda!',
            ];
          } else {
            $_SESSION['hasil'] = [
              'alert' => 'danger',
              'pesan' => 'Err0r (91) , mohon infokan error ini ke admin!',
            ];
          }
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Err0r (90) , mohon infokan error ini ke admin!',
          ];
        }
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Err0r (89) , mohon infokan error ini ke admin!',
        ];
      }
    }

    header('Location:' . BASEURL . 'deposit/kirimsaldo');
  }

  // sampai sini halaman kirim saldo
}
