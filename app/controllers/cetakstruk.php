<?php

class Cetakstruk extends Controller
{

    public function index()
    {
        $this->view('cetak/index');
    }
    public function pesananppob()
    {

        if ($_POST['status'] != 'Success') {
            $_SESSION['hasil'] = [
                'alert' => 'warning',
                'pesan' => 'Hanya transaksi yang berstatus Sukses Yang bisa di Print!'
            ];
            header('Location:' . BASEURL . 'riwayat');
        } else {

            $data['nama'] = $_SESSION['user']['username'];
            $data['id'] = $_POST['id'];
            $data['layanan'] = $_POST['layanan'];
            $data['target'] = $_POST['target'];
            $data['status'] = $_POST['status'];
            $data['keterangan'] = $_POST['keterangan'];
            $this->view('cetak/index', $data);
        }
    }
}
