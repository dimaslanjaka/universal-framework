<?php

header('Content-Type: application/json');

class Api extends Controller
{
  protected $db;
  protected $dbh;
  protected $apikey;
  protected $status;
  protected $username;

  public function __construct()
  {
    $this->dbh = new Database();
    $this->db = $this->dbh->connect();

    if (!isset($_POST['api_key'])) {
      $respon = [
        'status' => false,
        'pesan' => 'Permintaan tidak sesuai',
      ];
      echo json_encode($respon, JSON_PRETTY_PRINT);
      die;
    } else {
      $key = $_POST['api_key'];
      $cekapi = $this->db->prepare("SELECT count(*) FROM api WHERE api_key = '$key'");
      $cekapi->execute();
      if ($cekapi->fetch(PDO::FETCH_COLUMN) > 0) {
        $this->apikey = $key;
        $aapi = $this->db->prepare("SELECT * FROM api WHERE api_key = '$key'");

        $aapi->execute();
        $dataapi = $aapi->fetch();
        $this->username = $dataapi['user'];
        if ($dataapi['ip'] != get_client_ip()) {
          $respon = [
            'status' => false,
            'pesan' => 'Alamat IP tidak sesuai',
          ];
          echo json_encode($respon, JSON_PRETTY_PRINT);
          die;
        } elseif ('OF' == $dataapi['status']) {
          $respon = [
            'status' => false,
            'pesan' => 'IP Tersebut sedang tidak aktif',
          ];
          echo json_encode($respon, JSON_PRETTY_PRINT);
          die;
        }
      } else {
        $respon = [
          'status' => false,
          'pesan' => 'Api Key salah',
        ];
        echo json_encode($respon, JSON_PRETTY_PRINT);
        die;
      }
    }
  }

  public function index()
  {
    echo 'INI HALAMAN API';
  }

  public function layanan()
  {
    $tipe = $_POST['tipe'];
    if ('Sosial Media' == $tipe) {
      $this->dbh->query('SELECT * FROM layanan_sosmed');
      $this->dbh->execute();
      foreach ($this->dbh->resultSet() as $rows) {
        $hasilnya = '-';
        $data[] = ['sid' => $rows['service_id'], 'kategori' => $rows['kategori'], 'layanan' => $rows['layanan'], 'catatan' => $rows['catatan'], 'min' => $rows['min'], 'max' => $rows['max'], 'harga' => $rows['harga_api'], 'status' => $rows['status']];
      }
      $respon = [
        'status' => true,
        'data' => $data,
      ];
    } elseif ('PPOB' == $tipe) {
      $this->dbh->query('SELECT * FROM layanan_pulsa');
      $this->dbh->execute();
      foreach ($this->dbh->resultSet() as $rows) {
        $hasilnya = '-';
        $data[] = ['sid' => $rows['service_id'], 'operator' => $rows['operator'], 'layanan' => $rows['layanan'], 'harga' => $rows['harga_api'], 'status' => $rows['status'], 'tipe' => $rows['tipe']];
      }
      $respon = [
        'status' => true,
        'data' => $data,
      ];
    } else {
      $respon = [
        'status' => false,
        'data' => 'Tipe tidak ditemukan',
      ];
    }
    echo json_encode($respon, JSON_PRETTY_PRINT);
  }

  // api order

