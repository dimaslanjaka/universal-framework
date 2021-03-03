<?php

class Ambildata extends Controller
{
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();
  }

  public function index()
  {
    header('Location:' . BASEURL . 'home');
  }

  public function kategorisosmed($code)
  {
    $data_provider = $this->model('Ambildata_model')->providersosmed($code);
    $api_id = $data_provider['api_id'];
    $api_key = $data_provider['api_key'];
    $link = $data_provider['link_service'];

    $postdata = [
      'api_id' => $api_id,
      'api_key' => $api_key,
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $link);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $chresult = curl_exec($ch);
    $result = json_decode($chresult, true);
    if (false == $result['status']) {
      echo $result['data'];
      die;
    } else {
      $jumlah = 1;
      foreach ($result['data'] as $data) {
        $cek_kategori = $this->model('Ambildata_model')->cekkategori($data['category']);
        if ($cek_kategori > 0) {
          echo $data['category'] . ' ==>  sudah ada di database';
          echo '<br>';
        } else {
          $input_kategori = $this->model('Ambildata_model')->inputkategori($data['category']);
          if ($input_kategori > 0) {
            echo '.' . $data['category'] . ' ==>  Berhasil di tambahkan';
            echo '<br>';
          } else {
            echo 'gagal menambahkan';
            echo '<br>';
          }
        }
      }
    }
  }

  public function layanansosmed($code)
  {
    $data_provider = $this->model('Ambildata_model')->providersosmed($code);
    $api_id = $data_provider['api_id'];
    $api_key = $data_provider['api_key'];
    $link = $data_provider['link_service'];

    $postdata = [
      'api_id' => $api_id,
      'api_key' => $api_key,
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $link);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $chresult = curl_exec($ch);
    $result = json_decode($chresult, true);

    $jumlah = 0;
    foreach ($result['data'] as $data) {
      $name = $data['name'];
      $name = strtr($data['name'], [
        ' MEDANPEDIA' => WEB_NAME,
        ' Medanpedia' => WEB_NAME,
        ' medanpedia' => WEB_NAME,
        ' MP' => WEB_NAME,
        ' mp' => WEB_NAME,
        ' MP' => WEB_NAME,
      ]);
      if (isset($data['description'])) {
        $deskripsi = $data['description'];
      } else {
        $deskripsi = $data['note'];
      }
      $cek_layanan = $this->model('Ambildata_model')->ceklayanansosmed($data['id']);
      if ($cek_layanan > 0) {
        echo $data['name'] . '  Sudah ada di database';
        echo '<br>';
      } else {
        $input_kategori = $this->model('Ambildata_model')->inputlayanansosmed($data['id'], $data['category'], $name, $data['price'], $data['min'], $data['max'], $deskripsi, $code);
        if ($input_kategori > 0) {
          echo '.' . $data['name'] . ' Berhasil di tambahkan';
          echo '<br>';
          ++$jumlah;
        } else {
          echo 'gagal menambahkan';
          echo '<br>';
        }
      }
    }
    echo '<div style="position:fixed; left:500px; top:10px;">Total data yang masuk ke database :' . $jumlah . '</div>';
  }

  public function kategorippob()
  {
    $data_provider = $this->model('Ambildata_model')->providerppob('DG-PULSA');
    $p_apiid = $data_provider['api_id'];
    $p_apikey = $data_provider['api_key'];
    $url = 'https://api.digiflazz.com/v1/price-list';
    $sign = md5("$p_apiid+$p_apikey+pricelist");

    $data = [
      'username' => $p_apiid,
      'sign' => $sign,
    ];
    $header = [
      'Content-Type: application/json',
    ];

    $response = $this->model('Ambildata_model')->curldigiflaz($url, $data, $header);

    $result = json_decode($response);
    $tambah = 0;

    foreach ($result->data as $data) {
      $category = $data->brand;
      $kategori = $data->type;
      $type = $data->category;

      // ini khusus data dan pulsa , memisahkan kategori
      if ('Data' == $type || 'Pulsa' == $type) {
        $this->dbh->query("SELECT count(*) FROM kategori_lainnya WHERE kategori = '$kategori' AND operator = '$category'");
        if (0 == $this->dbh->hitungBaris2()) {
          $insertkatlainnya = $this->db->prepare("INSERT INTO kategori_lainnya VALUES('','$category','$kategori','$type')");
          $insertkatlainnya->execute();
        }
      }
      // sampai sini

      $type2 = strtr($type, [
        'Paket SMS & Telpon' => 'Paket SMS Telpon',
        'China TOPUP' => 'Pulsa Internasional',
        'Malaysia TOPUP' => 'Pulsa Internasional',
        'Philippines TOPUP' => 'Pulsa Internasional',
        'Singapore TOPUP' => 'Pulsa Internasional',
        'Thailand TOPUP' => 'Pulsa Internasional',
        'Vietnam TOPUP' => 'Pulsa Internasional',
      ]);

      $cekkategori = $this->model('Ambildata_model')->cekkategorippob($category, $type2);
      if ($cekkategori > 0) {
        echo '.' . $category . ' Sudah ada di database';
        echo '<br>';
      } else {
        $input = $this->model('Ambildata_model')->inputkategorippob($category, $type2);

        if ($input > 0) {
          echo '.' . $category . ' Berhasil diinput ke database database';
          echo '<br>';
          ++$tambah;
        } else {
          echo 'gagal input';
          echo '<br>';
        }
      }
    }
    echo '<div style="position:fixed; left:500px; top:10px;">Total data yang masuk ke database :' . $tambah . '</div>';
  }

  public function layananppob()
  {
    $data_provider = $this->model('Ambildata_model')->providerppob('DG-PULSA');
    $p_apiid = $data_provider['api_id'];
    $p_apikey = $data_provider['api_key'];
    $url = 'https://api.digiflazz.com/v1/price-list';
    $sign = md5("$p_apiid+$p_apikey+pricelist");

    $data = [
      'username' => $p_apiid,
      'sign' => $sign,
    ];
    $header = [
      'Content-Type: application/json',
    ];
    $response = $this->model('Ambildata_model')->curldigiflaz($url, $data, $header);

    $result = json_decode($response);
    $tambah = 0;
    foreach ($result->data as $data) {
      $sid = $data->buyer_sku_code;
      $category = $data->brand;
      $kategori = $data->type;
      $type = $data->category;
      $service = $data->product_name;
      $description = $data->desc;
      $price = $data->price;
      $ht_status = $data->buyer_product_status;
      $type2 = strtr($type, [
        'Paket SMS & Telpon' => 'Paket SMS Telpon',
        'China TOPUP' => 'Pulsa Internasional',
        'Malaysia TOPUP' => 'Pulsa Internasional',
        'Philippines TOPUP' => 'Pulsa Internasional',
        'Singapore TOPUP' => 'Pulsa Internasional',
        'Thailand TOPUP' => 'Pulsa Internasional',
        'Vietnam TOPUP' => 'Pulsa Internasional',
        'TV' => 'Streaming',
      ]);

      $ceklayanan = $this->model('Ambildata_model')->ceklayananppob($sid);
      if ($ceklayanan > 0) {
        echo "<br>Layanan Sudah Ada Di Database => $service | $sid \n <br />";
      } else {
        $input = $this->model('Ambildata_model')->inputlayananppob($sid, $category, $service, $description, $price, $ht_status, $type2, $kategori);
        if ($input > 0) {
          echo "===============<br>Layanan Top Up Berhasil Di Tambahkan<br><br>ID Layanan : $sid<br>Operator : $category<br>Nama Layanan : $service<br>Tipe : $type<br>Deskripsi : $description<br>Status : $ht_status<br>===============<br>";
          ++$tambah;
        } else {
          echo 'gagal input';
          echo '<br>';
        }
      }
    }
    echo '<div style="position:fixed; left:500px; top:10px;">Total data yang masuk ke database :' . $tambah . '</div>';
  }

  public function kategoripascabayar()
  {
    $data_provider = $this->model('Ambildata_model')->providerppob('DG-PULSA');
    $p_apiid = $data_provider['api_id'];
    $p_apikey = $data_provider['api_key'];

    $url = 'https://api.digiflazz.com/v1/price-list';
    $sign = md5("$p_apiid+$p_apikey+pricelist");

    $data = [
      'cmd' => 'pasca',
      'username' => $p_apiid,
      'sign' => $sign,
    ];
    $header = [
      'Content-Type: application/json',
    ];
    $response = $this->model('Ambildata_model')->curldigiflaz($url, $data, $header);

    $result = json_decode($response, true);
    foreach ($result['data'] as $data) {
      $category = $data['brand'];
      $type2 = $data['category'];
      $tambah = 0;

      $cekkategori = $this->model('Ambildata_model')->cekkategorippob($category, $type2);
      if ($cekkategori > 0) {
        echo '.' . $category . ' Sudah ada di database';
        echo '<br>';
      } else {
        $input = $this->model('Ambildata_model')->inputkategorippob($category, $type2);
        if ($input > 0) {
          echo '.' . $category . ' Berhasil diinput ke database database';
          echo '<br>';
          ++$tambah;
        } else {
          echo 'gagal input';
          echo '<br>';
        }
      }

      echo '<div style="position:fixed; left:500px; top:10px;">Total data yang masuk ke database :' . $tambah . '</div>';
    }
  }

  public function layananpascabayar()
  {
    $data_provider = $this->model('Ambildata_model')->providerppob('DG-PULSA');
    $p_apiid = $data_provider['api_id'];
    $p_apikey = $data_provider['api_key'];

    $url = 'https://api.digiflazz.com/v1/price-list';
    $sign = md5("$p_apiid+$p_apikey+pricelist");

    $data = [
      'cmd' => 'pasca',
      'username' => $p_apiid,
      'sign' => $sign,
    ];
    $header = [
      'Content-Type: application/json',
    ];
    $response = $this->model('Ambildata_model')->curldigiflaz($url, $data, $header);

    $result = json_decode($response);

    foreach ($result->data as $data) {
      $sid = $data->buyer_sku_code;
      $category = $data->brand;
      $type = $data->category;
      $service = $data->product_name;
      $ht_status = $data->buyer_product_status;

      // end get data service

      if (true == $ht_status) {
        $status = 'Normal';
      } elseif (false == $ht_status) {
        $status = 'Gangguan';
      }

      $ceklayanan = $this->model('Ambildata_model')->ceklayananpascabayar($sid);
      if ($ceklayanan > 0) {
        echo "<br>Layanan Sudah Ada Di Database => $service | $sid \n <br />";
      } else {
        $input = $this->model('Ambildata_model')->inputlayananpascabayar($sid, $category, $service, $type, $ht_status);
        if ($input > 0) {
          echo "===============<br>Layanan Pascabayar Berhasil Di Tambahkan<br><br>ID Layanan : $sid<br>Kategori : $category<br>Nama Layanan : $service<br>Tipe : $type<br>Status : $status<br>===============<br>";
        } else {
          echo 'gagal input';
          echo '<br>';
        }
      }
    }
  }

  public function cektagihan()
  {
    $data_provider = $this->model('Ambildata_model')->providerppob('DG-PULSA');
    $order_id = acak_nomor(3) . acak_nomor(4);
    $api_key = $data_provider['api_key'];
    $api_id = $data_provider['api_id'];

    $url = 'https://api.digiflazz.com/v1/transaction';
    $sign = md5($api_id . $api_key . $order_id);

    $api_postdata = [
      'commands' => 'inq-pasca',
      'username' => $api_id,
      'buyer_sku_code' => 'pln',
      'customer_no' => '530000000001',
      'ref_id' => $order_id,
      'testing' => true,
      'sign' => $sign,
    ];
    $header = [
      'Content-Type: application/json',
    ];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($api_postdata));
    $chresult = curl_exec($ch);
    curl_close($ch);
    $json_result = json_decode($chresult, true);
    $result = json_decode($chresult);
    var_dump($result);
  }

  public function statussosmed($provider)
  {
    if ('MEDANPEDIA' == $provider) {
      $url = 'https://medanpedia.co.id/api/status';
    } elseif ('IRVANKEDE' == $provider) {
      $url = 'https://api.irvankede-smm.co.id/status';
    }

    $check_order = $this->model('Ambildata_model')->cekordersosmed($provider);

    if (false == $check_order) {
      die('Pesanan Berstatus Pending Tidak Ditemukan.');
    } else {
      foreach ($check_order as $data_order) {
        $o_oid = $data_order['oid'];
        $o_poid = $data_order['provider_oid'];
        $o_provider = $data_order['provider'];
        $username = $data_order['user'];
        $layanan = $data_order['layanan'];
        $tujuan = $data_order['target'];

        $data_user = $this->model('Home_model')->datauser($username);
        $nohp = $data_user['no_hp'];

        if ('MANUAL' == $o_provider) {
          echo 'Pesanan Manual<br />';
        } else {
          $getService = $this->db->prepare("SELECT * FROM layanan_sosmed WHERE layanan = '$layanan' AND provider = '$provider'");
          $getService->execute();
          $getDataService = $getService->fetchAll();

          $data_provider = $this->model('Ambildata_model')->providersosmed($provider);

          $p_apikey = $data_provider['api_key'];
          $p_api_id = $data_provider['api_id'];

          $postdata = [
            'api_id' => $p_api_id,
            'api_key' => $p_apikey,
            'id' => $o_poid,
          ];
          // echo json_encode($data);
          $ch = curl_init();
          curl_setopt($ch, CURLOPT_URL, $url);
          curl_setopt($ch, CURLOPT_POST, 1);
          curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
          curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
          curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
          $chresult = curl_exec($ch);
          $result = json_decode($chresult, true);

          // echo $result;
          $sn = $result['data']['status'];
          if (isset($result['status']) and true == $result['status']) {
            if ('Success' == $sn) {
              $status = 'Success';
            } elseif ('Error' == $sn) {
              $status = 'Error';
            } elseif ('Partial' == $sn) {
              $status = 'Partial';
            } elseif ('Processing' == $sn) {
              $status = 'Processing';
            } else {
              $status = 'Pending';
            }

            $start_count = (isset($result['data']['start_count'])) ? $result['data']['start_count'] : 0;
            $remains = (isset($result['data']['remains'])) ? $result['data']['remains'] : 0;
            $update_order2 = $this->db->prepare("UPDATE semua_pembelian SET status = '$status' WHERE id_pesan = '$o_oid'");
            $update_order2->execute();
            $update_order = $this->db->prepare("UPDATE pembelian_sosmed SET status = '" . $status . "', remains = '" . $remains . "', start_count = '" . $start_count . "',  date = '" . date('Y-m-d') . "' WHERE oid = '$o_oid'");
            $update_order->execute();
            if ($update_order->rowCount() > 0) {
              // kirim notif wa jika status sukses
              if ('Success' == $status) {
                $sendwa = new Menzwa();

                $msg =
                  '
*Pesanan anda dengan layanan ' . $layanan . ', Id #' . $o_oid . ' Telah sukses.*
Tujuan :  ' . $tujuan . '
Jumlah : ' . $data_order['jumlah'] . '
';
                $sendwa->sendMessage($nohp, $msg);
              }
              ///
              echo "===============<br>Berhasil Menampilkan Data Status Sosmed<br><br>ID Pesanan : $o_oid<br>Remains : $remains<br>Status : $status<br>===============<br>";
            } else {
              echo 'Gagal Menampilkan Data Status Sosmed.<br />';
            }
          }
        }
      }
    }
  }

  public function statusppob()
  {
    $sendwa = new Menzwa();
    $check_order = $this->model('Ambildata_model')->cekorderppob('DG-PULSA');

    if (false == $check_order) {
      die('Pesanan Berstatus Pending Tidak Ditemukan.');
    } else {
      foreach ($check_order as $data_order) {
        $o_oid = $data_order['oid'];
        $o_poid = $data_order['provider_oid'];
        $o_provider = $data_order['provider'];
        $username = $data_order['user'];
        $layanan = $data_order['layanan'];
        $provider = $data_order['provider'];

        $getService = $this->db->prepare("SELECT * FROM layanan_pulsa WHERE layanan = '$layanan' AND provider = 'DG-PULSA'");
        $getService->execute();
        $getDataService = $getService->fetch();
        $data_provider = $this->model('Ambildata_model')->providerppob('DG-PULSA');

        $p_apikey = $data_provider['api_key'];
        $p_api_id = $data_provider['api_id'];

        $url = 'https://api.digiflazz.com/v1/transaction';
        $sign = md5("$p_api_id" . "$p_apikey" . $o_oid);

        $header = [
          'Content-Type: application/json',
        ];

        $data = [
          'command' => 'status-pasca',
          'username' => $p_api_id,
          'buyer_sku_code' => $getDataService['service_id'],
          'customer_no' => $data_order['target'],
          'ref_id' => $o_oid,
          'sign' => $sign,
        ];
        // echo json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        $result = curl_exec($ch);
        $result = json_decode($result, true);
        // echo $result;

        $sn = $result['data']['sn'];
        $ht_status = $result['data']['status'];

        if ('Pending' == $ht_status) {
          $status = 'Pending';
        } elseif ('Gagal' == $ht_status) {
          $status = 'Error';
        } elseif ('Sukses' == $ht_status) {
          $status = 'Success';
        }

        $datauser = $this->model('Home_model')->datauser($username);
        $nohp = $datauser['no_hp'];
        if ('Sukses' == $ht_status) {
          $msg =
            '
    *PESANAN ANDA TELAH SUKSES*
    ---------------------------
    id order : *' . $o_oid . '*
    Layanan : *' . $layanan . '*
    Status : *' . $status . '*
    No sn/keterangan : *' . $sn . '*
    ';
          $sendwa->sendMessage($nohp, $msg);
        } elseif ('Gagal' == $ht_status) {
          $msg =
            '
*Yah Pesananmu gagal:(*
---------------------------
id order : *' . $o_oid . '*
Layanan : *' . $layanan . '*
Status : *' . $status . '*
keterangan : *' . $sn . '*
';
          $sendwa->sendMessage($nohp, $msg);
        }
        $update11 = $this->db->prepare("UPDATE semua_pembelian SET status = '$status' WHERE id_pesan = '$o_oid'");
        $update11->execute();
        $update22 = $this->db->prepare("UPDATE pembelian_pulsa SET status = '$status', keterangan = '$sn' WHERE oid = '$o_oid'");
        $update22->execute();
        if ($update11->rowCount() > 0 and $update22->rowCount() > 0) {
          echo "===============<br>Berhasil Menampilkan Data Status Top Up<br><br>ID Pesanan : $o_oid<br>Keterangan : $sn<br>Status : $status<br>===============<br>";
        } else {
          echo 'Gagal Menampilkan Data Status Top Up.<br />';
        }
      }
    }
  }

  //CALLBACK DIGIFLAZ
  public function callbackdigiflaz()
  {
    $sendwa = new Menzwa();

    $get = file_get_contents('php://input');
    $header = getallheaders();

    function DFStatus($x)
    {
      if ('Transaksi Pending' == $x) {
        $str = 'Pending';
      }
      if ('Transaksi Gagal' == $x) {
        $str = 'Error';
      }
      if ('Transaksi Sukses' == $x) {
        $str = 'Success';
      }

      return (!$str) ? 'Pending' : $str;
    }

    if (isset($header['x-digiflazz-event']) && isset($header['x-digiflazz-delivery']) && isset($header['x-hub-signature']) && in_array($header['User-Agent'], ['Digiflazz-Hookshot', 'DigiFlazz-Pasca-Hookshot'])) {
      $array = json_decode($get, true)['data'];
      $json = json_encode($array);

      $status = DFStatus($array['message']);
      $trxid = $array['trx_id']; // ID Transaksi DigiFlazz
      $refid = $array['ref_id']; // ID Transaksi dari Panel
      $note = $array['sn'];
      $last = $array['buyer_last_saldo'];

      $format = $refid . ' -> ' . $array['message'] . '<br>' . $note;
      echo $format;

      $this->dbh->query("SELECT count(*) FROM pembelian_pulsa WHERE oid = '$refid' AND status = 'Pending'");
      $this->dbh->execute();
      if (1 == $this->dbh->hitungBaris2()) {
        // menampilkan data pesanan (array)
        $data_orderr = $this->db->prepare("SELECT * FROM pembelian_pulsa WHERE oid = '$refid'");
        $data_orderr->execute();
        $data_order = $data_orderr->fetch();
        $o_oid = $data_order['oid'];
        $username = $data_order['user'];
        $layanan = $data_order['layanan'];

        // data username
        $datauser = $this->model('Home_model')->datauser($username);
        $nohp = $datauser['no_hp'];

        // kirim wa
        if ('Success' == $status) {
          $msg =
            '
*PESANAN ANDA TELAH SUKSES*
---------------------------
id order : *' . $o_oid . '*
Layanan : *' . $layanan . '*
Status : *' . $status . '*
No sn/keterangan : *' . $note . '*
';
          $sendwa->sendMessage($nohp, $msg);
        } elseif ('Error' == $status) {
          $msg =
            '
*Yah Pesananmu gagal:(*
---------------------------
id order : *' . $o_oid . '*
Layanan : *' . $layanan . '*
Status : *' . $status . '*
keterangan : *' . $note . '*
';
          $sendwa->sendMessage($nohp, $msg);
        }

        $update = $this->db->prepare("UPDATE semua_pembelian SET status = '$status' WHERE id_pesan = '$refid'");
        $update->execute();
        $updatejuga = $this->db->prepare("UPDATE pembelian_pulsa SET status = '$status', keterangan = '$note' WHERE oid = '$refid'");
        $updatejuga->execute();
      }
    } else {
      echo 'Access Denied!';
    }
  }

  // mutasiiiii

  //mutasi ovo
  public function mutasiovo()
  {
    $data_ovo = $this->model('Admin_model')->accountovo();
    $ovo = new OVO($data_ovo['nomor'], $data_ovo['device']);
    $acc = $ovo->seeMutation($data_ovo['token'], 20);

    if (false == $acc['result']) {
      echo 'Ada kesalahan, login ulang akun ovo mu';
    } else {
      foreach ($acc['data'] as $data) {
        $invoice = $data['merchant_name'] . '/' . $data['merchant_invoice'];
        $account = $data['name'];
        $amount = $data['transaction_amount'];
        $desc = $data['desc1'];
        $sender = $data['desc3'];
        $datetime = $data['transaction_date'] . ' ' . $data['transaction_time'];

        $mutasiovo = $this->model('Ambildata_model')->cekmutasi('mutasi_ovo', 'invoice', $invoice);
        if ($mutasiovo > 0) {
          echo '<br> Data sudah ada di database <br>';
        } else {
          $cekdepo = $this->model('Ambildata_model')->cekdepositmutasi($amount);

          if (1 == $cekdepo) {
            $insertmutasi = $this->db->prepare("INSERT INTO mutasi_ovo VALUES ('','DEV','$invoice','$invoice','$account','$amount','$desc','$sender','$datetime')");
            $insertmutasi->execute();
            $updatemutasidepopsit = $this->model('Ambildata_model')->updatemutasi($amount, 'OVO');
            if ($updatemutasidepopsit > 0 && $insertmutasi->rowCount() > 0) {
              echo '' . $desc . ' RP ' . $amount . ' =>> berhasil di update <br>';
            } else {
              echo 'Kesalahan system (105), mohon infokan error ini ke dev';
            }
          } else {
            echo '<br>Data mutasi OVO yang terdeteksi tidak ada yang sesuai dengan data deposit user<br>';
          }
        }
      }
    }
  }

  public function mutasigopay()
  {
    $data_gopay = $this->model('Admin_model')->accountgopay();
    $gopay = new GojekPay($data_gopay['token']);
    $hasil = json_decode($gopay->getHistory(), true);
    if (isset($hasil['data']['success'])) {
      foreach ($hasil['data']['success'] as $data) {
        $amount = $data['amount'];
        $desc = $data['description'];
        $date = $data['transacted_at'];
        $invoice = $data['transaction_ref'];

        $mutasiovo = $this->model('Ambildata_model')->cekmutasi('mutasi_gopay', 'invoice', $invoice);
        if ($mutasiovo > 0) {
          echo '<br> Data sudah ada di database <br>';
        } else {
          $cekdepo = $this->model('Ambildata_model')->cekdepositmutasi($amount);

          if (1 == $cekdepo) {
            $insertmutasi = $this->db->prepare("INSERT INTO mutasi_gopay VALUES ('','$invoice','$amount','$desc','$date')");
            $insertmutasi->execute();
            $updatemutasidepopsit = $this->model('Ambildata_model')->updatemutasi($amount, 'GOPAY');
            if ($updatemutasidepopsit > 0 && $insertmutasi->rowCount() > 0) {
              echo '' . $desc . ' RP ' . $amount . ' =>> berhasil di update <br>';
            } else {
              echo 'Kesalahan system (105), mohon infokan error ini ke dev';
            }
          }
        }
      }
    }
  }

  public function getidalfamart()
  {
    $date = $this->date;
    $data_gopay = $this->model('Admin_model')->accountgopay();
    $gopay = new GojekPay($data_gopay['token']);
    $hasil = json_decode($gopay->getHistory(), true);
    if (isset($hasil['data']['success'])) {
      foreach ($hasil['data']['success'] as $data) {
        $desc = $data['description'];
        $carialfa = strpos($desc, '#Alfamart');
        if (is_int($carialfa)) {
          $id = substr($desc, 18, 15);
          $amount = $data['amount'];
          $cekvoucher = $this->model('Ambildata_model')->cekvoucher($id);
          if ($cekvoucher > 0) {
            echo $id . ' ==> Kode tersebut sudah ada di database dan masih aktif<br>';
          } else {
            $insertvoucher = $this->db->prepare("INSERT INTO kode_voucher VALUES ('','$id','$amount','Aktif','','$date','')");
            $insertvoucher->execute();
            if ($insertvoucher->rowCount() > 0) {
              echo $id . ' ==> Sudah dimasukan kedalam voucher dan bisa digunakan<br>';
            } else {
              echo 'Error (108), mohon infokan error ini ke developer';
            }
          }
        }
      }
    }
  }
}
