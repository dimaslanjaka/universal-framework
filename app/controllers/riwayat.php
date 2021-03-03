<?php

class Riwayat extends Controller
{

    protected $dbh, $db;

    public function __construct()
    {
        $this->dbh = new Database;
        $this->db = $this->dbh->connect();
        new Session;
    }
    /////////////////////
    public function index()
    {

        $username = $_SESSION['user']['username'];
        $data['user'] = $this->model('Home_model')->datauser($username);
        $data['title'] = 'Profile';
        // riwayat semua pembelian
        $data['riwayatsemuapembelian'] = $this->model('Riwayat_model')->riwayatsemuapembelian($username);
        $data['riwayatpembelianppob'] = $this->model('Riwayat_model')->riwayatpembelianppob($username);
        $data['riwayatpembeliansosmed'] = $this->model('Riwayat_model')->riwayatpembeliansosmed($username);
        $this->view('templates/header', $data);
        $this->view('riwayat/index', $data);
        $this->view('templates/footer');
    }

    public function detailsemuapesanan()
    {
        $id_order = $_POST['idpesanan'];
        $this->dbh->query("SELECT * FROM semua_pembelian WHERE id_pesan = '$id_order' ");
        $this->dbh->execute();
        $detail = $this->dbh->single();

        if (is_array($detail)) {

            if ($detail['place_from'] == 'WEB') {
                $badgevia = 'info';
                $iconvia = 'simple-icon-globe';
            } else {
                $badgevia = 'warning';
                $iconvia = 'simple-icon-shuffle';
            }
            ///status
            if ($detail['status'] == 'Success') {

                $badgestatus = 'success';
                $iconstatus = 'simple-icon-check';
            } else if ($detail['status'] == 'Error') {
                $badgestatus = 'danger';
                $iconstatus = 'simple-icon-close';
            } else if ($detail['status'] == 'Pending') {
                $badgestatus = 'warning';
                $iconstatus = 'simple-icon-clock';
            } else {
                $badgestatus = 'secondary';
            }

            if ($detail['refund'] == 1) {
                $refund = 'Saldo Kembali';
                $badgerefund = 'primary';
            } else {
                $refund = 'Tidak';
                $badgerefund = 'danger';
            }

            echo '<table class="table">
            <thead>
            </thead>
            <tbody >
            <tr style="border-left: 1px solid blue">
               <td>ID TRANSAKSI</td>
               <td>' . $detail['id_pesan'] . '</td>          
            </tr>
            <tr style="border-left: 1px solid blue">
                <td>TANGGAL</td>
                <td>' . $detail['date'] . ' - ' . $detail['time'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>LAYANAN</td>
                <td>' . $detail['layanan'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>TUJUAN</td>
                <td>' . $detail['target'] . '</td>   
            </tr> 
         
            <tr style="border-left: 1px solid blue">
                <td>STATUS</td>
                <td><div class="badge badge-' . $badgestatus . '"><i class="' . $iconstatus . '">  ' . $detail['status'] . '</i></div></td>  
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>ORDER MELALUI</td>
                <td><div class="badge badge-' . $badgevia . '"><i class="' . $iconvia . '">  ' . $detail['place_from'] . '</i></div></td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>Pengembalian Dana</td>
                <td><div class="badge badge-' . $badgerefund . '"> ' . $refund . '</div></td>
            </tr> 
            </tbody> 
          </table>
          </div>
          <div class="modal-footer">
    
            
              <button type="button" class="btn btn-secondary " data-dismiss="modal">Tutup</button>
          </div>';
        } else {
            echo '<small class="text-danger text-center ml-20">Id pesanan tidak di temukan!</small>';
        }
    }

