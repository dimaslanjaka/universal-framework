<?php

class Akun_model extends Controller
{

    protected $dbh, $db;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
    }

    // mutasi saldo
    public function mutasiakun($username)

    {
        $this->dbh->query("SELECT * FROM riwayat_saldo_koin WHERE username = '$username' ORDER BY id DESC");
        return $this->dbh->resultSet();
    }

    // pembelian user
    public function pembelianppob($username)
    {

        $this->dbh->query("SELECT SUM(harga) AS total FROM pembelian_pulsa WHERE user = '$username' AND status = 'Success' ");
        return $this->dbh->resultSet();
    }
    public function totalpembelianppob($username)
    {

        $this->dbh->query("SELECT count(*)  FROM pembelian_pulsa WHERE user = '$username' AND status = 'Success' ");
        return $this->dbh->hitungBaris2();
    }
    public function pembeliansosmed($username)
    {

        $this->dbh->query("SELECT SUM(harga) AS total FROM pembelian_sosmed WHERE user = '$username' AND status = 'Success' ");
        return $this->dbh->resultSet();
    }
    public function totalpembeliansosmed($username)
    {

        $this->dbh->query("SELECT count(*)  FROM pembelian_sosmed WHERE user = '$username' AND status = 'Success' ");
        return $this->dbh->hitungBaris2();
    }

    // total seluruh penggunaan saldo
    public function penggunaansaldo($username)
    {

        $this->dbh->query("SELECT SUM(harga) AS total FROM semua_pembelian WHERE user = '$username' AND status = 'Success' ");
        return $this->dbh->resultSet();
    }
    /// deposit user
    public function deposituser($username)
    {
        $this->dbh->query("SELECT SUM(jumlah_transfer) AS total FROM deposit WHERE username = '$username' AND status = 'Success' ");
        return $this->dbh->resultSet();
    }

    public function totaldeposituser($username)
    {

        $this->dbh->query("SELECT count(*)  FROM deposit WHERE username = '$username' AND status = 'Success' ");
        return $this->dbh->hitungBaris2();
    }

    // aktifitas akun
    public function aktifitasakun($username)

    {
        $this->dbh->query("SELECT * FROM aktifitas WHERE username = '$username' ORDER BY id DESC");
        return $this->dbh->resultSet();
    }

    public function insertapi($key, $user)
    {
        $this->dbh->query("INSERT INTO api VALUES ('','$key','','','$user')");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }

    public function ubahpin($newpin, $username)
    {
        $this->dbh->query("UPDATE users SET pin = '$newpin' WHERE username = '$username'");
        $this->dbh->execute();
        return $this->dbh->rowCount();
    }
}