  public function order()
  {
    $datauser = $data['user'] = $this->model('Home_model')->datauser($this->username);
    $username = $this->username;
    $tipe = $_POST['tipe'];
    if ('Sosial Media' == $tipe) {
      if (isset($_POST['id']) && isset($_POST['target']) && isset($_POST['jumlah'])) {
        $id = filter($_POST['id']);
        $target = filter($_POST['target']);
        $jumlah = filter($_POST['jumlah']);

        $data_layanan = $this->model('Order_model')->ceklayanansosmed($id);

        $layanan = $data_layanan['layanan'];
        $kategori = $data_layanan['kategori'];

        $order_id = acak_nomor(3) . acak_nomor(4);
        $cek_harga = $data_layanan['harga_api'] / 1000;
        $harga = $cek_harga * $jumlah;
        $provider = $data_layanan['provider'];
        $post_comments = $_POST['comments'];
        if ('Instagram Likes' == $data_layanan['kategori'] and 'Instagram Likes Indonesia' and 'Instagram Likes [Targeted Negara]' and 'Instagram Likes/Followers Per Minute') {
          $start_count = likes_count($target);
        } elseif ('Instagram Followers No Refill/Not Guaranteed' == $data_layanan['kategori'] and 'Instagram Followers Indonesia' and 'Instagram Followers [Negara]' and 'Instagram Followers [Refill] [Guaranteed] [NonDrop]') {
          $start_count = followers_count($target);
        } elseif ('Instagram Views' == $data_layanan['kategori']) {
          $start_count = views_count($target);
        } else {
          $start_count = 0;
        }

        $provider = $data_layanan['provider'];
        $data_provider = $this->model('Order_model')->cekprovider($provider, 'sosmed');
        $order_id = acak_nomor(3) . acak_nomor(4);

        if (false == $data_layanan) {
          $respon = [
            'status' => false,
            'data' => 'Layanan tidak tersedia',
          ];
        } elseif ($data_layanan['min'] > $jumlah) {
          $respon = [
            'status' => false,
            'data' => 'Minimal pesanan tidak sesuai',
          ];
        } elseif ($data_layanan['max'] < $jumlah) {
          $respon = [
            'status' => false,
            'data' => 'Maximal pesanan tidak sesuai',
          ];
        } elseif ($datauser['saldo_top_up'] < $harga) {
          $respon = [
            'status' => false,
            'data' => 'Saldo tidak cukup',
          ];
        } else {
          if ('MANUAL' == $provider) {
            $api_postdata = '';
          } elseif ('IRVANKEDE' == $provider) {
            if (false == $post_comments) {
              $postdata = 'api_id=' . $data_provider['api_id'] . '&api_key=' . $data_provider['api_key'] . '&service=' . $data_layanan['provider_id'] . "&target=$target&quantity=$jumlah";
            } elseif (true == $post_comments) {
              $postdata = 'api_id=' . $data_provider['api_id'] . '&api_key=' . $data_provider['api_key'] . '&service=' . $data_layanan['provider_id'] . "&target=$target&custom_comments=$post_comments";
            }
            $url = 'https://irvankede-smm.co.id/api/order';
          } elseif ('MEDANPEDIA' == $provider) {
            if (false == $post_comments) {
              $postdata = 'api_id=' . $data_provider['api_id'] . '&api_key=' . $data_provider['api_key'] . '&service=' . $data_layanan['provider_id'] . "&target=$target&quantity=$jumlah";
            } elseif (true == $post_comments) {
              $postdata = 'api_id=' . $data_provider['api_id'] . '&api_key=' . $data_provider['api_key'] . '&service=' . $data_layanan['provider_id'] . "&target=$target&custom_comments=$post_comments";
            }
            $url = 'https://medanpedia.co.id/api/order';
          } else {
            die('system error');
          }

          $result = $this->model('Order_model')->apisosmed($url, $postdata);

          if ('IRVANKEDE' == $provider and false == $result['status']) {
            $respon = [
              'status' => false,
              'data' => 'Server maintenance',
            ];
          } elseif ('MEDANPEDIA' == $provider and false == $result['status']) {
            if ('Saldo tidak mencukupi' == $result['data']) {
              $respon = [
                'status' => false,
                'data' => 'Server sedang gangguan, silahkan coba beberapa saat lagi',
              ];
            } else {
              $respon = [
                'status' => false,
                'data' => 'Server maintenance',
              ];
            }
          } else {
            if ('IRVANKEDE' == $provider) {
              $provider_oid = $result['data']['id'];
            } elseif ('MEDANPEDIA' == $provider) {
              $provider_oid = $result['data']['id'];
            }

            $top_layanan = $this->model('Order_model')->toplayanan($layanan);
            $top_user = $this->model('Order_model')->topuser($username);
            if ($this->model('Order_model')->insertordersosmed($order_id, $provider_oid, $layanan, $target, $jumlah, $start_count, $harga, $provider, 'API', $username) > 0) {
              $this->model('Order_model')->insertsemuapembelian($order_id, $kategori, $layanan, $harga, $target, $username, 'API');
              $updateuser = $this->model('Order_model')->updateuser($harga, $username);
              $insertriwayat = $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo Melalui Pemesanan (API) Sosial Media Dengan Kode Pesanan : WEB-' . $order_id, $username);

              $total = $top_user['total'];
              $jumlah3 = $top_user['jumlah'];
              if (false == $top_user) {
                $this->model('Order_model')->inserttopuser($username, $harga);
              } else {
                $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga, $username);
              }
              if (false == $top_layanan) {
                $this->model('Order_model')->inserttoplayanan($layanan, $harga);
              } else {
                $this->model('Order_model')->updatetoplayanan($total, $jumlah3, $harga, $layanan);
              }
              $jumlah2 = number_format($jumlah, 0, ',', '.');

              $respon = ['status' => true, 'data' => ['id' => $order_id, 'start_count' => $start_count]];
            } else {
              $respon = [
                'status' => false,
                'data' => 'Server Maintenance (12)',
              ];
            }
          }
        }
      } else {
        $respon = [
          'status' => false,
          'data' => 'Parameter tidak sesuai',
        ];
      }
    } elseif ('PPOB' == $tipe) {
      if (isset($_POST['id']) && isset($_POST['target'])) {
        $layanan = $_POST['id'];
        $target = filter($_POST['target']);

        $data_layanan = $this->model('Order_model')->ceklayananppob($layanan);
        $harga = $data_layanan['harga'];
        $namalayanan = $data_layanan['layanan'];
        $operator = $data_layanan['operator'];

        $provider = $data_layanan['provider'];
        $data_provider = $this->model('Order_model')->cekprovider($provider, 'ppob');
        $order_id = acak_nomor(3) . acak_nomor(4);

        if (false == $data_layanan) {
          $respon = [
            'status' => false,
            'data' => 'Layanan tidak tersedia',
          ];
        } elseif ($datauser['saldo_top_up'] < $harga) {
          $respon = [
            'status' => false,
            'data' => 'Saldo tidak cukup',
          ];
        } else {
          $api_link = $data_provider['link'];
          $api_key = $data_provider['api_key'];
          $api_id = $data_provider['api_id'];

          if ('MANUAL' == $provider) {
            $api_postdata = '';
          } elseif ('DG-PULSA' == $provider) {
            $sign = md5($api_id . $api_key . $order_id);
            $api_postdata = [
              'username' => $api_id,
              'buyer_sku_code' => $data_layanan['provider_id'],
              'customer_no' => "$target",
              'ref_id' => $order_id,
              'sign' => $sign,
              'testing' => true,
            ];
            $header = [
              'Content-Type: application/json',
            ];
          } else {
            die('System Error!');
          }
          $result = $this->model('Order_model')->apippob($api_link, $api_postdata, $header);
          if ('DG-PULSA' == $provider && 'Gagal' == $result['data']['status']) {
            if ('Saldo tidak cukup' == $result['data']['message']) {
              $respon = [
                'status' => false,
                'data' => 'Server maintenance (101)',
              ];
            } else {
              $respon = [
                'status' => false,
                'data' => $result['data']['message'],
              ];
            }
          } else {
            if ('DG-PULSA' == $provider) {
              $provider_oid = $order_id;
            }
            $top_user = $this->model('Order_model')->topuser($username);
            if ($this->model('Order_model')->insertorderppob($order_id, $provider_oid, $namalayanan, $harga, $target, $provider, 'API', $username) > 0) {
              $this->model('Order_model')->updateuser($harga, $username);
              $insertriwayat = $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo  Melalui Pemesanan (API) PPOB Dengan Kode Pesanan : WEB-.' . $order_id, $username);
              $this->model('Order_model')->insertsemuapembelian($order_id, $operator, $namalayanan, $harga, $target, $username, 'API');
              $total = $top_user['total'];
              $jumlah3 = $top_user['jumlah'];
              if (false == $top_user) {
                $this->model('Order_model')->inserttopuser($username, $harga);
              } else {
                $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga, $username);
              }
              $jumlah2 = number_format($harga, 0, ',', '.');

              $respon = [
                'status' => true,
                'data' => ['id' => $order_id],
              ];
            } else {
              $respon = [
                'status' => false,
                'data' => 'Server maintenance (103)',
              ];
            }
          }
        }
      } else {
        $respon = [
          'status' => false,
          'data' => 'Parameter tidak sesuai',
        ];
      }
    } else {
      $respon = [
        'status' => false,
        'data' => 'Tipe tidak ditemukan',
      ];
    }
    echo json_encode($respon, JSON_PRETTY_PRINT);
  }

  // api profile

  public function profile()
  {
    $key = $this->apikey;
    $cekuser = $this->db->prepare("SELECT count(*) FROM users WHERE api_key = '$key' ");
    $cekuser->execute();
    if ($cekuser->fetch(PDO::FETCH_COLUMN) > 0) {
      $cekuser2 = $this->db->prepare("SELECT * FROM users WHERE api_key = '$key'");
      $cekuser2->execute();
      $datauser = $cekuser2->fetch();
      $data[] = [
        'username' => $datauser['username'],
        'saldo' => $datauser['saldo_top_up'],
      ];
      $respon = [
        'status' => true,
        'data' => $data,
      ];
    } else {
      $respon = [
        'status' => false,
        'pesan' => 'Pengguna tidak ditemukan',
      ];
    }
    echo json_encode($respon, JSON_PRETTY_PRINT);
  }

  // api status
  public function status()
  {
    $username = $this->username;
    $tipe = $_POST['tipe'];
    if ('Sosial Media' == $tipe) {
      if (isset($_POST['id'])) {
        $order_id = trim($_POST['id']);
        $cek_pesanan = $this->db->prepare("SELECT * FROM pembelian_sosmed WHERE oid = '$order_id' AND user = '$username'");
        $cek_pesanan->execute();
        $data_pesanan = $cek_pesanan->fetch();
        if (false == $data_pesanan) {
          $respon = ['status' => false, 'data' => ['pesan' => 'Id pesanan tidak di temukan']];
        } else {
          $respon = ['status' => true, 'data' => ['id' => $data_pesanan['oid'], 'status' => $data_pesanan['status'], 'start_count' => $data_pesanan['start_count'], 'remains' => $data_pesanan['remains']]];
        }
      } else {
        $respon = ['status' => false, 'data' => ['pesan' => 'Ups, Permintaan Tidak Sesuai.']];
      }
    } elseif ('PPOB' == $tipe) {
      if (isset($_POST['id'])) {
        $order_id = trim($_POST['id']);
        $cek_pesanan = $this->db->prepare("SELECT * FROM pembelian_pulsa WHERE oid = '$order_id' AND user = '$username'");
        $cek_pesanan->execute();
        $data_pesanan = $cek_pesanan->fetch();
        if (false == $data_pesanan) {
          $respon = ['status' => false, 'data' => ['pesan' => 'Id pesanan tidak di temukan']];
        } else {
          $respon = ['status' => true, 'data' => ['id' => $data_pesanan['oid'], 'status' => $data_pesanan['status'], 'keterangan' => $data_pesanan['keterangan']]];
        }
      } else {
        $respon = ['status' => false, 'data' => ['pesan' => 'Ups, Permintaan Tidak Sesuai.']];
      }
    }
    echo json_encode($respon, JSON_PRETTY_PRINT);
  }
}
