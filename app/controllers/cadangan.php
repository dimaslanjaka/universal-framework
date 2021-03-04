public function login($data)
{

$username = htmlspecialchars(rtrim($data['username']));
$password = $data['password'];

$this->dbh->query("SELECT * FROM users WHERE username = :username OR email = :username");
$this->dbh->bind('username', $username);
$cek_user = $this->dbh->single();

if (is_array($cek_user)) {
$data_user = $cek_user;
$verif_password = password_verify($password, $data_user['password']);

if ($verif_password <> $data_user['password']) {
    $alert = 'danger';
    $pesan = 'Username atau password salah!';
    } else if ($data_user['status'] == 'Suspended') {
    $alert = 'danger';
    $pesan = 'Akun anda telah di suspend!';
    } else if ($data_user['status_akun'] == 'Belum Verifikasi') {
    $alert = 'success';
    $pesan = 'Akun kamu belum di verifikasi, silahkan di verifikasi terlebih dahulu!';
    } else {


    $ipnya = get_client_ip();
    $date = $this->date;
    $time = $this->time;
    $user = $data_user['username'];
    $this->dbh->query("INSERT INTO aktifitas VALUES('','$user','Masuk','$ipnya','$date','$time')");
    $this->dbh->execute();

    $_SESSION['user'] = $data_user;
    header('Location:' . BASEURL);
    die;
    }
    } else if (is_bool($cek_user)) {

    $alert = 'danger';
    $pesan = 'Username atau password salah!';
    header('Location:' . BASEURL . 'auth');
    }

    $_SESSION['hasil'] = [
    'alert' => $alert,
    'pesan' => $pesan
    ];
    header('Location:' . BASEURL . 'auth');
    }