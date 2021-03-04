<?php
$db = new Database();
$dbh = $db->connect();
$data_gopay = $data['accountgopay'];

if (isset($_POST['getDeviceId'])) {
  $gopay = new GojekPay();
  $device_id = $gopay->uuidv4();
  $accept = $dbh->prepare("UPDATE gopay SET device_id = '$device_id' WHERE id = 'S1'");
  $accept->execute();
  if ($accept->rowCount() > 0) {
    $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip,Generate Device Id berhasil, silahkan login.'];
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan'];
  }
}
if (isset($_POST['nomorlog'])) {
  $post_nomor = trim(filter($_POST['nomor']));
  $gopay2 = new GojekPay();
  // ambil kode otp dan token login
  $reqlogin = json_decode($gopay2->loginRequest($post_nomor), true);

  //var_dump($reqlogin);
  $token_otp = $reqlogin['data']['otp_token'];
  if (false == $reqlogin['success']) {
    $_SESSION['hasil'] = [
      'alert' => 'danger',
      'pesan' => '<b>' . $reqlogin['errors'][0]['message_title'] . '</b>  ' . $reqlogin['errors'][0]['message'],
    ];
  } else {
    $accept = $dbh->prepare("UPDATE gopay SET nomor = '$post_nomor' , login_token = '$token_otp' WHERE id = 'S1'");
    $accept->execute();
    if ($accept->rowCount() > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Berhasil mendapatkan token login, silahkan masukan kode otp di form dibawah.'];
    } else {
      $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan'];
    }
  }
}

if (isset($_POST['smslog'])) {
  $tokenlogin = $data_gopay['login_token'];
  $post_sms = trim(filter($_POST['sms']));
  $gopay = new GojekPay();
  $accept2 = json_decode($gopay->getAuthToken($tokenlogin, $post_sms), true);
  // var_dump($accept2);
  if (isset($accept2['access_token'])) {
    $token = $accept2['access_token'];
    $updd = $dbh->prepare("UPDATE gopay SET kode = '$post_sms' , token = '$token' WHERE id = 'S1'");
    $updd->execute();
    if ($updd->rowCount() > 0) {
      $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Login Akun GOPAY Berhasil'];
    }
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan'];
  }
}
if (isset($_POST['pinlog'])) {
  $post_pin = trim(filter($_POST['pin']));
  $accept = $GOPAY->konfirmasiSecurityCode($post_pin);
  $accepd = $accept['data'];
  if (true == $accept['result']) {
    $upd = $dbh->prepare("UPDATE GOPAY SET pin = '$post_pin', token = '$accepd' WHERE id = 'S1'");
    $upd->execute();
    $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Autentikasi Berhasil.'];
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan1' . $accepd];
  }
}
if (isset($_POST['reset'])) {
  $accept = $dbh->prepare("UPDATE GOPAY SET nomor = '', device = '', kode = '0', pin = '0', token = '' WHERE id = 'S1'");
  $accept->execute();
  if ($accept->rowCount() > 0) {
    $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Data Berhasil Direset.'];
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => 'Ups, Gagal! Sistem Kami Sedang Mengalami Gangguan'];
  }
}
if (isset($_POST['cek'])) {
  $gopay = new GojekPay($data_gopay['token']);
  $hasil = json_decode($gopay->getHistory(), true);
  $acc = $gopay->getHistory($data_gopay['token']);

  if (isset($hasil['data']['success'])) {
    $_SESSION['hasil'] = ['alert' => 'success', 'pesan' => 'Sip, Tidak Ada Error Yang Terdeteksi.'];
  } else {
    $_SESSION['hasil'] = ['alert' => 'danger', 'pesan' => json_encode($hasil)];
  }
}
?>

