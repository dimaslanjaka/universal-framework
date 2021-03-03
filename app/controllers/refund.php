<?php

class Refund extends Controller
{

    private $db;
    private $dbh;
    protected $sendwa;
    protected $date = DATE, $time = TIME;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
        $this->sendwa = new Menzwa();
    }


    public function sosmed()
    {


        $date = $this->date;
        $time = $this->time;
        $check_order = $this->db->prepare("SELECT count(*) FROM pembelian_sosmed WHERE status IN ('Error','Partial') AND refund = '0'");
        $check_order->execute();

        if ($check_order->fetch(PDO::FETCH_COLUMN) == 0) {
            die("Pesanan Berstatus Error Atau Partial Tidak Ditemukan.");
        } else {
            $ambil_ordr = $this->db->prepare("SELECT * FROM pembelian_sosmed WHERE status IN ('Error','Partial') AND refund = '0'");
            $ambil_ordr->execute();

            foreach ($ambil_ordr->fetchAll() as $data_order) {
                $o_oid = $data_order['oid'];
                $o_poid = $data_order['provider_oid'];
                $u_remains = $data_order['remains'];
                $layanan = $data_order['layanan'];
                $status = $data_order['status'];

                $priceone = $data_order['harga'] / $data_order['jumlah'];
                $refund = $priceone * $u_remains;
                $buyer = $data_order['user'];
                if ($u_remains == 0) {
                    $refund = $data_order['harga'];
                }

                $data_user = $this->model('Home_model')->datauser($buyer);
                $saldo = $data_user['saldo_top_up'] + $refund;
                $pemakaiansaldo = $data_user['pemakaian_saldo'] + $refund;
                $nohp = $data_user['no_hp'];

                $update_user = $this->db->query("UPDATE users SET saldo_top_up = '$saldo', pemakaian_saldo = '$pemakaiansaldo' WHERE username = '$buyer'");
                $update_user->execute();
                $update_order = $this->db->prepare("INSERT INTO riwayat_saldo_koin VALUES ('', '$buyer', 'Saldo', 'Penambahan Saldo', '$refund', 'Pengembalian Dana Dari Pemesanan $layanan Akibat Status Pesanan Error/Partial Dengan Kode Pesanan : $o_oid', '$date', '$time')");
                $update_order->execute();
                $update_refund = $this->db->prepare("UPDATE pembelian_sosmed SET refund = '1'  WHERE oid = '$o_oid'");
                $update_refund->execute();
                $update_refund2 = $this->db->prepare("UPDATE semua_pembelian SET refund = '1'  WHERE id_pesan = '$o_oid'");
                $update_refund2->execute();
                if ($update_order->rowCount() > 0 && $update_refund->rowCount() > 0 && $update_refund2->rowCount() > 0) {

                    // send notif via wa
                    $msg =
                        '
*Yah pesanan ' . $layanan . ' dengan ID #' . $o_oid . ' ' . $status . '*
*Jumlah pesanan : ' . $data_order['jumlah'] . '*
*Sisa : ' . $u_remains . '*
*Total harga : ' . $data_order['harga'] . '*
*Saldo telah dikembalikan senilai RP ' . $refund . '*
';
                    $this->sendwa->sendMessage($nohp, $msg);
                    //
                    echo "===============<br>Pengembalian Dana Sosial Media<br><br>Kode Pesanan : $o_oid<br>Nama Pengguna : $buyer<br>Rp $refund<br>===============<br>";
                } else {
                    echo "Gagal Menampilkan Data Pengembalian Dana Sosial Media.<br />";
                }
            }
        }
    }


    public function pulsa()
    {
        $date = $this->date;
        $time = $this->time;
        $check_order = $this->db->prepare("SELECT * FROM pembelian_pulsa WHERE status IN ('Error') AND refund = '0'");
        $check_order->execute();
        if ($check_order->fetch(PDO::FETCH_COLUMN) == 0) {
            die("Pesanan Berstatus Error Tidak Ditemukan.");
        } else {

            $ambil_order = $this->db->prepare("SELECT * FROM pembelian_pulsa WHERE status IN ('Error') AND refund = '0'");
            $ambil_order->execute();

            foreach ($ambil_order->fetchAll() as $data_order) {
                $o_oid = $data_order['oid'];
                $o_poid = $data_order['provider_oid'];
                $layanan = $data_order['layanan'];

                $priceone = $data_order['harga'];
                $refund = $priceone;
                $buyer = $data_order['user'];

                $data_user = $this->model('Home_model')->datauser($buyer);
                $saldo = $data_user['saldo_top_up'] + $refund;
                $pemakaiansaldo = $data_user['pemakaian_saldo'] + $refund;
                $nohp = $data_user['no_hp'];

                $update_user = $this->db->prepare("UPDATE users SET saldo_top_up = '$saldo', pemakaian_saldo = '$pemakaiansaldo' WHERE username = '$buyer'");
                $update_user->execute();
                $update_order = $this->db->prepare("INSERT INTO riwayat_saldo_koin VALUES ('', '$buyer', 'Saldo', 'Penambahan Saldo', '$refund', 'Pengembalian Dana Dari Pemesanan $layanan Akibat Status Pesanan Error Dengan Kode Pesanan : $o_oid', '$date', '$time')");
                $update_order->execute();
                $update_refund = $this->db->prepare("UPDATE pembelian_pulsa SET refund = '1'  WHERE oid = '$o_oid'");
                $update_refund->execute();
                $update_refund2 = $this->db->prepare("UPDATE semua_pembelian SET refund = '1'  WHERE id_pesan = '$o_oid'");
                $update_refund2->execute();
                if ($update_order->rowCount() > 0 && $update_refund->rowCount() > 0 && $update_refund2->rowCount() > 0) {
                    // send notif via wa
                    $msg =
                        '
*Yah pesanan ' . $layanan . ' dengan ID #' . $o_oid . ' ERROR *
*Total harga : ' . $data_order['harga'] . '*
*Saldo telah dikembalikan senilai RP ' . $refund . '*

';
                    $this->sendwa->sendMessage($nohp, $msg);
                    //
                    echo "===============<br>Pengembalian Dana Top Up<br><br>Kode Pesanan : $o_oid<br>Nama Pengguna : $buyer<br>Rp $refund<br>===============<br>";
                } else {
                    echo "Gagal Menampilkan Data Pengembalian Dana Top Up.<br />";
                }
            }
        }
    }
}
