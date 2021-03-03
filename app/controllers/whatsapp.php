<?php
header('content-type: application/json');
class Whatsapp extends Controller


{

    private $db, $dbh;

    public function __construct()
    {

        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
    }

    public function ceknomor($nomor)
    {
    }

    public function info($no)
    {
        $nomor = preg_replace('/@c.us/', '', $no);
        $this->dbh->query("SELECT count(*) FROM users WHERE no_hp = '$nomor'");
        if ($this->dbh->hitungBaris2() > 0) {
            $data = $this->model('Lainnya')->info($nomor);
            $pembelianppob = $this->model('Akun_model')->pembelianppob($data['username']);
            $totalpembelianppob = $this->model('Akun_model')->totalpembelianppob($data['username']);
            $pembeliansosmed = $this->model('Akun_model')->pembeliansosmed($data['username']);
            $datatotalpembeliansosmed = $this->model('Akun_model')->totalpembeliansosmed($data['username']);
            $jumlahsaldo = "RP " . number_format($data['saldo_top_up'], 0, ',', '.');
            $belanja = $totalpembelianppob + $datatotalpembeliansosmed;
            $allpemakaian = $pembelianppob[0]['total'] + $pembeliansosmed[0]['total'];
            $pemakaiansaldo = "RP " . number_format($allpemakaian, 0, ',', '.');

            return
                "
*DETAIL AKUN M PEDIA*
*--------------------*
*Halo : " . $data['nama_depan'] . "" . $data['nama_belakang'] . "*
*Jumlah Saldo : " . $jumlahsaldo . "*
*Belanja : *" . $belanja . "x*
*Pemakaian Saldo : *" . $pemakaiansaldo . "*
*--------------------*
*Terima Kasih telah menjadi bagian*
*dari https://member.m-pedia.my.id*
";
        } else {
            return 'Nomor anda tidak kami kenali';
        }
    }