<main>

  <div class="container-fluid">

    <div class="row">

      <div class="col-12">

        <h1>Kelola GOPAY</h1>

        <nav class="breadcrumb-container d-none d-sm-block d-lg-inline-block" aria-label="breadcrumb">



        </nav>

        <div class="separator mb-5"></div>

      </div>

    </div>



    <div class="alert alert-warning   mb-2" role="alert">

      <i class="simple-icon-info"> Ketika sudah login maka deposit gopay sudah otomatis<br>

        Selain digunakan untuk deposit, akun gopay ini juga digunakan untuk fitur Tarik saldo, pastikan saldo cukup agar fitur tersebut berjalan normal!</i>

    </div>



    <div class="row">

      <div class="offset-lg-1 col-lg-10 card">

        <div class="kt-portlet card-body">

          <div class="kt-portlet__head">

            <div class="kt-portlet__head-label">

              <h3 class="kt-portlet__head-title">

                <i class="fa fa-credit-card text-primary"></i>

                Pengaturan Mutasi GOPAY

              </h3>

            </div>

          </div>

          <div class="kt-portlet__body">

            <?php
            if (isset($_SESSION['hasil'])) {
            ?>

              <div class="alert alert-<?php echo $_SESSION['hasil']['alert']; ?> alert-dismissible" role="alert">

                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                <?php echo $_SESSION['hasil']['pesan']; ?>

              </div>

            <?php
              unset($_SESSION['hasil']);
            }
            ?>

            <form class="form-horizontal" method="POST">

              <input type="hidden" name="csrf_token" value="<?php echo $config['csrf_token']; ?>">

              <div class="row">

                <div class="form-group col-8">

                  <label>Device ID</label>

                  <input type="text" class="form-control" name="deviceid" value="<?= $data['accountgopay']['device_id']; ?>" readonly>

                </div>

                <div class="form-group col-4">

                  <label>&nbsp;</label>

                  <button type="submit" name="getDeviceId" class="btn btn-outline-primary form-control">Get Device ID</button>

                </div>

              </div>

              <div class="row">

                <div class="form-group col-8">

                  <label>Nomor GOPAY</label>

                  <input type="number" class="form-control" name="nomor" value="<?= $data['accountgopay']['nomor']; ?>">

                </div>

                <div class="form-group col-4">

                  <label>&nbsp;</label>

                  <button type="submit" name="nomorlog" class="btn btn-outline-primary form-control">Kirim OTP</button>

                </div>

              </div>



              <div class="row">

                <div class="form-group col-8">

                  <label>Verifikasi SMS</label>

                  <input type="number" class="form-control" name="sms" value="<?= $data['accountgopay']['kode']; ?>">

                </div>

                <div class="form-group col-4">

                  <label>&nbsp;</label>

                  <button type="submit" name="smslog" class="btn btn-outline-primary form-control">login</button>

                </div>

              </div>

              <!-- <div class="row">

                                <div class="form-group col-8">

                                    <label>Kode Keamanan (PIN)</label>

                                    <input type="number" class="form-control" name="pin" value="<?= $data['accountgopay']['pin']; ?>">

                                </div>

                                <div class="form-group col-4">

                                    <label>&nbsp;</label>

                                    <button type="submit" name="pinlog" class="btn btn-outline-primary form-control">Verifikasi</button>

                                </div>

                            </div> -->

              <div class="row">

                <div class="form-group col-6">

                  <button type="submit" name="reset" class="btn btn-danger form-control">Reset</button>

                </div>

                <div class="form-group col-6">

                  <button type="submit" name="cek" class="btn btn-primary form-control">Cek</button>

                </div>

              </div>

          </div>

        </div>

      </div>

    </div>



    <div class="row mt-4">

      <div class="col-12 mb-4">

        <?php if (isset($_SESSION['hasil'])) : ?>

          <div class="alert alert-<?= $_SESSION['hasil']['alert']; ?> alert-dismissible fade show  mb-0" role="alert">

            <?= $_SESSION['hasil']['pesan']; ?>

            <button type="button" class="close" data-dismiss="alert" aria-label="Close">

              <span aria-hidden="true">&times;</span>

            </button>

          </div><br>

        <?php endif; ?>

        <?php unset($_SESSION['hasil']); ?>

        <!-- <div class="alert alert-warning">

                    <h5>

                        * Klik Kode ID Order untuk melihat detail Orderan!<br>



                    </h5>

                </div> -->

        <!-- <div class="card">

                    <div class="card-body">

                        <table class="data-table data-table-feature table-responsive col-12">

                            <thead>

                                <tr>

                                    <th>Tanggal & waktu</th>

                                    <th>Pengguna</th>

                                    <th>Kode</th>

                                    <th>Invoice</th>

                                    <th>Akun</th>

                                    <th>Saldo</th>

                                    <th>Deskripsi</th>

                                    <th>Pengirim</th>

                                    <th>Status</th>



                                </tr>

                            </thead>

                            <tbody>

                                <?php foreach ($data['mutasigopay'] as $data_layanan) : ?>

                                    <?php if ('read' == $data_layanan['status']) {
                                      $label = 'danger';
                                    } elseif ('unread' == $data_layanan['status']) {
                                      $label = 'success';
                                    }
                                    ?> <tr>



                                        <td><?php echo $data_layanan['date']; ?></td>

                                        <td><?php echo $data_layanan['user']; ?></td>

                                        <td><?php echo $data_layanan['code']; ?></td>

                                        <td><?php echo $data_layanan['invoice']; ?></td>

                                        <td><span class="badge badge-primary"><?php echo $data_layanan['account']; ?></td>

                                        <td><span class="badge badge-success">Rp <?php echo number_format($data_layanan['amount'], 0, ',', '.'); ?></td>

                                        <td><?php echo $data_layanan['descript']; ?></td>

                                        <td><span class="badge badge-warning"><?php echo $data_layanan['sender']; ?></td>

                                        <td><label class="btn btn-sm btn-<?php echo $label; ?>"><?php if ('unread' == $data_layanan['status']) { ?>Aktif</i></span><?php } else { ?>Sudah Digunakan</span><?php } ?></label></td>

                                    </tr>

                                <?php endforeach; ?>

                            </tbody>

                        </table>

                    </div>

                </div> -->

      </div>

    </div>

  </div>





</main>