    public function detailpesananppob()
    {
        $id_pemesanan = $_POST['idpesanan'];
        $this->dbh->query("SELECT * FROM pembelian_pulsa WHERE oid = '$id_pemesanan' ");
        $this->dbh->execute();

        $detail = $this->dbh->single();
        if (is_array($detail)) {

            if ($detail['place_from'] == 'WEB') {
                $badgevia = 'info';
                $iconvia = 'simple-icon-globe';
            } else {
                $badgevia = 'warning';
                $iconvia = 'simple-icon-shuffle';
            }
            ///status
            if ($detail['status'] == 'Success') {

                $badgestatus = 'success';
                $iconstatus = 'simple-icon-check';
            } else if ($detail['status'] == 'Error') {
                $badgestatus = 'danger';
                $iconstatus = 'simple-icon-close';
            } else if ($detail['status'] == 'Pending') {
                $badgestatus = 'warning';
                $iconstatus = 'simple-icon-clock';
            } else {
                $badgestatus = 'secondary';
            }

            if ($detail['refund'] == 1) {
                $refund = 'Saldo Kembali';
                $badgerefund = 'primary';
            } else {
                $refund = 'Tidak';
                $badgerefund = 'danger';
            }


            echo '<table class="table">
        <thead>
        </thead>
        <tbody >
        <tr style="border-left: 1px solid blue">
           <td>ID TRANSAKSI</td>
           <td>' . $detail['oid'] . '</td>          
        </tr>
        <tr style="border-left: 1px solid blue">
            <td>TANGGAL</td>
            <td>' . $detail['date'] . ' - ' . $detail['time'] . '</td>   
        </tr> 
        <tr style="border-left: 1px solid blue">
            <td>LAYANAN</td>
            <td>' . $detail['layanan'] . '</td>   
        </tr> 
        <tr style="border-left: 1px solid blue">
            <td>TUJUAN</td>
            <td>' . $detail['target'] . '</td>   
        </tr> 
        <tr style="border-left: 1px solid blue">
            <td>INFORMASI</td>
            <td>' . $detail['keterangan'] . '</td>   
        </tr> 
        <tr style="border-left: 1px solid blue">
            <td>STATUS</td>
            <td><div class="badge badge-' . $badgestatus . '"><i class="' . $iconstatus . '">  ' . $detail['status'] . '</i></div></td>  
        </tr> 
        <tr style="border-left: 1px solid blue">
            <td>ORDER MELALUI</td>
            <td><div class="badge badge-' . $badgevia . '"><i class="' . $iconvia . '">  ' . $detail['place_from'] . '</i></div></td>   
        </tr> 
        <tr style="border-left: 1px solid blue">
            <td>Pengembalian Dana</td>
            <td><div class="badge badge-' . $badgerefund . '"> ' . $refund . '</div></td>
        </tr> 
        </tbody> 
      </table>
      </div>
      <div class="modal-footer">
      <form method="POST" action="' . BASEURL . 'cetakstruk/pesananppob">
      <input type="hidden" name="id" value="' . $detail['oid'] . '">
      <input type="hidden" name="layanan" value="' . $detail['layanan'] . '">
      <input type="hidden" name="target" value="' . $detail['target'] . '">
      <input type="hidden" name="status" value="' . $detail['status'] . '">
      <input type="hidden" name="keterangan" value="' . $detail['keterangan'] . '">
          <button type="submit" class="btn btn-success">Print</button>
          </form>
          <button type="button" class="btn btn-secondary " data-dismiss="modal">Tutup</button>
      </div>';
        } else {
            echo 'Data tidak di temukan';
        }
    }

    // detail riwayat pesanan
    public function detailpemesanan()
    {

        $id_pemesanan = $_POST['idpesanan'];
        $this->dbh->query("SELECT * FROM pembelian_sosmed WHERE oid = '$id_pemesanan' ");
        $this->dbh->execute();

        $detail = $this->dbh->single();
        ///


        if ($detail == true) {

            if ($detail['place_from'] == 'WEB') {
                $badgevia = 'info';
                $iconvia = 'simple-icon-globe';
            } else {
                $badgevia = 'warning';
                $iconvia = 'simple-icon-shuffle';
            }
            ///status
            if ($detail['status'] == 'Success') {

                $badgestatus = 'success';
                $iconstatus = 'simple-icon-check';
            } else if ($detail['status'] == 'Error') {
                $badgestatus = 'danger';
                $iconstatus = 'simple-icon-close';
            } else if ($detail['status'] == 'Pending') {
                $badgestatus = 'warning';
                $iconstatus = 'simple-icon-clock';
            } else {
                $badgestatus = 'secondary';
                $iconstatus = 'simple-icon-clock';
            }

            if ($detail['refund'] == 1) {
                $refund = 'Saldo Kembali';
                $badgerefund = 'primary';
            } else {
                $refund = 'Tidak';
                $badgerefund = 'danger';
            }


            echo '<table class="table">
            <thead>
            </thead>
            <tbody >
            <tr style="border-left: 1px solid blue">
               <td>ID TRANSAKSI</td>
               <td>' . $detail['oid'] . '</td>          
            </tr>
            <tr style="border-left: 1px solid blue">
                <td>TANGGAL</td>
                <td>' . $detail['date'] . ' - ' . $detail['time'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>LAYANAN</td>
                <td>' . $detail['layanan'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>TUJUAN</td>
                <td>' . $detail['target'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>JUMLAH PESAN</td>
                <td>' . $detail['jumlah'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>JUMLAH MULAI</td>
                <td>' . $detail['start_count'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>SISA</td>
                <td>' . $detail['remains'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>HARGA</td>
                <td>' . $detail['harga'] . '</td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>STATUS</td>
                <td><div class="badge badge-' . $badgestatus . '"><i class="' . $iconstatus . '">  ' . $detail['status'] . '</i></div></td>  
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>ORDER MELALUI</td>
                <td><div class="badge badge-' . $badgevia . '"><i class="' . $iconvia . '">  ' . $detail['place_from'] . '</i></div></td>   
            </tr> 
            <tr style="border-left: 1px solid blue">
                <td>Pengembalian Dana</td>
                <td><div class="badge badge-' . $badgerefund . '"> ' . $refund . '</div></td>
            </tr> 
            </tbody> 
          </table>
          </div>
          <div class="modal-footer">
    
           
              <button type="button" class="btn btn-secondary " data-dismiss="modal">Tutup</button>
          </div>';
        } else {
            echo 'Data tidak di temukan';
        }
    }
}
