<?php

class Order_model
{

    protected $db, $dbh;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
    }


    // cek layanan
    public function ceklayanansosmed($id)
    {
        $this->dbh->query("SELECT * FROM layanan_sosmed WHERE service_id = '$id'");
        $this->dbh->execute();
        return $this->dbh->single();
    }
    public function ceklayananppob($id)
    {
        $this->dbh->query("SELECT * FROM layanan_pulsa WHERE service_id = '$id'");
        $this->dbh->execute();
        return $this->dbh->single();
    }


    // cek dan fetch top layanan
    public function toplayanan($layanan)
    {
        $this->dbh->query("SELECT * FROM top_layanan WHERE layanan = '$layanan'");
        $this->dbh->execute();
        return $this->dbh->single();
    }
    // cek dan fetch top users
    public function topuser($username = 'ya')
    {
        if ($username == 'ya') {

            $username = $_SESSION['user']['username'];
        }
        $this->dbh->query("SELECT * FROM top_users WHERE username = '$username'");
        $this->dbh->execute();
        return $this->dbh->single();
    }

    public function cekprovider($provider, $jenis)
    {
        if ($jenis == 'sosmed') {
            $jenis = 'provider';
        } else if ($jenis == 'ppob') {
            $jenis = 'provider_pulsa';
        }
        $this->dbh->query("SELECT * FROM $jenis WHERE code = '$provider'");
        $this->dbh->execute();
        return $this->dbh->single();
    }

    // api curl
    public function apisosmed($url, $postdata)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $chresult = curl_exec($ch);
        return $json_result = json_decode($chresult, true);
    }

    // dikhususkan untuk digiflaz
    public function apippob($api_link, $api_postdata, $header = null)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $api_link);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($api_postdata));
        $chresult = curl_exec($ch);
        curl_close($ch);
        return $json_result = json_decode($chresult, true);
        // return   $result = json_decode($chresult);
    }




    public function insertordersosmed($order_id, $provider_oid, $layanan, $target, $jumlah, $start_count, $harga, $provider, $from, $username = 'ya')
    {

        if ($username == 'ya') {
            $username = $_SESSION['user']['username'];
        }
        $date = DATE;
        $time = TIME;

        $this->dbh->query("INSERT INTO pembelian_sosmed VALUES ('','$order_id', '$provider_oid', '$username', :layanan, :target, :jumlah, :jumlah, '$start_count', '$harga',  'Pending', '$date', '$time', '$provider', '$from', '0')");
        $this->dbh->bind('layanan', $layanan);
        $this->dbh->bind('target', $target);
        $this->dbh->bind('jumlah', $jumlah);

        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
    public function insertorderppob($order_id, $provider_oid, $namalayanan, $harga, $target, $provider, $from, $username  = 'ya', $status)
    {

        if ($username == 'ya') {
            $username = $_SESSION['user']['username'];
        }
        $date = DATE;
        $time = TIME;

        $this->dbh->query("INSERT INTO pembelian_pulsa VALUES ('','$order_id', '$provider_oid', '$username', '$namalayanan', '$harga',  '$target', '', '$status', '$date', '$time', '$from', '$provider', '0')");


        $this->dbh->execute();
        return $this->dbh->rowCount();
    }

    public function insertsemuapembelian($order_id, $kategori, $layanan, $harga, $target, $username = 'ya', $from, $status)
    {
        $date = DATE;
        $time = TIME;
        if ($username == 'ya') {

            $username = $_SESSION['user']['username'];
        }
        $this->dbh->query("INSERT INTO semua_pembelian VALUES ('','$from-$order_id', '$order_id', '$username', '$kategori', '$layanan', '$harga', '$target', '$status', '$date', '$time', '$from', '0','')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }

    public function updateuser($harga, $username = 'ya')
    {
        if ($username == 'ya') {

            $username = $_SESSION['user']['username'];
        }
        $this->dbh->query("UPDATE users SET saldo_top_up = saldo_top_up-$harga, pemakaian_saldo = pemakaian_saldo+$harga WHERE username = '$username'");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }

    // top user
    public function inserttopuser($username, $harga)
    {
        $this->dbh->query("INSERT INTO top_users VALUES ('', 'Order', '$username', '$harga', '1')");
        $this->dbh->execute();
    }
    public function updatetopuser($total, $jumlah, $harga, $username = 'ya')
    {
        if ($username == 'ya') {
            $username = $_SESSION['user']['username'];
        }
        $this->dbh->query("UPDATE top_users SET jumlah = " . $jumlah . "+$harga, total = " . $total . "+1 WHERE username = '$username' AND method = 'Order'");
        $this->dbh->execute();
    }

    // top layanan
    public function inserttoplayanan($layanan, $harga)
    {
        $this->dbh->query("INSERT INTO top_layanan VALUES ('', 'Layanan', '$layanan', '$harga', '1')");
        $this->dbh->execute();
    }
    public function updatetoplayanan($total, $jumlah, $harga, $layanan)
    {
        $username = $_SESSION['user']['username'];
        $this->dbh->query("UPDATE top_layanan SET jumlah = " . $jumlah . "+$harga, total = " . $total . "+1 WHERE layanan = '$layanan' AND method = 'Layanan'");
        $this->dbh->execute();
    }
}
