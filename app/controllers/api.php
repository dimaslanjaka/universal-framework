<?php
header('Content-Type: application/json');

class Api extends Controller
{
    protected $db, $dbh;
    protected $apikey, $status, $username;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();


        if (!isset($_POST['api_key'])) {
            $respon = [
                'status' => false,
                'pesan' => 'Permintaan tidak sesuai'
            ];
            print(json_encode($respon, JSON_PRETTY_PRINT));
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
                        'pesan' => 'Alamat IP tidak sesuai'
                    ];
                    print(json_encode($respon, JSON_PRETTY_PRINT));
                    die;
                } else if ($dataapi['status'] == 'OF') {
                    $respon = [
                        'status' => false,
                        'pesan' => 'IP Tersebut sedang tidak aktif'
                    ];
                    print(json_encode($respon, JSON_PRETTY_PRINT));
                    die;
                }
            } else {
                $respon = [
                    'status' => false,
                    'pesan' => 'Api Key salah'
                ];
                print(json_encode($respon, JSON_PRETTY_PRINT));
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
        if ($tipe == 'Sosial Media') {

            $this->dbh->query("SELECT * FROM layanan_sosmed");
            $this->dbh->execute();
            foreach ($this->dbh->resultSet() as $rows) {
                $hasilnya = "-";
                $data[] = ['sid' => $rows['service_id'], 'kategori' => $rows['kategori'], 'layanan' => $rows['layanan'], 'catatan' => $rows['catatan'], 'min' => $rows['min'], 'max' => $rows['max'], 'harga' => $rows['harga_api'], 'status' => $rows['status']];
            }
            $respon = [
                'status' => true,
                'data' => $data
            ];
        } else if ($tipe == 'PPOB') {
            $this->dbh->query("SELECT * FROM layanan_pulsa");
            $this->dbh->execute();
            foreach ($this->dbh->resultSet() as $rows) {
                $hasilnya = "-";
                $data[] = ['sid' => $rows['service_id'], 'operator' => $rows['operator'], 'layanan' => $rows['layanan'], 'harga' => $rows['harga_api'], 'status' => $rows['status'], 'tipe' => $rows['tipe']];
            }
            $respon = [
                'status' => true,
                'data' => $data
            ];
        } else {
            $respon = [
                'status' => false,
                'data' => 'Tipe tidak ditemukan'
            ];
        }
        print(json_encode($respon, JSON_PRETTY_PRINT));
    }


    // api order

    public function order()
    {

        $datauser =  $data['user'] = $this->model('Home_model')->datauser($this->username);
        $username = $this->username;
        $tipe = $_POST['tipe'];
        if ($tipe == 'Sosial Media') {


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
                if ($data_layanan['kategori'] == "Instagram Likes" and "Instagram Likes Indonesia" and "Instagram Likes [Targeted Negara]" and "Instagram Likes/Followers Per Minute") {
                    $start_count = likes_count($target);
                } else if ($data_layanan['kategori'] == "Instagram Followers No Refill/Not Guaranteed" and "Instagram Followers Indonesia" and "Instagram Followers [Negara]" and "Instagram Followers [Refill] [Guaranteed] [NonDrop]") {
                    $start_count = followers_count($target);
                } else if ($data_layanan['kategori'] == "Instagram Views") {
                    $start_count = views_count($target);
                } else {
                    $start_count = 0;
                }

                $provider = $data_layanan['provider'];
                $data_provider = $this->model('Order_model')->cekprovider($provider, 'sosmed');
                $order_id = acak_nomor(3) . acak_nomor(4);

                if ($data_layanan == false) {
                    $respon = [
                        'status' => false,
                        'data' => 'Layanan tidak tersedia'
                    ];
                } else  if ($data_layanan['min'] > $jumlah) {
                    $respon = [
                        'status' => false,
                        'data' => 'Minimal pesanan tidak sesuai'
                    ];
                } else if ($data_layanan['max'] < $jumlah) {
                    $respon = [
                        'status' => false,
                        'data' => 'Maximal pesanan tidak sesuai'
                    ];
                } else if ($datauser['saldo_top_up'] < $harga) {
                    $respon = [
                        'status' => false,
                        'data' => 'Saldo tidak cukup'
                    ];
                } else {

                    if ($provider == "MANUAL") {
                        $api_postdata = "";
                    } else if ($provider == "IRVANKEDE") {
                        if ($post_comments == false) {
                            $postdata = "api_id=" . $data_provider['api_id'] . "&api_key=" . $data_provider['api_key'] . "&service=" . $data_layanan['provider_id'] . "&target=$target&quantity=$jumlah";
                        } else if ($post_comments == true) {
                            $postdata = "api_id=" . $data_provider['api_id'] . "&api_key=" . $data_provider['api_key'] . "&service=" . $data_layanan['provider_id'] . "&target=$target&custom_comments=$post_comments";
                        }
                        $url = "https://irvankede-smm.co.id/api/order";
                    } else if ($provider == "MEDANPEDIA") {
                        if ($post_comments == false) {
                            $postdata = "api_id=" . $data_provider['api_id'] . "&api_key=" . $data_provider['api_key'] . "&service=" . $data_layanan['provider_id'] . "&target=$target&quantity=$jumlah";
                        } else if ($post_comments == true) {
                            $postdata = "api_id=" . $data_provider['api_id'] . "&api_key=" . $data_provider['api_key'] . "&service=" . $data_layanan['provider_id'] . "&target=$target&custom_comments=$post_comments";
                        }
                        $url = "https://medanpedia.co.id/api/order";
                    } else {
                        die('system error');
                    }

                    $result = $this->model('Order_model')->apisosmed($url, $postdata);


                    if ($provider == "IRVANKEDE" and $result['status'] == false) {
                        $respon = [
                            'status' => false,
                            'data' => 'Server maintenance'
                        ];
                    } else if ($provider == "MEDANPEDIA" and $result['status'] == false) {
                        if ($result['data'] == 'Saldo tidak mencukupi') {
                            $respon = [
                                'status' => false,
                                'data' => 'Server sedang gangguan, silahkan coba beberapa saat lagi'
                            ];
                        } else {
                            $respon = [
                                'status' => false,
                                'data' => 'Server maintenance'
                            ];
                        }
                    } else {
                        if ($provider == "IRVANKEDE") {
                            $provider_oid = $result['data']['id'];
                        } else if ($provider == "MEDANPEDIA") {
                            $provider_oid = $result['data']['id'];
                        }


                        //
                        $top_layanan = $this->model('Order_model')->toplayanan($layanan);
                        $top_user = $this->model('Order_model')->topuser($username);
                        if ($this->model('Order_model')->insertordersosmed($order_id, $provider_oid, $layanan, $target, $jumlah, $start_count, $harga, $provider, 'API', $username) > 0) {
                            $this->model('Order_model')->insertsemuapembelian($order_id, $kategori, $layanan, $harga, $target, $username, 'API');
                            $updateuser = $this->model('Order_model')->updateuser($harga, $username);
                            $insertriwayat =  $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo Melalui Pemesanan (API) Sosial Media Dengan Kode Pesanan : WEB-' . $order_id, $username);

                            // 
                            $total = $top_user['total'];
                            $jumlah3 = $top_user['jumlah'];
                            if ($top_user == false) {
                                $this->model('Order_model')->inserttopuser($username, $harga);
                            } else {

                                $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga, $username);
                            }
                            if ($top_layanan == false) {
                                $this->model('Order_model')->inserttoplayanan($layanan, $harga);
                            } else {
                                $this->model('Order_model')->updatetoplayanan($total, $jumlah3, $harga, $layanan);
                            }
                            $jumlah2 = number_format($jumlah, 0, ',', '.');

                            $respon = array('status' => true, 'data' => array('id' => $order_id, 'start_count' => $start_count));
                        } else {
                            $respon = [
                                'status' => false,
                                'data' => 'Server Maintenance (12)'
                            ];
                        }
                    }
                }
            } else {
                $respon = [
                    'status' => false,
                    'data' => 'Parameter tidak sesuai'
                ];
            }
        } else if ($tipe == 'PPOB') {
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

                if ($data_layanan == false) {
                    $respon = [
                        'status' => false,
                        'data' => 'Layanan tidak tersedia'
                    ];
                } else if ($datauser['saldo_top_up'] < $harga) {
                    $respon = [
                        'status' => false,
                        'data' => 'Saldo tidak cukup'
                    ];
                } else {

                    $api_link = $data_provider['link'];
                    $api_key = $data_provider['api_key'];
                    $api_id = $data_provider['api_id'];

                    if ($provider == "MANUAL") {
                        $api_postdata = "";
                    } else if ($provider == "DG-PULSA") {
                        $sign = md5($api_id . $api_key . $order_id);
                        $api_postdata = array(
                            'username' => $api_id,
                            'buyer_sku_code' => $data_layanan['provider_id'],
                            'customer_no' => "$target",
                            'ref_id' => $order_id,
                            'sign' => $sign,
                            'testing' => true
                        );
                        $header = array(
                            'Content-Type: application/json',
                        );
                    } else {
                        die("System Error!");
                    }
                    $result = $this->model('Order_model')->apippob($api_link, $api_postdata, $header);
                    if ($provider == "DG-PULSA" && $result['data']['status'] == "Gagal") {
                        if ($result['data']['message'] == 'Saldo tidak cukup') {
                            $respon = [
                                'status' => false,
                                'data' => 'Server maintenance (101)'
                            ];
                        } else {
                            $respon = [
                                'status' => false,
                                'data' => $result['data']['message']
                            ];
                        }
                    } else {
                        if ($provider == "DG-PULSA") {
                            $provider_oid = $order_id;
                        }
                        $top_user = $this->model('Order_model')->topuser($username);
                        if ($this->model('Order_model')->insertorderppob($order_id, $provider_oid, $namalayanan, $harga, $target, $provider, 'API', $username) > 0) {
                            $this->model('Order_model')->updateuser($harga, $username);
                            $insertriwayat =  $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo  Melalui Pemesanan (API) PPOB Dengan Kode Pesanan : WEB-.' . $order_id, $username);
                            $this->model('Order_model')->insertsemuapembelian($order_id, $operator, $namalayanan, $harga, $target, $username, 'API');
                            $total = $top_user['total'];
                            $jumlah3 = $top_user['jumlah'];
                            if ($top_user == false) {
                                $this->model('Order_model')->inserttopuser($username, $harga);
                            } else {
                                $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga, $username);
                            }
                            $jumlah2 = number_format($harga, 0, ',', '.');

                            $respon = [
                                'status' => true,
                                'data' => ['id' => $order_id]
                            ];
                        } else {
                            $respon = [
                                'status' => false,
                                'data' => 'Server maintenance (103)'
                            ];
                        }
                    }
                }
            } else {
                $respon = [
                    'status' => false,
                    'data' => 'Parameter tidak sesuai'
                ];
            }
        } else {
            $respon = [
                'status' => false,
                'data' => 'Tipe tidak ditemukan'
            ];
        }
        print(json_encode($respon, JSON_PRETTY_PRINT));
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
                'saldo'  => $datauser['saldo_top_up']
            ];
            $respon = [
                'status' => true,
                'data' => $data
            ];
        } else {
            $respon = [
                'status' => false,
                'pesan' => 'Pengguna tidak ditemukan'
            ];
        }
        print(json_encode($respon, JSON_PRETTY_PRINT));
    }

    // api status 
    public function status()
    {
        $username = $this->username;
        $tipe  = $_POST['tipe'];
        if ($tipe == 'Sosial Media') {
            if (isset($_POST['id'])) {
                $order_id = trim($_POST['id']);
                $cek_pesanan = $this->db->prepare("SELECT * FROM pembelian_sosmed WHERE oid = '$order_id' AND user = '$username'");
                $cek_pesanan->execute();
                $data_pesanan = $cek_pesanan->fetch();
                if ($data_pesanan == false) {
                    $respon = array('status' => false, 'data' => array('pesan' => 'Id pesanan tidak di temukan'));
                } else {
                    $respon = array('status' => true, 'data' => array("id" => $data_pesanan['oid'], 'status' => $data_pesanan['status'], 'start_count' => $data_pesanan['start_count'], 'remains' => $data_pesanan['remains']));
                }
            } else {
                $respon = array('status' => false, 'data' => array('pesan' => 'Ups, Permintaan Tidak Sesuai.'));
            }
        } else if ($tipe == 'PPOB') {
            if (isset($_POST['id'])) {
                $order_id = trim($_POST['id']);
                $cek_pesanan = $this->db->prepare("SELECT * FROM pembelian_pulsa WHERE oid = '$order_id' AND user = '$username'");
                $cek_pesanan->execute();
                $data_pesanan = $cek_pesanan->fetch();
                if ($data_pesanan == false) {
                    $respon = array('status' => false, 'data' => array('pesan' => 'Id pesanan tidak di temukan'));
                } else {
                    $respon = array('status' => true, 'data' => array("id" => $data_pesanan['oid'], 'status' => $data_pesanan['status'], 'keterangan' => $data_pesanan['keterangan']));
                }
            } else {
                $respon = array('status' => false, 'data' => array('pesan' => 'Ups, Permintaan Tidak Sesuai.'));
            }
        }
        print(json_encode($respon, JSON_PRETTY_PRINT));
    }
}
