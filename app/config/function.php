<?php
function tanggal_indo($tanggal)
{
    $bulan = array(
        1 =>   'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember'
    );
    $split = explode('-', $tanggal);
    return $split[2] . ' ' . $bulan[(int)$split[1]] . ' ' . $split[0];
}

function filter($data)
{

    $filter = stripslashes(strip_tags(htmlspecialchars(htmlentities($data, ENT_QUOTES))));

    return $filter;
}

function acak($length)
{
    $str = "";
    $karakter = array_merge(range('A', 'Z'), range('a', 'z'), range('0', '9'));
    $max_karakter = count($karakter) - 1;
    for ($i = 0; $i < $length; $i++) {
        $rand = mt_rand(0, $max_karakter);
        $str .= $karakter[$rand];
    }
    return $str;
}

function acak_nomor($length)
{
    $str = "";
    $karakter = array_merge(range('0', '9'));
    $max_karakter = count($karakter) - 1;
    for ($i = 0; $i < $length; $i++) {
        $rand = mt_rand(0, $max_karakter);
        $str .= $karakter[$rand];
    }
    return $str;
}

function time_elapsed_string($datetime, $full = false)
{
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'Tahun',
        'm' => 'Bulan',
        'w' => 'Minggu',
        'd' => 'Hari',
        'h' => 'Jam',
        'i' => 'Menit',
        's' => 'Detik',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? '' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) $string = array_slice($string, 0, 1);
    return $string ? implode(', ', $string) . ' Yang Lalu' : 'Baru Saja';
}

function get_client_ip()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP']))
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_X_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    else if (isset($_SERVER['HTTP_FORWARDED_FOR']))
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    else if (isset($_SERVER['HTTP_FORWARDED']))
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    else if (isset($_SERVER['REMOTE_ADDR']))
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    else
        $ipaddress = 'IP tidak dikenali';
    return $ipaddress;
}

function validate_date($date)
{
    $d = DateTime::createFromFormat('Y-m-d', $date);
    return $d && $d->format('Y-m-d') == $date;
}

function infojson($url)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
}

function Show($tabel, $limit)
{
    global $conn;
    $CallData = mysqli_query($conn, "SELECT * FROM " . $tabel . " WHERE " . $limit);
    $ThisData = mysqli_fetch_assoc($CallData);
    return $ThisData;
}

function followers_count($data)
{
    $id = file_get_contents("https://instagram.com/web/search/topsearch/?query=" . $data);
    $id = json_decode($id, true);
    $count = $id['users'][0]['user']['follower_count'];
    return $count;
}

function likes_count($data)
{
    $id = file_get_contents("" . $data . "?&__a=1");
    $id = json_decode($id, true);
    $count = $id['graphql']['shortcode_media']['edge_media_preview_like']['count'];
    return $count;
}

function views_count($data)
{
    $id = file_get_contents("" . $data . "?&__a=1");
    $id = json_decode($id, true);
    $count = $id['graphql']['shortcode_media']['video_view_count'];
    return $count;
}
