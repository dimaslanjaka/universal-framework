<?php


$yturl = isset($_REQUEST['yt']) ? urlencode(urldecode($_REQUEST['yt'])) : 'null';
$u = 'https://odownloader.com';
get_web_page($u, null, 'https://google.com/search?q=yt to 320 kbps');
if ($yturl) {
  $d = "$u/download?q=$yturl";
  $x = get_web_page($d);
  $dw = $x['content'];
  $g = str_get_html($dw);
  $gf = $g->find('form');
  unset($gf[0]);
  foreach ($gf as $f) {
    if ('complaint_form' == $f->id) {
      continue;
    }
    $f->action = $u . $f->action;
    //echo $f->outertext;
    $uq = null;
    foreach ($f->find('input,button') as $input) {
      $uq[$input->name] = $input->value;
    }
    $ux = $f->action . '?' . http_build_query($uq);
    $bn = preg_match('/quality\=(\d{2,3})/m', $ux, $txt);
    echo "<button class='btn btn-primary mr-2' data-curl='$bn'>{$txt[1]} Kbps</button>";
  }
}
