<?php

class Admin extends Controller
{
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
    new Session();
    if ('Developers' != $_SESSION['user']['level']) {
      $_SESSION['hasil'] = [
        'alert' => 'warning',
        'pesan' => 'Kamu tidak diizinkan masuk ke halaman admin',
      ];
      header('Location:' . BASEURL);
      die;
    }
  }

  public function index()
  {
    $data['totaluser'] = $this->model('Admin_model')->totaluser();
    $data['allorderspending'] = $this->model('Admin_model')->allorderspending();
    $data['allorderssuccess'] = $this->model('Admin_model')->allorderssuccess();
    $data['countorderssuccess'] = $this->model('Admin_model')->countorderssuccess();
    $data['countorderspending'] = $this->model('Admin_model')->countorderspending();
    $data['countsaldousers'] = $this->model('Admin_model')->countsaldousers();
    $data['alldepositsuccess'] = $this->model('Admin_model')->alldepositsuccess();
    $data['countdepositsuccess'] = $this->model('Admin_model')->countdepositsuccess();
    // Orderan PPOB
    $data['allordersppob'] = $this->model('Admin_model')->allordersppob();
    $data['countordersppob'] = $this->model('Admin_model')->countordersppob();

    // Orderan Sosmed
    $data['allorderssosmed'] = $this->model('Admin_model')->allorderssosmed();
    $data['countorderssosmed'] = $this->model('Admin_model')->countorderssosmed();

    $data['title'] = 'Dashboard Admin';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['aktifitasuser'] = $this->model('Admin_model')->aktifitasuser();
    $this->view('templates/header_admin', $data);
    $this->view('admin/dashboard', $data);
    $this->view('templates/footer_admin');
  }

  // pengelolaan pengguna
  public function manageuser()
  {
    $data['title'] = 'Kelola Pengguna';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);

    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/manageuser', $data);
    $this->view('templates/footer_admin');
  }

  // hapus pengguna
  public function deleteuser($iduser)
  {
    $this->dbh->query("DELETE FROM users WHERE id = '$iduser'");
    $this->dbh->execute();
    if ($this->dbh->rowcount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Pengguna ' . $iduser . ' berhasil dihapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'gagal dihapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageuser');
  }

  public function detailuser()
  {
    $iduser = $_POST['id'];

    $this->dbh->query("SELECT * FROM users WHERE id ='$iduser'");
    $datauser = $this->dbh->single();

    echo ' <table class="table">

        <thead>

        </thead>

        <tbody>

            <tr style="border-left: 1px solid blue">

                <td>ID</td>

                <td>' . $datauser['id'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Nama lengkap</td>

                <td>' . $datauser['nama_depan'] . ' ' . $datauser['nama_belakang'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Email</td>

                <td>' . $datauser['email'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Username</td>

                <td>' . $datauser['username'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Saldo</td>

                <td>' . $datauser['saldo_top_up'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Level</td>

                <td>' . $datauser['level'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Status</td>

                <td>' . $datauser['status'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Pin</td>

                <td>' . $datauser['pin'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Api key</td>

                <td>

                ' . $datauser['api_key'] . '

                </td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>No hp</td>

                <td>

                ' . $datauser['no_hp'] . '

                </td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Tanggal daftar</td>

                <td>

                ' . $datauser['date'] . '

                </td>

            </tr>

        </tbody>

    </table>';
  }

  public function edituser()
  {
    $iduser = $_POST['id'];

    $this->dbh->query("SELECT * FROM users WHERE id = '$iduser'");
    $datauser = $this->dbh->single();

    echo '<div class="row">

        <div class="col-md-12">

        <form method="POST" action="' . BASEURL . 'admin/submitedit">

            <div class="form-group">

                <label>ID Pengguna</label>

                <input type="number" name="id" class="form-control" value="' . $datauser['id'] . '" readonly>

            </div>

            <div class="form-group">

                <label>Nama Lengkap</label>

                <input type="text" name="username" class="form-control" value="' . $datauser['nama'] . '" readonly>

            </div>

            <div class="form-group">

                <label>Email</label>

                <input type="email" name="email" class="form-control" value="' . $datauser['email'] . '">

            </div>

            <div class="form-group">

                <label>Nomor HP <small class="text-danger">*Format Nomor HP Wajib 62.</small></label>

                <input type="number" class="form-control" name="no_hp" value="' . $datauser['no_hp'] . '">

            </div>

            <div class="form-group">

                <label>Nama Pengguna</label>

                <input type="text" name="username" class="form-control" value="' . $datauser['username'] . '">

            </div>

            <div class="form-group">

                <label>Kata Sandi <small class="text-danger">*Kosongkan Jika Tidak Diubah.</small></label>

                <input type="text" name="password" class="form-control" value="">

            </div>

            <div class="form-group">

                <label>Saldo</label>

                <input type="number" name="saldo_top_up" class="form-control" value="' . $datauser['saldo_top_up'] . '">

            </div>

            <div class="form-group">

                <label>Level</label>

                <select class="form-control" name="level">

                    <option value="' . $datauser['level'] . '">' . $datauser['level'] . ' (Terpilih)</option>

                    <option value="Member">Member</option>

                    <option value="Reseller">Reseller</option>

                </select>

            </div>

            <div class="form-group">

                <label>Status Akun</label>

                <select class="form-control" name="status_akun">

                <option value="' . $datauser['status'] . '">' . $datauser['status'] . ' (Terpilih)</option>

                    <option value="Active">Aktif</option>

                    <option value="Suspended">Tidak Aktif</option>

                    <option value="Unverif">Belum verifikasi</option>

                </select>

            </div>

            <div class="form-group">

                <label>PIN</label>

                <input type="number" name="pin" class="form-control" value="' . $datauser['pin'] . '">

            </div>

            <div class="modal-footer">

                <button type="submit" class="btn btn-success" name="ubah"><i class="fa fa-pencil-alt"></i> Ubah</button>

            </div>

            </form>

        </div>

    </div>';
  }

  public function submitedit()
  {
    if ($this->model('Admin_model')->updateuser($_POST) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Berhasil Diubah',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal ubah',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageuser');
  }

  // sampai sini pengelolaan pengguna

  // pengelolaan deposit
  // halaman kelola deposit
  public function managedeposit()
  {
    $data['title'] = 'Kelola Deposit';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['alldeposit'] = $this->model('Admin_model')->alldeposit();
    $this->view('templates/header_admin', $data);
    $this->view('admin/managedeposit', $data);
    $this->view('templates/footer_admin', $data);
  }

  // detaildeposit
  public function detaildeposit()
  {
    $iddepo = $_POST['id'];

    $this->dbh->query("SELECT * FROM deposit WHERE kode_deposit ='$iddepo'");
    $datadepo = $this->dbh->single();
    if ($datadepo['pengirim'] = '022') {
      $pengirim = 'Tidak ada ( Via Bank )';
    } else {
      $pengirim = $datadepo['pengirim'];
    }

    if ('Success' == $datadepo['status']) {
      $alert = 'success';
    } else {
      $alert = 'warning';
    }

    echo '<table class="table">

        <thead>

        </thead>

        <tbody>

            <tr style="border-left: 1px solid blue">

                <td>ID</td>

                <td><div class="badge badge-primary">' . $datadepo['kode_deposit'] . '</div></td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Username</td>

                <td>' . $datadepo['username'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Pembayaran </td>

                <td>' . $datadepo['tipe'] . '  (' . $datadepo['provider'] . ')</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>No Pengirim</td>

                <td>' . $pengirim . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Jumlah transfer</td>

                <td>' . $datadepo['jumlah_transfer'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Saldo Didapat</td>

                <td>' . $datadepo['get_saldo'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Status</td>

                <td><div class="badge badge-' . $alert . '">' . $datadepo['status'] . '</div></td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Tanggal & Waktu</td>

                <td>' . $datadepo['date'] . '<br>' . $datadepo['time'] . '</td>

            </tr>

        </tbody>

    </table>';
  }

  /**
   * Update deposite
   * @url /public/admin/managedeposit
   * @url /admin/managedeposit
   */
  public function updatedeposit()
  {
    if (!isset($_POST['status'])) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Pilih status terlebih dahulu',
      ];
    } elseif ('Success' == $_POST['status']) {
      $id = $_POST['id'];
      $username = $_POST['username'];
      $saldo = $_POST['getsaldo'];
      $saldouser = $this->model('Home_model')->datauser($username)['saldo_top_up'];
      $totalsaldo = $saldo + $saldouser;
      $updatedeposit = $this->db->prepare("UPDATE deposit SET status = 'Success' WHERE kode_deposit = '$id'");
      $updatedeposit->execute();
      if ($updatedeposit->rowCount() > 0) {
        // ERROR NYA DISINI
        // JIKA SEBELUMNYA TIDAK ERROR, BERARTI ADA YANG NGUBAH
        // ERROR REASON : UPDATE SALDO TANPA TERTUJU PADA ID USER YANG DEPO
        //$updatesaldo = $this->db->prepare("UPDATE users SET saldo_top_up = '$totalsaldo'");
        $updatesaldo = $this->db->prepare("UPDATE users SET saldo_top_up = '$totalsaldo' WHERE username = '$username'"); // FIX TAMBAH SALDO
        $updatesaldo->execute();
        if ($updatesaldo->rowCount() > 0) {
          $insertakt = $this->model('Lainnya')->tambahakt('Ditambahkan saldo oleh admin (Konfirmasi manual deposit', $username);
          $insertriwyt = $this->model('Lainnya')->riwayatsaldo('Penambahan Saldo', $saldo, 'Deposit ' . $id, $username);
          $cektopdepo = $this->model('Lainnya')->cek_topdepo($username);
          if ($cektopdepo > 0) {
            $datatopdepo = $this->model('Lainnya')->fetch_topdepo($username);

            $nominal = $datatopdepo['jumlah'] + $saldo;
            $total = $datatopdepo['total'] + 1;
            $this->model('Lainnya')->ubah_topdepo($username, $nominal, $total);
          } else {
            $this->model('Lainnya')->masuk_topdepo($username, $saldo);
          }

          $_SESSION['hasil'] = [
            'alert' => 'success',
            'pesan' => 'Berhasil diubah menjadi success dan saldo telah ditambahkan ke user ' . $username . ' Senilai' . $saldo,
          ];
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Error Update Saldo (85), Mohon infokan error ini ke developer!',
          ];
        }
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Error Update Status (84), Mohon infokan error ini ke developer!',
        ];
      }
    } else {
      $id = $_POST['id'];
      $username = $_POST['username'];
      $status = $_POST['status'];
      $updatedeposit = $this->db->prepare("UPDATE deposit SET status = '$status' WHERE kode_deposit = '$id'");
      $updatedeposit->execute();
      if ($updatedeposit->rowCount() > 0) {
        $_SESSION['hasil'] = [
          'alert' => 'success',
          'pesan' => 'Status Deposit ' . $id . ' Berhasil diubah menjadi' . $status,
        ];
      }
    }

    header('Location:' . BASEURL . 'admin/managedeposit');
  }

  public function deletedeposit($id)
  {
    $deletedeposit = $this->db->prepare("DELETE FROM deposit WHERE kode_deposit = '$id' ");
    $deletedeposit->execute();
    if ($deletedeposit->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Status Deposit ' . $id . ' Berhasil dihapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal Hapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/managedeposit');
  }

  //sampai sini pengelolaan deposit

  // kelola order ppob
  public function manageppob()
  {
    $data['arrayordersppob'] = $this->model('Admin_model')->arrayordersppob();

    $data['title'] = 'Kelola Pesanan PPOB';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $this->view('templates/header_admin', $data);
    $this->view('admin/manageppob', $data);
    $this->view('templates/footer_admin', $data);
  }

  public function detailorderppob()
  {
    $idorder = $_POST['id'];

    $this->dbh->query("SELECT * FROM pembelian_pulsa WHERE oid ='$idorder'");
    $dataorder = $this->dbh->single();

    // place_form
    if ('WEB' == $dataorder['place_from']) {
      $icon = 'simple-icon-globe';
      $alert = 'secondary';
    } else {
      $icon = 'simple-icon-shuffle';
      $alert = 'warning';
    }
    // status
    if ('Success' == $dataorder['status']) {
      $iconstatus = 'simple-icon-check';
      $alertstatus = 'success';
    } elseif ('Pending' == $dataorder['status']) {
      $iconstatus = 'simple-icon-clock';
      $alertstatus = 'warning';
    } else {
      $iconstatus = 'simple-icon-close';
      $alertstatus = 'danger';
    }
    // refund
    if ('0' == $dataorder['refund']) {
      $iconrefund = 'simple-icon-close';
      $alertrefund = 'danger';
    } elseif ('1' == $dataorder['refund']) {
      $iconrefund = 'simple-icon-check';
      $alertrefund = 'success';
    }
    echo ' <table class="table">

    <thead>

    </thead>

    <tbody>

        <tr>

            <td>Tanggal</td>

            <td>

               ' . tanggal_indo($dataorder['date']) . '<br>' . $dataorder['time'] . '

            </td>

        </tr>

        <tr>

            <td>ID</td>

            <td>

                <div class="badge badge-secondary">' . $dataorder['oid'] . '</div>

            </td>

        </tr>

        <tr>

            <td>Provider ID</td>

            <td><span class="badge badge-secondary">' . $dataorder['provider_oid'] . ' - ' . $dataorder['provider'] . '</span></td>

        </tr>

        <tr>

            <td>Tujuan</td>

            <td><span class="badge badge-info">' . $dataorder['target'] . ' </span></td>

        </tr>



        <tr>

            <td>Username </td>

            <td>' . $dataorder['user'] . '</td>

        </tr>

        <tr>

            <td>Layanan</td>





            <td style="min-width: 200px;">

              ' . $dataorder['layanan'] . '

            </td>

        </tr>

        <tr>

            <td>Harga</td>

            <td>' . number_format($dataorder['harga'], 0, ',', '.') . '</td>

        </tr>

        <tr>

            <td>Keterangan / No SN</td>





            <td style="min-width: 200px;">

            <div class="input-group">

                <input type="text" class="form-control form-control-sm" name="keterangan" value="' . $dataorder['keterangan'] . '" id="keterangan-' . $dataorder['oid'] . '">

                <button data-toggle="tooltip" title="Copy Keterangan" class="badge badge-primary" type="button" onclick="copy_to_clipboard("keterangan-' . $dataorder['oid'] . '")"><i class="iconsminds-files text-warning"></i></button>

            </div>

        </td>

        </tr>

        <tr>

            <td>Status</td>

            <td>

                <div class="badge badge-' . $alertstatus . '"><i class="' . $iconstatus . '">' . $dataorder['status'] . '</i></div>

            </td>

        </tr>

        <tr>

            <td>Order Melalui</td>

            <td>

                <div class="badge badge-' . $alert . '"><i class="' . $icon . '">' . $dataorder['place_from'] . '</i></div>

            </td>

        </tr>

        <tr>

            <td>Refund :</td>

            <td><span class="badge badge-' . $alertrefund . '"><i class="' . $iconrefund . '"></i></span></td>

        </tr>

    </tbody>

</table>';
  }

  public function updateorderppob()
  {
    if (!isset($_POST['status'])) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Pilih terlebih dahulu statusnya!',
      ];
      header('Location:' . BASEURL . 'admin/manageppob');
    } else {
      $id = $_POST['id'];
      $status = $_POST['status'];

      $update = $this->db->prepare("UPDATE pembelian_pulsa SET status ='$status' WHERE oid = '$id'");
      $update->execute();
      if ($update->rowCount() > 0) {
        $_SESSION['hasil'] = [
          'alert' => 'success',
          'pesan' => 'Status Pesanan dengan ID : ' . $id . ' Berhasil diubah menjadi ' . $status,
        ];
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Gagal Ubah!',
        ];
      }
      header('Location:' . BASEURL . 'admin/manageppob');
    }
  }

  public function deleteorderppob($idorder)
  {
    $this->dbh->query("DELETE FROM pembelian_pulsa WHERE oid = '$idorder'");
    $this->dbh->execute();
    $deleteall = $this->db->prepare("DELETE FROM semua_pembelian WHERE id_pesan = '$idorder'");
    $deleteall->execute();
    if ($this->dbh->rowcount() > 0 && $deleteall->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Pesanan ' . $idorder . ' berhasil dihapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'gagal dihapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageppob');
  }

  // sampai sini kelola order ppob

  public function managesosmed()
  {
    $data['arrayorderssosmed'] = $this->model('Admin_model')->arrayorderssosmed();

    $data['title'] = 'Kelola Pesanan SM';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $this->view('templates/header_admin', $data);
    $this->view('admin/managesosmed', $data);
    $this->view('templates/footer_admin', $data);
  }

  public function detailordersosmed()
  {
    $idorder = $_POST['id'];

    $this->dbh->query("SELECT * FROM pembelian_sosmed WHERE oid ='$idorder'");
    $dataorder = $this->dbh->single();

    // place_form
    if ('WEB' == $dataorder['place_from']) {
      $icon = 'simple-icon-globe';
      $alert = 'secondary';
    } else {
      $icon = 'simple-icon-shuffle';
      $alert = 'warning';
    }
    // status
    if ('Success' == $dataorder['status']) {
      $iconstatus = 'simple-icon-check';
      $alertstatus = 'success';
    } elseif ('Pending' == $dataorder['status']) {
      $iconstatus = 'simple-icon-clock';
      $alertstatus = 'warning';
    } else {
      $iconstatus = 'simple-icon-close';
      $alertstatus = 'danger';
    }
    // refund
    if ('0' == $dataorder['refund']) {
      $iconrefund = 'simple-icon-close';
      $alertrefund = 'danger';
    } elseif ('1' == $dataorder['refund']) {
      $iconrefund = 'simple-icon-check';
      $alertrefund = 'success';
    }
    echo ' <table class="table">

    <thead>

    </thead>

    <tbody>

        <tr>

            <td>Tanggal</td>

            <td>

               ' . tanggal_indo($dataorder['date']) . '<br>' . $dataorder['time'] . '

            </td>

        </tr>

        <tr>

            <td>ID</td>

            <td>

                <div class="badge badge-secondary">' . $dataorder['oid'] . '</div>

            </td>

        </tr>

        <tr>

            <td>Provider ID</td>

            <td><span class="badge badge-secondary">' . $dataorder['provider_oid'] . ' - ' . $dataorder['provider'] . '</span></td>

        </tr>

        <tr>

            <td>Tujuan</td>

            <td><span class="badge badge-info">' . $dataorder['target'] . ' </span></td>

        </tr>



        <tr>

            <td>Username </td>

            <td>' . $dataorder['user'] . '</td>

        </tr>

        <tr>

            <td>Layanan</td>





            <td style="min-width: 200px;">

              ' . $dataorder['layanan'] . '

            </td>

        </tr>

        <tr>

            <td>Harga</td>

            <td>' . number_format($dataorder['harga'], 0, ',', '.') . '</td>

        </tr>

        <tr>

            <td>Jumlah Mulai</td>

            <td>' . $dataorder['start_count'] . '</td>

        </tr>

        <tr>

            <td>Sisa </td>

            <td>' . $dataorder['remains'] . '</td>

        </tr>

        <tr>

            <td>Status</td>

            <td>

                <div class="badge badge-' . $alertstatus . '"><i class="' . $iconstatus . '">' . $dataorder['status'] . '</i></div>

            </td>

        </tr>

        <tr>

            <td>Order Melalui</td>

            <td>

                <div class="badge badge-' . $alert . '"><i class="' . $icon . '">' . $dataorder['place_from'] . '</i></div>

            </td>

        </tr>

        <tr>

            <td>Refund :</td>

            <td><span class="badge badge-' . $alertrefund . '"><i class="' . $iconrefund . '"></i></span></td>

        </tr>

    </tbody>

</table>';
  }

  public function updateordersosmed()
  {
    if (!isset($_POST['status'])) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Pilih terlebih dahulu statusnya!',
      ];
      header('Location:' . BASEURL . 'admin/managesosmed');
    } else {
      $id = $_POST['id'];
      $status = $_POST['status'];

      $update = $this->db->prepare("UPDATE pembelian_sosmed SET status ='$status' WHERE oid = '$id'");
      $update->execute();
      if ($update->rowCount() > 0) {
        $_SESSION['hasil'] = [
          'alert' => 'success',
          'pesan' => 'Status Pesanan dengan ID : ' . $id . ' Berhasil diubah menjadi ' . $status,
        ];
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Gagal Ubah!',
        ];
      }
      header('Location:' . BASEURL . 'admin/managesosmed');
    }
  }

  public function deleteordersosmed($idorder)
  {
    $this->dbh->query("DELETE FROM pembelian_sosmed WHERE oid = '$idorder'");
    $this->dbh->execute();
    $deleteall = $this->db->prepare("DELETE FROM semua_pembelian WHERE id_pesan = '$idorder'");
    $deleteall->execute();
    if ($this->dbh->rowcount() > 0 && $deleteall->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Pesanan ' . $idorder . ' berhasil dihapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'gagal dihapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/managesosmed');
  }

  // sampai sini kelola order sosmed

  // kelola berita

  public function managenews()
  {
    $data['allnews'] = $this->model('Admin_model')->allnews();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Berita';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/managenews', $data);
    $this->view('templates/footer_admin');
  }

  public function addnews()
  {
    $kategori = $_POST['kategori'];
    $tipe = $_POST['tipe'];
    $title = $_POST['title'];
    $konten = $_POST['konten'];
    $date = $this->date;
    $time = $this->time;
    $this->dbh->query("INSERT INTO berita VALUES('','$date','$time','$kategori','$title','$tipe','$konten')");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $this->model('Admin_model')->editusernoread();
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Berhasil ditambahkan!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal ditambahkan',
      ];
    }
    header('Location:' . BASEURL . 'admin/managenews');
  }

  // sampai sini kelola berita
  public function deletenews($idnew)
  {
    $this->dbh->query("DELETE FROM berita WHERE id = '$idnew'");
    $this->dbh->execute();
    if ($this->dbh->rowcount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Berhasil dihapus!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal menghapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/managenews');
  }

  public function editnews($id)
  {
    $get_idberita = $id;
    $cek_berita = $this->dbh->query("SELECT * FROM berita WHERE id = '$get_idberita'");
    $data_berita = $this->dbh->single();

    echo '<div class="row">

        <div class="col-md-12">

            <div class="form-group">

                <label>ID Berita</label>

                <input type="number" name="id" class="form-control" value="' . $data_berita['id'] . '" readonly>

            </div>

            <div class="form-group">

                <label>Kategori</label>

                <select class="form-control" name="kategori">

                    <option value="' . $data_berita['icon'] . '">' . $data_berita['icon'] . '</option>

                    <option value="PESANAN">PESANAN</option>

                    <option value="LAYANAN">LAYANAN</option>

                    <option value="DEPOSIT">DEPOSIT</option>

                    <option value="PENGGUNA">PENGGUNA</option>

                    <option value="PROMO">PROMO</option>

                </select>

            </div>

            <div class="form-group">

                <label>Tipe</label>

                <select class="form-control" name="tipe">

                    <option value="' . $data_berita['tipe'] . '">' . $data_berita['tipe'] . '</option>

                    <option value="INFO">INFO</option>

                    <option value="PERINGATAN">PERINGATAN</option>

                    <option value="PENTING">PENTING</option>

                </select>

            </div>

            <div class="form-group">

                <label>Title</label>

                <input type="text" name="title" class="form-control" placeholder="Title" value="' . $data_berita['title'] . '">

            </div>

            <div class="form-group">

                <label>Konten</label>

                <textarea type="text" name="konten" class="form-control">' . $data_berita['konten'] . '</textarea>

            </div>



        </div>

    </div>';
  }

  public function submiteditnews()
  {
    if ($this->model('Admin_model')->updatenews($_POST) > 0) {
      if ($this->model('Admin_model')->editusernoread() > 0) {
        $_SESSION['hasil'] = [
          'alert' => 'success',
          'pesan' => 'Berhasil diubah!',
        ];
      }
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'warning',
        'pesan' => 'Berhasil diubah tapi user tidak ternotif, hubungi developer untuk memperbaiki!',
      ];
    }

    header('Location:' . BASEURL . 'admin/managenews');
  }

  // sampai sini kelola berita

  // kelola pertanyaan umum
  public function managefaq()
  {
    $data['allfaqs'] = $this->model('Admin_model')->allfaqs();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola FAQ';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/managefaq', $data);
    $this->view('templates/footer_admin');
  }

  public function addfaq()
  {
    $number = $_POST['number'];
    $tipe = $_POST['tipe'];
    $title = $_POST['title'];
    $konten = $_POST['konten'];
    $date = $this->date;
    $time = $this->time;
    $this->dbh->query("INSERT INTO pertanyaan_umum VALUES('','$number','$tipe','$title','$konten')");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'FAQ Baru Berhasil ditambahkan!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal ditambahkan',
      ];
    }
    header('Location:' . BASEURL . 'admin/managefaq');
  }

  public function deletefaq($idfaq)
  {
    $this->dbh->query("DELETE FROM pertanyaan_umum WHERE id = '$idfaq'");
    $this->dbh->execute();
    if ($this->dbh->rowcount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Faq Berhasil dihapus!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal menghapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/managefaq');
  }

  // sampai sini kelola pertanyuaan umum

  // kelola admin
  public function manageadmin()
  {
    $data['alladmins'] = $this->model('Admin_model')->alladmins();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Admin';

    $this->view('templates/header_admin', $data);
    $this->view('admin/manageadmin', $data);
    $this->view('templates/footer_admin');
  }

  public function addadmins()
  {
    if ($this->model('Admin_model')->addadmin($_POST) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Admin berhasil ditambahkan',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal menambah admin',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageadmin');
  }

  public function deleteadmin($idadmin)
  {
    $this->dbh->query("DELETE FROM kontak_admin WHERE id = '$idadmin'");
    $this->dbh->execute();
    if ($this->dbh->rowcount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'admin Berhasil dihapus!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal menghapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageadmin');
  }

  public function editadmin($idadmin)
  {
    $id = $idadmin;

    $this->dbh->query("SELECT * FROM kontak_admin WHERE id = '$idadmin'");
    $data_kontak = $this->dbh->single();

    echo '<div class="row">

        <div class="col-md-12">

            <div class="form-group">

                <label>ID Kontak Admin</label>

                <input type="number" name="id" class="form-control" value="' . $data_kontak['id'] . '" readonly>

            </div>

            <div class="form-group">

                <label>Nama Lengkap</label>

                <input type="text" name="nama" class="form-control" placeholder="Nama Lengkap" value="' . $data_kontak['nama'] . '">

            </div>

            <div class="form-group">

                <label>Jabatan</label>

                <input type="text" name="jabatan" class="form-control" placeholder="Jabatan" value="' . $data_kontak['jabatan'] . '">

            </div>

            <div class="form-group">

                <label>Deskripsi</label>

                <input type="text" name="deskripsi" class="form-control" placeholder="Deskripsi" value="' . $data_kontak['deskripsi'] . '">

            </div>

            <div class="form-group">

                <label>Alamat Rumah</label>

                <input type="text" name="lokasi" class="form-control" placeholder="Alamat Rumah" value="' . $data_kontak['lokasi'] . '">

            </div>

            <div class="form-group">

                <label>Jam Kerja</label>

                <input type="text" name="jam_kerja" class="form-control" placeholder="Jam Kerja" value="' . $data_kontak['jam_kerja'] . '">

            </div>

            <div class="form-group">

                <label>Email</label>

                <input type="text" name="email" class="form-control" placeholder="Jam Kerja" value="' . $data_kontak['email'] . '">

            </div>

            <div class="form-group">

                <label>Nomor WhatsApp</label>

                <input type="number" name="no_hp" class="form-control" placeholder="Nomor WhatsApp" value="' . $data_kontak['no_hp'] . '">

            </div>

            <div class="form-group">

                <label>Link Facebook</label>

                <input type="text" name="link_fb" class="form-control" placeholder="Link Facebook" value="' . $data_kontak['link_fb'] . '">

            </div>

            <div class="form-group">

                <label>Link Instagram</label>

                <input type="text" name="link_ig" class="form-control" placeholder="Link Instagram" value="' . $data_kontak['link_ig'] . '">

            </div>

        </div>

    </div>';
  }

  public function submiteditadmin()
  {
    if ($this->model('Admin_model')->updateadmin($_POST) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Berhasil Diubah ',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal ubah',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageadmin');
  }

  // sampai sini kelola admin

  // kelola layanan/services
  public function managecategory()
  {
    $data['allcategory'] = $this->model('Admin_model')->allcategory();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Admin';

    $this->view('templates/header_admin', $data);
    $this->view('admin/managecategory', $data);
    $this->view('templates/footer_admin');
  }

  public function addcategory()
  {
    $nama = trim($_POST['nama']);
    $kode = trim($_POST['kode']);
    $tipe = trim($_POST['tipe']);
    $server = trim($_POST['server']);

    $this->dbh->query("INSERT INTO kategori_layanan VALUES ('', '$nama', '$kode', '$tipe', '$server')");
    $this->dbh->execute();
    if ($this->dbh->rowcount() > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Kategori Baru Telah Berhasil Ditambahkan.'];
    } else {
      $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal(85)! Sistem Kami Sedang Mengalami Gangguan.'];
    }
    header('Location:' . BASEURL . 'admin/managecategory');
  }

  public function otheractioncategory()
  {
    if (isset($_POST['ubah'])) {
      $get_id = filter($_POST['id_kategori']);
      $nama = trim($_POST['nama']);
      $kode = trim($_POST['kode']);
      $tipe = trim($_POST['tipe']);
      $server = trim($_POST['server']);

      $cek_id = $this->db->query("SELECT count(*) FROM kategori_layanan WHERE id = '$get_id'");
      $cek_id->execute();

      if (0 == $cek_id->fetch(PDO::FETCH_COLUMN)) {
        $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Data Tidak Di Temukan.'];
      } else {
        $update = $this->db->prepare("UPDATE kategori_layanan SET nama = '$nama', kode = '$kode', tipe = '$tipe', server = '$server' WHERE id = '$get_id'");
        $update->execute();

        if ($update->rowCount() > 0) {
          $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Kategori Telah Berhasil Di Ubah.'];
        } else {
          $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan.<script>swal("Ups Gagal!", "Sistem Kami Sedang Mengalami Gangguan.", "error");</script>'];
        }
      }
    } elseif (isset($_POST['hapus'])) {
      $get_id = filter($_POST['id_kategori']);

      $cek_kategori = $this->db->prepare("SELECT count(*) FROM kategori_layanan WHERE id = '$get_id'");
      $cek_kategori->execute();

      if (0 == $cek_kategori->fetch(PDO::FETCH_COLUMN)) {
        $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => ' Ups, Data Tidak Di Temukan.'];
      } else {
        $delete = $this->db->prepare("DELETE FROM kategori_layanan WHERE id = '$get_id'");
        $delete->execute();

        if ($delete->rowCount() > 0) {
          $_SESSION['hasil'] = ['alert' => 'success', 'judul' => 'Berhasil', 'pesan' => 'Sip, Kategori Berhasil Di Hapus.'];
        } else {
          $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan.<script>swal("Ups Gagal!", "Sistem Kami Sedang Mengalami Gangguan.", "error");</script>'];
        }
      }
    }
    header('Location:' . BASEURL . 'admin/managecategory');
  }

  // service ppob
  public function manageserviceppob()
  {
    $data['allservicesppob'] = $this->model('Admin_model')->allservicesppob();
    $data['allcategory'] = $this->model('Admin_model')->allcategory();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola layanan PPOB';

    $this->view('templates/header_admin', $data);
    $this->view('admin/manageservicesppob', $data);
    $this->view('templates/footer_admin');
  }

  public function addserviceppob()
  {
    if ($this->model('Admin_model')->addserviceppob($_POST) > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Layanan Baru Telah Berhasil Ditambahkan.'];
    } else {
      $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan.<script>swal("Ups Gagal!", "Sistem Kami Sedang Mengalami Gangguan.", "error");</script>'];
    }
    header('Location:' . BASEURL . 'admin/manageserviceppob');
  }

  public function updateservicetopup($id)
  {
    $cek_layanan = $this->dbh->query("SELECT * FROM layanan_pulsa WHERE service_id = '$id'");
    $this->dbh->execute();
    $data_layanan = $this->dbh->single();

    if (0 == $this->dbh->rowCount()) {
      exit('Data Tidak Ditemukan');
    } else {
      $cek_kategori = $this->dbh->query("SELECT * FROM kategori_layanan WHERE tipe = 'TOP UP' ORDER BY nama ASC");
      $this->dbh->execute();
      $data_kat = [];

      $provider = $this->db->prepare('SELECT * FROM provider_pulsa ORDER BY id ASC');
      $provider->execute();

      echo '<div class="row">

           <div class="col-md-12">

               <div class="form-group">

                   <label class="col-md-12 control-label">ID Layanan</label>

                   <div class="col-md-12">

                       <input type="text" name="sid" class="form-control" value="' . $data_layanan['service_id'] . '" readonly>

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">ID Provider</label>

                   <div class="col-md-12">

                       <input type="text" name="pid" class="form-control" value="' . $data_layanan['provider_id'] . '">

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Tipe</label>

                   <div class="col-md-12">

                       <select class="form-control" name="tipe">

                           <option value="' . $data_layanan['tipe'] . '">' . $data_layanan['tipe'] . ' (Terpilih)</option>

                           <option value="Pulsa">Pulsa</option>

                           <option value="E-Money">E-Money</option>

                           <option value="Data">Data</option>

                           <option value="Paket SMS Telpon">Paket SMS Telpon</option>

                           <option value="Games">Games</option>

                           <option value="PLN">PLN</option>

                           <option value="Pulsa Internasional">Pulsa Internasional</option>

                           <option value="Voucher">Voucher</option>

                           <option value="WIFI ID">WIFI ID</option>

                           <option value="Pascabayar">Pascabayar</option>

                       </select>

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Operator</label>

                   <div class="col-md-12">

                       <select class="form-control" name="operator">

                           <option value="' . $data_layanan['operator'] . '">' . $data_layanan['operator'] . ' (Terpilih)</option>';
      foreach ($this->dbh->resultSet() as $data_kategori) {
        $data_kat = $data_kategori;

        echo '  <option value="' . $data_kategori['kode'] . '">' . $data_kategori['nama'] . '</option>';
      }
      echo ' </select>

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Nama Layanan</label>

                   <div class="col-md-12">

                       <input type="text" name="layanan" class="form-control" value="' . $data_layanan['layanan'] . '">

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Deskripsi</label>

                   <div class="col-md-12">

                       <textarea type="text" name="deskripsi" class="form-control" placeholder="Deskripsi">' . $data_layanan['deskripsi'] . '</textarea>

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Harga WEB</label>

                   <div class="col-md-12">

                       <input type="number" name="harga" class="form-control" value="' . $data_layanan['harga'] . '">

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Harga API</label>

                   <div class="col-md-12">

                       <input type="number" name="harga_api" class="form-control" value="' . $data_layanan['harga_api'] . '">

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Status</label>

                   <div class="col-md-12">

                       <select class="form-control" name="status">

                           <option value="' . $data_layanan['status'] . '">' . $data_layanan['status'] . ' (Terpilih)</option>

                           <option value="Normal">Normal</option>

                           <option value="Gangguan">Gangguan</option>

                       </select>

                   </div>

               </div>

               <div class="form-group">

                   <label class="col-md-12 control-label">Provider</label>

                   <div class="col-md-12">

                       <select class="form-control" name="provider">

                           <option value="' . $data_layanan['provider'] . '">' . $data_layanan['provider'] . ' (Terpilih)</option>';
      foreach ($provider->fetchAll() as $data_provider) {
        echo '<option value="' . $data_provider['code'] . '">' . $data_provider['code'] . '</option>';
      }

      echo
      '</select>

                   </div>

               </div>



           </div>

       </div>';
    }
  }

  public function updateserviceppob()
  {
    if ($this->model('Admin_model')->submiteditserviceppob($_POST) > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Layanan Telah Berhasil Di Ubah.'];
    } else {
      $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan.<script>swal("Ups Gagal!", "Sistem Kami Sedang Mengalami Gangguan.", "error");</script>'];
    }
    header('Location:' . BASEURL . 'admin/manageserviceppob');
  }

  public function deleteserviceppob($id)
  {
    $delete = $this->db->prepare("DELETE FROM layanan_pulsa WHERE service_id  = '$id' ");
    $delete->execute();
    if ($delete->rowCount() > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Layanan Telah Berhasil Di Hapus.'];
    } else {
      $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan.'];
    }
    header('Location:' . BASEURL . 'admin/manageserviceppob');
  }

  public function dbackup()
  {
    $data['db'] = $this->db;
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Database Backup';
    $data['table'] = isset($_REQUEST['table']) ? trim($_REQUEST['table']) : '*';
    $this->view('admin/database', $data);
  }

  public function manageservicesosmed()
  {
    $data['allservicessosmed'] = $this->model('Admin_model')->allservicessosmed();
    $data['allcategory'] = $this->model('Admin_model')->allcategory();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola layanan SM';

    $this->view('templates/header_admin', $data);
    $this->view('admin/manageservicesosmed', $data);
    $this->view('templates/footer_admin');
  }

  public function addservicesosmed()
  {
    if ($this->model('Admin_model')->addservicesosmed($_POST) > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Layanan Baru Telah Berhasil Ditambahkan.'];
    } else {
      $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan.<script>swal("Ups Gagal!", "Sistem Kami Sedang Mengalami Gangguan.", "error");</script>'];
    }
    header('Location:' . BASEURL . 'admin/manageservicesosmed');
  }

  public function updateservicesosmed($id)
  {
    $cek_layanan = $this->dbh->query("SELECT * FROM layanan_sosmed WHERE service_id = '$id'");
    $this->dbh->execute();
    $data_layanan = $this->dbh->single();

    if (0 == $data_layanan) {
      exit('Data Tidak Ditemukan');
    } else {
      $cek_kategori = $this->dbh->query("SELECT * FROM kategori_layanan WHERE tipe = 'Sosial Media' ORDER BY nama ASC");
      $this->dbh->execute();
      $data_kat = [];

      $provider = $this->db->prepare('SELECT * FROM provider ORDER BY id ASC');
      $provider->execute();

      echo '	<div class="row">

            <div class="col-md-12">

                <div class="form-group">

                    <label class="col-md-12 control-label">ID Layanan</label>

                    <div class="col-md-12">

                        <input type="number" name="sid" class="form-control" value="' . $data_layanan['service_id'] . '" readonly>

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">ID Provider</label>

                    <div class="col-md-12">

                        <input type="text" name="pid" class="form-control" value=' . $data_layanan['provider_id'] . '>

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Kategori</label>

                    <div class="col-md-12">

                        <select class="form-control" name="kategori">

                            <option value=' . $data_layanan['kategori'] . '">' . $data_layanan['kategori'] . ' (Terpilih)</option>

                           ';
      foreach ($this->dbh->resultSet() as $data_kategori) {
        echo '<option value=' . $data_kategori['kode'] . '">' . $data_kategori['kode'] . '</option>';
      }
      echo    '</select>

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Nama Layanan</label>

                    <div class="col-md-12">

                        <input type="text" name="layanan" class="form-control" value=' . $data_layanan['layanan'] . '">

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Keterangan</label>

                    <div class="col-md-12">

                        <textarea name="catatan" class="form-control">' . $data_layanan['catatan'] . '</textarea>

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Minimal Pemesanan</label>

                    <div class="col-md-12">

                        <input type="number" name="min" class="form-control" value=' . $data_layanan['min'] . '">

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Maksimal Pemesanan</label>

                    <div class="col-md-12">

                        <input type="number" name="max" class="form-control" value=' . $data_layanan['max'] . '">

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Harga WEB/1000</label>

                    <div class="col-md-12">

                        <input type="number" name="harga" class="form-control" value=' . $data_layanan['harga'] . '">

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Harga API/1000</label>

                    <div class="col-md-12">

                        <input type="number" name="harga_api" class="form-control" value=' . $data_layanan['harga_api'] . '">

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Status</label>

                    <div class="col-md-12">

                        <select class="form-control" name="status">

                            <option value=' . $data_layanan['status'] . '">' . $data_layanan['status'] . ' (Terpilih)</option>

                            <option value="Aktif">Aktif</option>

                            <option value="Tidak Aktif">Tidak Aktif</option>

                        </select>

                    </div>

                </div>

                <div class="form-group">

                    <label class="col-md-12 control-label">Provider</label>

                    <div class="col-md-12">

                        <select class="form-control" name="provider">

                            <option value=' . $data_layanan['provider'] . '">' . $data_layanan['provider'] . ' (Terpilih)</option>';
      foreach ($provider->fetchAll() as $data_provider) {
        echo  '<option value=' . $data_provider['code'] . '">' . $data_provider['code'] . '</option>';
      }
      echo ' </select>

                    </div>

                </div>



            </div>

        </div>';
    }
  }

  public function deleteservicesosmed($id)
  {
    $this->dbh->query("DELETE FROM layanan_sosmed WHERE service_id = '$id'");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'layanan berhasil di hapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'gagal hapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/manageservicesosmed');
  }

  //sampai sini kelola layanan/services

  // halaman mutasi saldo
  public function mutasisaldo()
  {
    $data['allmutasi'] = $this->model('Admin_model')->allmutasi();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Mutasi saldo';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/mutasisaldo', $data);
    $this->view('templates/footer_admin');
  }

  public function submitmutasi()
  {
    $kodedeposit = $_POST['kodedeposit'];
    $status = $_POST['status'];

    if (isset($_POST['hapus'])) {
      $this->dbh->query("DELETE FROM mutasi WHERE kode_deposit ='$kodedeposit'");
      $this->dbh->execute();

      if ($this->dbh->rowCount() > 0) {
        $_SESSION['hasil'] = [
          'alert' => 'success',
          'pesan' => 'Mutasi  ' . $kodedeposit . ' berhasil dihapus',
        ];
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Gagal Hapus, Kesalahan System',
        ];
      }
    } elseif (isset($_POST['ubah'])) {
      $this->dbh->query("UPDATE mutasi SET status ='$status' WHERE kode_deposit ='$kodedeposit'");
      $this->dbh->execute();
      if ($this->dbh->rowCount() > 0) {
        $_SESSION['hasil'] = [
          'alert' => 'success',
          'pesan' => 'Status Deposit  ' . $kodedeposit . ' Telah diubah menjadi' . $status,
        ];
      } else {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Gagal update (84)',
        ];
      }
    }
    header('Location:' . BASEURL . 'admin/mutasisaldo');
  }

  // sampai sini halaman mutasi saldo

  // halaman metode isi saldo
  public function metodedeposit()
  {
    $data['allmetodedeposit'] = $this->model('Admin_model')->allmetodedeposit();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Metodedeposit';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/metodedeposit', $data);
    $this->view('templates/footer_admin');
  }

  public function addmetodedeposit()
  {
    if ($this->model('Admin_model')->addmetodedeposit($_POST) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Metode deposit berhasil di tambahkan!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Metode deposit gagal ditambahkan, error(86)',
      ];
    }
    header('Location:' . BASEURL . 'admin/metodedeposit');
  }

  public function deletemetodedepo($id)
  {
    $this->dbh->query("DELETE FROM metode_depo WHERE id = '$id'");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Metode deposit berhasil di hapus!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Metode deposit gagal dihapus, error(87)',
      ];
    }
    header('Location:' . BASEURL . 'admin/metodedeposit');
  }

  public function editmetodedeposit($id)
  {
    $this->dbh->query("SELECT * FROM metode_depo WHERE id= '$id'");
    $this->dbh->execute();
    $data_depo = $this->dbh->single();
    echo '	<div class="row">

        <div class="col-md-12">

            <div class="form-group">

                <label class="col-md-12 control-label">ID Pembayaran Isi Saldo</label>

                <div class="col-md-12">

                    <input type="number" name="id" class="form-control" value="' . $data_depo['id'] . '" readonly>

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Tipe Pembayaran</label>

                <div class="col-md-12">

                    <select class="form-control" name="tipe">

                        <option value="' . $data_depo['tipe'] . '">' . $data_depo['tipe'] . ' (Terpilih)</option>

                        <option value="Transfer Pulsa">Transfer Pulsa</option>

                        <option value="Transfer Bank">Transfer Bank</option>

                    </select>

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Provider</label>

                <div class="col-md-12">

                    <input type="text" name="provider" class="form-control" value="' . $data_depo['provider'] . '">

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Keterangan</label>

                <div class="col-md-12">

                    <input type="text" name="catatan" class="form-control" value="' . $data_depo['catatan'] . '">

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Rate</label>

                <div class="col-md-12">

                    <input type="text" name="rate" class="form-control" value="' . $data_depo['rate'] . '">

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Nama Penerima <small class="text-danger">*Kosongkan Jika Tipe Pembayaran Transfer Pulsa.</small></label>

                <div class="col-md-12">

                    <input type="text" name="nama_penerima" class="form-control" value="' . $data_depo['nama_penerima'] . '">

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Tujuan Transfer</label>

                <div class="col-md-12">

                    <input type="number" name="tujuan" class="form-control" value="' . $data_depo['tujuan'] . '">

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Minimal Isi Saldo</label>

                <div class="col-md-12">

                    <input type="number" name="minimal" class="form-control" value="' . $data_depo['minimal'] . '">

                </div>

            </div>

            <div class="form-group">

                <label class="col-md-12 control-label">Status</label>

                <div class="col-md-12">

                    <select class="form-control" name="status">

                        <option value="' . $data_depo['status'] . '">' . $data_depo['status'] . ' (Terpilih)</option>

                        <option value="Aktif">Aktif</option>

                        <option value="Tidak Aktif">Tidak Aktif</option>

                    </select>

                </div>

            </div>



        </div>

    </div>';
  }

  public function submiteditdeposit()
  {
    if ($this->model('Admin_model')->submiteditdeposit($_POST) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Metode deposit berhasil di Ubah',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Metode deposit gagal diubah, error(88)',
      ];
    }
    header('Location:' . BASEURL . 'admin/metodedeposit');
  }

  // sampai sini halaman metode isi saldo

  // halaman kelola mutasi dan akun deposit otomatis
  public function depositovo()
  {
    $data['accountovo'] = $this->model('Admin_model')->accountovo();
    $data['mutasiovo'] = $this->model('Admin_model')->mutasiovo();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Metodedeposit';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/depositovo', $data);
    $this->view('templates/footer_admin');
  }

  /**
   * get balance ovo as JSON header (no cache)
   */
  public function balanceovo()
  {
    $data['accountovo'] = $this->model('Admin_model')->accountovo();
    $data['mutasiovo'] = $this->model('Admin_model')->mutasiovo();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Metodedeposit';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('admin/balanceovo', $data);
  }

  public function depositbca()
  {
    $data['accountbank'] = $this->model('Admin_model')->accountbank();
    $data['mutasibca'] = $this->model('Admin_model')->mutasibca();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Metodedeposit';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/depositbca', $data);
    $this->view('templates/footer_admin');
  }

  public function depositgopay()
  {
    $data['accountgopay'] = $this->model('Admin_model')->accountgopay();
    $data['mutasigopay'] = $this->model('Admin_model')->mutasigopay();

    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kelola Metodedeposit';
    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/depositgopay', $data);
    $this->view('templates/footer_admin');
  }

  // sampai sini

  // halaman get layanan operannn

  public function getlayanan()
  {
    $data['providersosmed'] = $this->model('Ambildata_model')->allprovidersosmed();
    $data['providerppob'] = $this->model('Ambildata_model')->allproviderppob();

    $data['title'] = 'Kelola Layanan';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $this->view('templates/header_admin', $data);
    $this->view('admin/getlayanan', $data);
    $this->view('templates/footer_admin');
  }

  public function detailprovider()
  {
    $code = $_POST['code'];
    $provider = $_POST['provider'];
    if ('sosmed' == $provider) {
      $provider = 'provider';
    } elseif ('PPOB' == $provider) {
      $provider = 'provider_pulsa';
    }

    $this->dbh->query("SELECT * FROM $provider WHERE code ='$code'");
    $dataprovider = $this->dbh->single();

    echo ' <table class="table">

        <thead>

        </thead>

        <tbody>

            <tr style="border-left: 1px solid blue">

                <td>Nama Provider</td>

                <td>' . $dataprovider['code'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Link</td>

                <td>' . $dataprovider['link'] . ' </td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Link Service</td>

                <td>' . $dataprovider['link_service'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>API Key</td>

                <td>' . $dataprovider['api_key'] . '</td>

            </tr>

            <tr style="border-left: 1px solid blue">

                <td>Api ID</td>

                <td>' . $dataprovider['api_id'] . '</td>

            </tr>

        </tbody>

    </table>';
  }

  public function editprovider()
  {
    $code = $_POST['code'];
    $provider = $_POST['provider'];
    if ('sosmed' == $provider) {
      $provider = 'provider';
    } elseif ('PPOB' == $provider) {
      $provider = 'provider_pulsa';
    }
    $this->dbh->query("SELECT * FROM $provider WHERE code = '$code'");
    $dataprovider = $this->dbh->single();

    echo '<div class="row">

        <div class="col-md-12">

        <form method="POST" action="' . BASEURL . 'admin/submiteditprovider">

        <input style="display:none;" type="text" name="jenis" class="form-control" value="' . $provider . '" required>

            <div class="form-group">

                <label>Nama Provider</label>

                <input type="text" name="code" class="form-control" value="' . $dataprovider['code'] . '" required>

            </div>

            <div class="form-group">

                <label>Link</label>

                <input type="text" name="link" class="form-control" value="' . $dataprovider['link'] . '" required>

            </div>

            <div class="form-group">

                <label>Link service</label>

                <input type="text" name="link_service" class="form-control" value="' . $dataprovider['link_service'] . '" required>

            </div>

            <div class="form-group">

                <label>Api Key</label>

                <input type="text" class="form-control" name="apikey" value="' . $dataprovider['api_key'] . '" required>

            </div>

            <div class="form-group">

                <label>Api ID</label>

                <input type="text" name="apiid" class="form-control" value="' . $dataprovider['api_id'] . '" required>

            </div>



            <div class="modal-footer">

                <button type="submit" class="btn btn-success" name="ubah"><i class="fa fa-pencil-alt"></i> Ubah</button>

            </div>

            </form>

        </div>

    </div>';
  }

  public function submiteditprovider()
  {
    if ($this->model('Admin_model')->updateprovider($_POST) > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Berhasil Diubah',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal ubah',
      ];
    }
    header('Location:' . BASEURL . 'admin/getlayanan');
  }

  public function deleteprovider($code, $tipe)
  {
    $this->dbh->query("DELETE FROM $tipe WHERE code = '$code'");
    $this->dbh->execute();
    if ($this->dbh->rowcount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Provider ' . $code . ' berhasil dihapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'gagal dihapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/getlayanan');
  }

  public function addprovidersosmed()
  {
    $code = $_POST['code'];
    $link = $_POST['link'];
    $link_service = $_POST['link_service'];
    $api_key = $_POST['api_key'];
    $api_id = $_POST['api_id'];
    $provider = $_POST['jenis'];

    $this->dbh->query("INSERT INTO $provider VALUES('','$code','$link','$link_service','$api_key','$api_id')");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $this->model('Admin_model')->editusernoread();
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Berhasil ditambahkan!',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal ditambahkan',
      ];
    }
    header('Location:' . BASEURL . 'admin/getlayanan');
  }

  public function deletekategori($code)
  {
    if ('sosmed' == $code) {
      $tipe = 'Sosial Media';
    } elseif ('ppob' == $code) {
      $tipe = 'Top Up';
    }
    $this->dbh->query("DELETE FROM kategori_layanan WHERE tipe = '$tipe'");
    $this->dbh->execute();
    if ($this->dbh->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Seluruh Kategori ' . $code . ' berhasil dihapus',
      ];
    } else {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Gagal Hapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/getlayanan');
  }

  public function deletelayanansosmed($code)
  {
    $this->dbh->query("DELETE FROM layanan_sosmed WHERE provider = '$code'");
    $this->dbh->execute();

    if ($this->dbh->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Seluruh Layanan sosial media dari provider ' . $code . ' berhasil dihapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/getlayanan');
  }

  public function deletelayananppob($code)
  {
    $this->dbh->query("DELETE FROM layanan_pulsa WHERE provider = '$code'");
    $this->dbh->execute();

    if ($this->dbh->rowCount() > 0) {
      $_SESSION['hasil'] = [
        'alert' => 'success',
        'pesan' => 'Seluruh Layanan ppob dari provider ' . $code . ' berhasil dihapus',
      ];
    }
    header('Location:' . BASEURL . 'admin/getlayanan');
  }

  // sampai sini halaman get layanan dan operan

  // halaman kirim informasi ke user
  public function sendinformation()
  {
    $data['title'] = 'Kelola Pengguna';
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);

    $data['allusers'] = $this->model('Admin_model')->allusers();
    $this->view('templates/header_admin', $data);
    $this->view('admin/sendinformation', $data);
    $this->view('templates/footer_admin');
  }

  public function submitSendInformation()
  {
    $sendwa = new Menzwa();
    $informasi = $_POST['isiinformasi'];
    $semuauser = $this->db->prepare('SELECT * FROM users');
    $semuauser->execute();
    $user = $semuauser->fetchAll();
    foreach ($user as $usernya) {
      $nomor = $usernya['no_hp'];
      $kirim = $sendwa->sendMessage($nomor, $informasi);
      if (true == $kirim['status']) {
        echo 'Berhasil kirim ke =>' . $nomor . '<br>';
      } else {
        echo 'Berhasil kirim ke =>' . $nomor . '<br>';
      }
    }
  }
}
