<?php

header('Access-Control-Allow-Origin: *');
class Halaman extends Controller
{
  public $date = DATE;
  public $time = TIME;

  public function __construct()
  {
    $this->db = new Database();
    $this->dbh = $this->db->connect();
  }

  public function index()
  {
    header('Location:' . BASEURL);
  }

  // pertanyaan umum
  public function faq()
  {
    new Session();
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'berita';
    $data['faq'] = $this->model('Halaman_model')->daftarfaq();

    $this->view('templates/header', $data);
    $this->view('halaman/faq', $data);
    $this->view('templates/footer');
  }

  // ketentuan layanan
  public function tos()
  {
    new Session();
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'berita';
    $data['faq'] = $this->model('Halaman_model')->daftarfaq();

    $this->view('templates/header', $data);
    $this->view('halaman/tos', $data);
    $this->view('templates/footer');
  }

  // daftarharga
  public function daftarharga()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Daftar harga';
    $data['katsosmed'] = $this->model('Halaman_model')->kategorisosmed();
    $data['katppob'] = $this->model('Halaman_model')->kategorippob();
    $this->view('templates/header', $data);
    $this->view('halaman/harga', $data);
    $this->view('templates/footer');
  }

  // layanan sosmed
  public function layanansosmed()
  {
    $kategori = $_POST['kategori'];
    $this->db->query("SELECT * FROM layanan_sosmed WHERE kategori ='$kategori' ORDER BY harga ASC ");
    $layanansosmed = $this->db->resultSet();
    foreach ($layanansosmed as $layanan) {
      $harga = number_format($layanan['harga'], 0, ',', '.');
      $hargaapi = number_format($layanan['harga_api'], 0, ',', '.');

      if ('Aktif' == $layanan['status']) {
        $icon = 'simple-icon-check';
        $warna = 'success';
      } else {
        $icon = 'simple-icon-close';
        $warna = 'danger';
      }
      echo ' <tr>

            <td class="text-center">' . $layanan['service_id'] . '</td>

            <td class="text-center">' . $layanan['layanan'] . '</td>

            <td class="text-center">' . $layanan['min'] . '</td>

            <td class="text-center">' . $layanan['max'] . '</td>

            <td class="text-center">' . $harga . '/K</td>

            <td class="text-center">' . $hargaapi . '/K</td>

            <td class="text-' . $warna . '"><i class="' . $icon . '"></i> ' . $layanan['status'] . '</td>

        </tr>';
    }
  }

  // kategori ppob
  public function katppob()
  {
    $tipe = $_POST['tipe'];
    $this->db->query("SELECT * FROM kategori_layanan WHERE server ='$tipe' ORDER BY nama ASC");
    $kategorippob = $this->db->resultSet();

    echo '<option value="">Pilih Salah Satu</option>';
    foreach ($kategorippob as $katppob) {
      echo '<option value="' . $katppob['kode'] . '">' . $katppob['nama'] . '</option>';
    }
  }

  // layanan ppob
  public function layananppob()
  {
    $tipe = $_POST['tipe'];
    $operator = $_POST['operator'];
    $this->db->query("SELECT * FROM layanan_pulsa WHERE operator ='$operator' AND tipe = '$tipe' ORDER BY harga ASC ");
    $layananppob = $this->db->resultSet();

    foreach ($layananppob as $layanan) {
      $harga = number_format($layanan['harga'], 0, ',', '.');
      $hargaapi = number_format($layanan['harga_api'], 0, ',', '.');
      if ('Normal' == $layanan['status']) {
        $icon = 'simple-icon-check';
        $warna = 'success';
      } else {
        $icon = 'simple-icon-close';
        $warna = 'danger';
      }
      echo '

           <tr>

           <td class="text-center">' . $layanan['service_id'] . '</td>

           <td class="text-center">' . $layanan['layanan'] . '</td>

           <td class="text-center">' . $layanan['deskripsi'] . '</td>

           <td class="text-center">' . $harga . '</td>

           <td class="text-center">' . $hargaapi . '</td>

           <td class="text-' . $warna . '"><i class="' . $icon . '"></i> ' . $layanan['status'] . '</td>

       </tr>';
    }
  }

  public function chat()
  {
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Chat Room';
    $data['faq'] = $this->model('Halaman_model')->daftarfaq();
    $data['db'] = $this->dbh;
    $usersf = $this->dbh->query("SELECT * FROM users");
    $usersf->execute();
    $data['users'] = $usersf->fetchAll();

    $this->view('templates/header', $data);
    $this->view('halaman/chat', $data);
    $this->view('templates/footer');
  }

  public function ticketrecord()
  {
    $username = $_SESSION['user']['username'];
    $data['user'] = $this->model('Home_model')->datauser($username);
    $data['db'] = $this->dbh;

    $this->view('halaman/tickets-receiver', $data);
  }

  public function ticketview($id)
  {
    $username = $_SESSION['user']['username'];
    $data['user'] = $this->model('Home_model')->datauser($username);
    $data['id_tiket'] = $id;
    $getticket = $this->dbh->prepare("SELECT * FROM tiket WHERE id = '$id'");
    $getticket->execute();
    $data['tiket'] = $getticket->fetch();
    $data['db'] = $this->dbh;
    $data['title'] = "Ticket#$id";
    $this->view('templates/header', $data);
    $this->view('halaman/tickets-view', $data);
    $this->view('templates/footer');
  }

  public function tickets()
  {
    $username = $_SESSION['user']['username'];
    $data['user'] = $this->model('Home_model')->datauser($username);
    $data['title'] = 'Help Desk Ticket System';
    $data['faq'] = $this->model('Halaman_model')->daftarfaq();
    $data['db'] = $this->dbh;
    $getticket = $this->dbh->prepare("SELECT * FROM tiket WHERE user = '$username'");
    $getticket->execute();
    $data['my_tickets'] = $getticket->fetchAll(PDO::FETCH_ASSOC);

    $this->view('templates/header', $data);
    $this->view('halaman/tickets', $data);
    $this->view('templates/footer');
  }

  // halaman kontak admin
  public function kontakadmin()
  {
    new Session();
    $data['user'] = $this->model('Home_model')->datauser($_SESSION['user']['username']);
    $data['title'] = 'Kontak Admin';
    $data['daftaradmin'] = $this->model('Halaman_model')->daftaradmin();

    $this->view('templates/header', $data);
    $this->view('halaman/kontakadmin', $data);
    $this->view('templates/footer');
  }
}
