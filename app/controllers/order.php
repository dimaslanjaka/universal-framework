<?php

class Order extends Controller
{
  public function sosmed()
  {
    $kategori = filter($_POST['kategori']);
    $layanan = filter($_POST['layanan']);
    $target = filter($_POST['target']);
    $jumlah = filter($_POST['jumlah']);
    $min = $_POST['min'];
    $max = $_POST['max'];
    $pin = filter($_POST['pin']);
    $harga = filter($_POST['totalharga']);
    $post_comments = $_POST['comments'];
    $datauser = $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $username = $datauser['username'];

    $data_layanan = $this->model('Order_model')->ceklayanansosmed($layanan);

    $hitung = count(explode(PHP_EOL, $post_comments));
    $replace = str_replace("\r\n", '\r\n', $post_comments);
    $kategori = $data_layanan['kategori'];
    $layanan = $data_layanan['layanan'];
    $cek_harga = $data_layanan['harga'] / 1000;
    $hitung = count(explode(PHP_EOL, $post_comments));
    $replace = str_replace("\r\n", '\r\n', $post_comments);
    if (!empty($post_comments)) {
      $jumlah = $hitung;
    } else {
      $jumlah = $jumlah;
    }

    if (!empty($post_comments)) {
      $harga = $cek_harga * $hitung;
    } else {
      $harga = $cek_harga * $jumlah;
    }

    $provider = $data_layanan['provider'];
    $data_provider = $this->model('Order_model')->cekprovider($provider, 'sosmed');
    $order_id = acak_nomor(3) . acak_nomor(4);

    // Get Start Count
    if ('Instagram Likes' == $data_layanan['kategori'] and 'Instagram Likes Indonesia' and 'Instagram Likes [Targeted Negara]' and 'Instagram Likes/Followers Per Minute') {
      $start_count = likes_count($target);
    } elseif ('Instagram Followers No Refill/Not Guaranteed' == $data_layanan['kategori'] and 'Instagram Followers Indonesia' and 'Instagram Followers [Negara]' and 'Instagram Followers [Refill] [Guaranteed] [NonDrop]') {
      $start_count = followers_count($target);
    } elseif ('Instagram Views' == $data_layanan['kategori']) {
      $start_count = views_count($target);
    } else {
      $start_count = 0;
    }

    // validasi
    if (false == $data_layanan) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Layanan tidak tersedia!',
      ];
    } elseif ($pin != $datauser['pin']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Pin salah, cek kembali pin kamu!',
      ];
    } elseif ($datauser['saldo_top_up'] < $harga) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Saldo kamu tidak cukup untuk melakukan pesanan ini!',
      ];
    } elseif ($jumlah < $data_layanan['min']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Minimal Pesanan tidak sesuai!',
      ];
    } elseif ($jumlah > $data_layanan['max']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Maksimal pesanan tidak sesuai!',
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
      // api
      $result = $this->model('Order_model')->apisosmed($url, $postdata);

      if ('IRVANKEDE' == $provider and false == $result['status']) {
        $_SESSION['hasil'] = [
          'alert' => 'danger',
          'pesan' => 'Ups, Server Maintenance',
        ];
      } elseif ('MEDANPEDIA' == $provider and false == $result['status']) {
        if ('Saldo tidak mencukupi' == $result['data']) {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Ups, Server gangguan, silahkan coba beberapa saat lagi',
          ];
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Ups, Server Maintenance',
          ];
        }
        header('Location:' . BASEURL . 'home');
        die;
      } else {
        if ('IRVANKEDE' == $provider) {
          $provider_oid = $result['data']['id'];
        } elseif ('MEDANPEDIA' == $provider) {
          $provider_oid = $result['data']['id'];
        }

        $top_layanan = $this->model('Order_model')->toplayanan($layanan);
        $top_user = $this->model('Order_model')->topuser();
        if ($this->model('Order_model')->insertordersosmed($order_id, $provider_oid, $layanan, $target, $jumlah, $start_count, $harga, $provider, 'WEB') > 0) {
          $this->model('Order_model')->insertsemuapembelian($order_id, $kategori, $layanan, $harga, $target, $username, 'WEB', 'Pending');
          $updateuser = $this->model('Order_model')->updateuser($harga);
          $insertriwayat = $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo Melalui Pemesanan Sosial Media Dengan Kode Pesanan : WEB-' . $order_id, $username);

          $total = $top_user['total'];
          $jumlah3 = $top_user['jumlah'];
          if (false == $top_user) {
            $this->model('Order_model')->inserttopuser($username, $harga);
          } else {
            $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga);
          }
          if (false == $top_layanan) {
            $this->model('Order_model')->inserttoplayanan($layanan, $harga);
          } else {
            $this->model('Order_model')->updatetoplayanan($total, $jumlah3, $harga, $layanan);
          }
          $jumlah2 = number_format($jumlah, 0, ',', '.');

          $_SESSION['hasil'] = [
            'alert' => 'success',
            'pesan' => 'Sip, Pesanan Kamu Telah Kami Terima. <br> ID order : ' . $order_id . '<br> Target : ' . $target . ' <br> Layanan : ' . $layanan . '<br> Jumlah Pesan : ' . $jumlah2,
          ];
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Error 100, System mengalami gangguan, mohon infokan ini ke admin',
          ];
        }
      }
    }
    header('Location:' . BASEURL . 'home');
  }

  public function ppob()
  {
    $username = $_SESSION['user']['username'];
    $target = filter($_POST['tujuan']);
    $pin = filter($_POST['pin']);
    $layanan = filter($_POST['layanan']);
    $datauser = $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);

    $data_layanan = $this->model('Order_model')->ceklayananppob($layanan);
    $harga = $data_layanan['harga'];
    $namalayanan = $data_layanan['layanan'];
    $operator = $data_layanan['operator'];

    $provider = $data_layanan['provider'];
    $data_provider = $this->model('Order_model')->cekprovider($provider, 'ppob');
    $order_id = acak_nomor(3) . acak_nomor(4);

    if (false == $data_layanan) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Layanan tidak tersedia!',
      ];
    } elseif ($pin != $datauser['pin']) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Pin salah, cek kembali pin kamu!',
      ];
    } elseif ($datauser['saldo_top_up'] < $harga) {
      $_SESSION['hasil'] = [
        'alert' => 'danger',
        'pesan' => 'Saldo kamu tidak cukup untuk melakukan pesanan ini!',
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
          // 'testing' => true
        ];
        $header = [
          'Content-Type: application/json',
        ];
      } else {
        die('System Error!');
      }
      $result = $this->model('Order_model')->apippob($api_link, $api_postdata, $header);
      $statusasal = $result['data']['status'];
      if ('Sukses' == $statusasal) {
        $statusnya = 'Success';
      } elseif ('Pending' == $statusasal) {
        $statusnya = 'Pending';
      } elseif ('Gagal' == $statusasal) {
        $statusnya = 'Gagal';
      }
      if ('DG-PULSA' == $provider && 'Gagal' == $statusasal) {
        if ('Saldo tidak cukup' == $result['data']['message']) {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Ups, Server gangguan, silahkan coba beberapa saat lagi',
          ];
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Ups, ' . $result['data']['message'],
          ];
        }
      } else {
        if ('DG-PULSA' == $provider) {
          $provider_oid = $order_id;
        }
        $top_user = $this->model('Order_model')->topuser();
        if ($this->model('Order_model')->insertorderppob($order_id, $provider_oid, $namalayanan, $harga, $target, $provider, 'WEB', $username, $statusnya) > 0) {
          $this->model('Order_model')->updateuser($harga);
          $insertriwayat = $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo  Melalui Pemesanan PPOB Dengan Kode Pesanan : WEB-.' . $order_id, $username);
          $this->model('Order_model')->insertsemuapembelian($order_id, $operator, $namalayanan, $harga, $target, $username, 'WEB', $statusnya);
          $total = $top_user['total'];
          $jumlah3 = $top_user['jumlah'];
          if (false == $top_user) {
            $this->model('Order_model')->inserttopuser($username, $harga);
          } else {
            $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga);
          }
          $jumlah2 = number_format($harga, 0, ',', '.');

          $_SESSION['hasil'] = [
            'alert' => 'success',
            'pesan' => 'Sip, Pesanan Kamu Telah Kami Terima. <br> ID order : ' . $order_id . '<br> Layanan : ' . $namalayanan . '<br> Harga : ' . $jumlah2,
          ];
        } else {
          $_SESSION['hasil'] = [
            'alert' => 'danger',
            'pesan' => 'Error 100, System mengalami gangguan, mohon infokan ini ke admin',
          ];
        }
      }
    }
    header('Location:' . BASEURL . 'home');
  }
}