    public function operator($kode)
    {
        if ($kode == '0814' || $kode == '0815' || $kode == '0816' || $kode == '0855' || $kode == '0856' || $kode == '0857' || $kode == '0858') {
            return 'indosat';
        } else if ($kode == '0811' || $kode == '0812' || $kode == '0813' || $kode == '0821' || $kode == '0822' || $kode == '0852' || $kode == '0853' || $kode == '0823' || $kode == '0851') {
            return 'Telkomsel';
        } else if ($kode == '0817' || $kode == '0818' || $kode == '0819' || $kode == '0859' || $kode == '0877' || $kode == '0878') {
            return 'XL';
        } else if ($kode == '0838' || $kode == '0831' || $kode == '0832' || $kode == '0833') {
            return "Axis";
        } else if ($kode == '0895' || $kode == '0896' || $kode == '0897' || $kode == '0898' || $kode == '0899') {
            return "three";
        } else if ($kode == '0881' || $kode == '0882' || $kode == '0883' || $kode == '0884' || $kode == '0885' || $kode == '0886' || $kode == '0887' || $kode == '0888' || $kode == '0889') {
            return "smartfren";
        } else {
            return 'gagal';
        }
    }
    public function orderpulsa($pesan, $no)
    {
        $nomor = preg_replace('/@c.us/', '', $no);
        $ceknomor = $this->db->prepare("SELECT count(*) FROM users WHERE no_hp = '$nomor'");
        $ceknomor->execute();

        if ($ceknomor->fetch(PDO::FETCH_COLUMN) > 0) {
            $datauser = $this->model('Lainnya')->info($nomor);
            // $message = $anjay;
            substr($pesan, 0, 6) == 'PULSA.';
            $username = $datauser['username'];
            $target = explode('.', $pesan)[1];
            $nominal = explode('.', $pesan)[2];
            //
            $kode = substr($target, 0, 4);
            $operator = $this->operator($kode);
            if ($operator == 'gagal') {
                return 'Operator tidak dikenali';
                die;
            }
            $jumlah = number_format($nominal, 0, ',', '.');
            $like = $operator . ' ' . $jumlah;
            //
            $this->dbh->query("SELECT * FROM layanan_pulsa WHERE layanan LIKE '%$like%' ");
            $this->dbh->execute();
            $layanannya = $this->dbh->single();
            $layanan = $layanannya['provider_id'];
            $harga = $layanannya['harga'];
            $namalayanan = $layanannya['layanan'];
            $provider = $layanannya['provider'];
            //

            $data_provider = $this->model('Order_model')->cekprovider($provider, 'ppob');
            $order_id = acak_nomor(3) . acak_nomor(4);
            if ($datauser['saldo_top_up'] < $layanannya['harga']) {
                return '*Maaf* Saldo kamu tidak mencukupi untuk melakukan pembelian ini.';
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
                        'buyer_sku_code' => $layanan,
                        'customer_no' => "$target",
                        'ref_id' => $order_id,
                        'sign' => $sign,
                        // 'testing' => true
                    );
                    $header = array(
                        'Content-Type: application/json',
                    );
                } else {
                    die("System Error!");
                }
                $result = $this->model('Order_model')->apippob($api_link, $api_postdata, $header);
                $statusasal = $result['data']['status'];
                if ($statusasal == 'Sukses') {
                    $statusnya = 'Success';
                } else if ($statusasal == 'Pending') {
                    $statusnya = 'Pending';
                } else if ($statusasal == 'Gagal') {
                    $statusnya = 'Gagal';
                }

                if ($provider == "DG-PULSA" && $statusasal == "Gagal") {
                    if ($result['data']['message'] == 'Saldo tidak cukup') {
                        return  'Ups, Server gangguan, silahkan coba beberapa saat lagi';
                    } else {
                        return 'Ups, ' . $result['data']['message'];
                    }
                } else {

                    if ($provider == "DG-PULSA") {
                        $provider_oid = $order_id;
                    }
                    $top_user = $this->model('Order_model')->topuser($username);
                    if ($this->model('Order_model')->insertorderppob($order_id, $provider_oid, $namalayanan, $harga, $target, $provider, 'WA', $username, $statusnya) > 0) {
                        $this->model('Order_model')->updateuser($harga, $username);
                        $insertriwayat =  $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo  Melalui Pemesanan PPOB Dengan Kode Pesanan : WA-.' . $order_id, $username);
                        $this->model('Order_model')->insertsemuapembelian($order_id, $operator, $namalayanan, $harga, $target, $username, 'WA', $statusnya);
                        $total = $top_user['total'];
                        $jumlah3 = $top_user['jumlah'];
                        if ($top_user == false) {
                            $this->model('Order_model')->inserttopuser($username, $harga);
                        } else {
                            $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga);
                        }
                        $jumlah2 = number_format($harga, 0, ',', '.');
                        return
                            '
*Sip, Pesanan Kamu Telah Kami Terima.*
*ID order : ' . $order_id . '*
*Layanan : ' . $namalayanan . '*
*Harga : ' . $jumlah2 . '*
*Tujuan : ' . $target . '*

Terima kasih :) Untuk melihat status dan
detail pesanan gunakan keyword *STATUS.IDORDER*';
                    } else {
                        return 'Error 100(WA), System mengalami gangguan, mohon infokan ini ke admin';
                    }
                }
            }
        } else {
            return 'Nomor tidak terdaftar di M PEDIA';
        }
    }
    public function orderppob($pesan, $no)
    {
        $nomor = preg_replace('/@c.us/', '', $no);
        $ceknomor = $this->db->prepare("SELECT count(*) FROM users WHERE no_hp = '$nomor'");
        $ceknomor->execute();

        if ($ceknomor->fetch(PDO::FETCH_COLUMN) > 0) {
            $datauser = $this->model('Lainnya')->info($nomor);
            // $message = $anjay;
            substr($pesan, 0, 6) == 'PESAN.';
            $username = $datauser['username'];
            $provider = explode('.', $pesan)[1];
            $target = explode('.', $pesan)[2];
            //
            $cekprov = $this->db->prepare("SELECT count(*) FROM layanan_pulsa WHERE provider_id = '$provider'");
            $cekprov->execute();
            if ($cekprov->fetch(PDO::FETCH_COLUMN) > 0) {
                $this->dbh->query("SELECT * FROM layanan_pulsa WHERE provider_id = '$provider' ");
                $this->dbh->execute();
                $layanannya = $this->dbh->single();
                $layanan = $layanannya['provider_id'];
                $harga = $layanannya['harga'];
                $namalayanan = $layanannya['layanan'];
                $provider = $layanannya['provider'];
                $operator = $layanannya['operator'];
                //

                $data_provider = $this->model('Order_model')->cekprovider($provider, 'ppob');
                $order_id = acak_nomor(3) . acak_nomor(4);
                if ($datauser['saldo_top_up'] < $layanannya['harga']) {
                    return '*Maaf* Saldo kamu tidak cukup untuk melakukan pembelian ini';
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
                            'buyer_sku_code' => $layanan,
                            'customer_no' => "$target",
                            'ref_id' => $order_id,
                            'sign' => $sign,
                            //'testing' => true
                        );
                        $header = array(
                            'Content-Type: application/json',
                        );
                    } else {
                        die("System Error!");
                    }
                    $result = $this->model('Order_model')->apippob($api_link, $api_postdata, $header);
                    $statusasal = $result['data']['status'];
                    if ($statusasal == 'Sukses') {
                        $statusnya = 'Success';
                    } else if ($statusasal == 'Pending') {
                        $statusnya = 'Pending';
                    } else if ($statusasal == 'Gagal') {
                        $statusnya = 'Gagal';
                    }

                    if ($provider == "DG-PULSA" && $statusasal == "Gagal") {
                        if ($result['data']['message'] == 'Saldo tidak cukup') {
                            return  'Ups, Server gangguan, silahkan coba beberapa saat lagi';
                        } else {
                            return 'Ups, ' . $result['data']['message'];
                        }
                    } else {

                        if ($provider == "DG-PULSA") {
                            $provider_oid = $order_id;
                        }
                        $top_user = $this->model('Order_model')->topuser($username);
                        if ($this->model('Order_model')->insertorderppob($order_id, $provider_oid, $namalayanan, $harga, $target, $provider, 'WA', $username, $statusnya) > 0) {
                            $this->model('Order_model')->updateuser($harga, $username);
                            $insertriwayat =  $this->model('Lainnya')->riwayatsaldo('Pengurangan Saldo', $harga, 'Mengurangi Saldo  Melalui Pemesanan PPOB Dengan Kode Pesanan : WA-.' . $order_id, $username);
                            $this->model('Order_model')->insertsemuapembelian($order_id, $operator, $namalayanan, $harga, $target, $username, 'WA', $statusnya);
                            $total = $top_user['total'];
                            $jumlah3 = $top_user['jumlah'];
                            if ($top_user == false) {
                                $this->model('Order_model')->inserttopuser($username, $harga);
                            } else {
                                $this->model('Order_model')->updatetopuser($total, $jumlah3, $harga);
                            }
                            $jumlah2 = number_format($harga, 0, ',', '.');
                            return
                                '
*Sip, Pesanan Kamu Telah Kami Terima.*
*ID order : ' . $order_id . '*
*Layanan : ' . $namalayanan . '*
*Harga : ' . $jumlah2 . '*
*Tujuan : ' . $target . '*

Terima kasih :) Untuk melihat status dan
detail pesanan gunakan keyword *STATUS.IDORDER*';
                        } else {
                            return 'Error 100(WA), System mengalami gangguan, mohon infokan ini ke admin';
                        }
                    }
                }
            } else {
                return 'Layanan tidak di temukan';
            }
        } else {
            return 'Nomor tidak terdaftar di M PEDIA';
        }
    }

    public function statusorderppob($pesan, $no)
    {
        $nomor = preg_replace('/@c.us/', '', $no);
        $this->dbh->query("SELECT count(*) FROM users WHERE no_hp = '$nomor'");
        if ($this->dbh->hitungBaris2() > 0) {
            $id = explode('.', $pesan)[1];

            $datauser = $this->model('Lainnya')->info($nomor);
            $username = $datauser['username'];
            $this->dbh->query("SELECT count(*) FROM pembelian_pulsa WHERE oid = '$id' AND user = '$username'");

            if ($this->dbh->hitungBaris2() > 0) {
                $data_order = $this->db->prepare("SELECT * FROM pembelian_pulsa WHERE oid = '$id'");
                $data_order->execute();
                $data_order = $data_order->fetch();

                return
                    '
*Berikut status dan keterangan Order #' . $id . '*
*Layanan : ' . $data_order['layanan'] . '*
*Tujuan : ' . $data_order['target'] . '*
*Harga : ' . $data_order['harga'] . '*
*Status : ' . $data_order['status'] . '*
*No sn/Ket : *' . $data_order['keterangan'] . '';
            } else {
                return 'ID order tidak di temukan';
            }
        } else {
            return 'Nomor tidak terdaftar';
        }
    }

    public function keyword()
    {
        return
            '
Hallo sob, Berikut *keyboard* transaksi M Pedia
- *INFO* => Untuk melihat informasi akun
- *PULSA.[NOMOR].[JUMLAH]* => Untuk transaksi (Pulsa) instan.
- *STATUS.IDORDER* => Untuk melihat detail transaksi
- *PESAN.[IDLAYANAN].[TUJUAN]* => Untuk transaksi (PPOB) instan.
  Id layanan bisa di cek di https://bit.ly/mpediaa

Untuk *KEYWORD* Lainnya sedang masa development, kami akan infokan jika ada keyword baru.

*Terimakasih telah menjadi bagian dari M PEDIA*

*CS*
082298859671
*ADMIN*
089522811620
';
    }



    public function bot()
    {

        $data = json_decode(file_get_contents('php://input'), true);
        file_put_contents('whatsapp.txt', '[' . date('Y-m-d H:i:s') . "]\n" . json_encode($data) . "\n\n", FILE_APPEND);
        $message = $data['data']['body'];
        $from = $data['data']['from'];
        $type = $data['type'];

        if ($type == 'chat') {
            if ($message == 'hai') {
                $result = [
                    'type' => 'message',
                    'data' => [
                        'mode' => 'chat',
                        'pesan' => 'hai juga'
                    ]
                ];
            } else if ($message == 'INFO') {
                $pesan = $this->info($from);
                $result = [
                    'type' => 'message',
                    'data' => [
                        'mode' => 'chat',
                        'pesan' => $pesan
                    ]
                ];
            } else if (substr($message, 0, 6) == 'PULSA.') {
                $pesan = $this->orderpulsa($message, $from);
                $result = [
                    'type' => 'message',
                    'data' => [
                        'mode' => 'chat',
                        'pesan' => $pesan
                    ]
                ];
            } else if (substr($message, 0, 6) == 'PESAN.') {
                $pesan = $this->orderppob($message, $from);
                $result = [
                    'type' => 'message',
                    'data' => [
                        'mode' => 'chat',
                        'pesan' => $pesan
                    ]
                ];
            } else if (substr($message, 0, 7) == 'STATUS.') {
                $pesan = $this->statusorderppob($message, $from);
                $result = [
                    'type' => 'message',
                    'data' => [
                        'mode' => 'reply',
                        'pesan' => $pesan
                    ]
                ];
            } else if ($message == 'KEYWORD') {
                $pesan = $this->keyword();
                $result = [
                    'type' => 'message',
                    'data' => [
                        'mode' => 'chat',
                        'pesan' => $pesan
                    ]
                ];
            }
        }

        print json_encode($result);
    }
}
