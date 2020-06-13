<?php

use JSON\json;

$str = 'GET https://mbasic.facebook.com/?_rdc=1&_rdr HTTP/1.1
Host: mbasic.facebook.com
Connection: keep-alive
DNT: 1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36
Sec-Fetch-Dest: document
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: none
Sec-Fetch-Mode: navigate
Accept-Encoding: gzip, deflate, br
Accept-Language: id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ms;q=0.6
Cookie: sb=Vq4zXcQgKx_Qv1lRn6jQUMi5; datr=t5ZtXYkKmU0hYDf4NKAnqXxW; _fbp=fb.1.1580749254234.1225801085; c_user=100001995776790; xs=2%3A9drJB6o1GnLXyw%3A2%3A1580863073%3A19810%3A10794; m_pixel_ratio=1; x-referer=eyJyIjoiL3N0b3JpZXMvdmlld190cmF5X3BhZ2luYXRpb24vMTA4MjQ2NjQwMzEyOTgzLz90cmF5X3Nlc3Npb25faWQ9YjcyMWNkMDQtNjAyYy00MTlmLTg2OTAtMTZhMDVlYjE4NTkwJnRocmVhZF9pZD0yNTE4MTIwNTI2MjMxMDcmZW5kX2N1cnNvcj1NVEF3TURBeE9UazFOemMyTnprd09qRTZNVFU0TmpZeU1qZ3hNam94TmpZMU9URXpOek13TVRJeU5EZzNPaTB4T25CeWJqb3lNVGd3T1Rrd01USTJORFUxT1RNNU5USXhPakE2TVRVNE5qWXlNamd4TWpvdyZoYXNfbmV4dF9wYWdlPWZhbHNlIiwiaCI6Ii9zdG9yaWVzL3ZpZXdfdHJheV9wYWdpbmF0aW9uLzEwODI0NjY0MDMxMjk4My8%2FdHJheV9zZXNzaW9uX2lkPWI3MjFjZDA0LTYwMmMtNDE5Zi04NjkwLTE2YTA1ZWIxODU5MCZ0aHJlYWRfaWQ9MjUxODEyMDUyNjIzMTA3JmVuZF9jdXJzb3I9TVRBd01EQXhPVGsxTnpjMk56a3dPakU2TVRVNE5qWXlNamd4TWpveE5qWTFPVEV6TnpNd01USXlORGczT2kweE9uQnliam95TVRnd09Ua3dNVEkyTkRVMU9UTTVOVEl4T2pBNk1UVTROall5TWpneE1qb3cmaGFzX25leHRfcGFnZT1mYWxzZSIsInMiOiJtIn0%3D; presence=EDvF3EtimeF1587209841EuserFA21B01995776790A2EstateFDutF1587209841128CEchF_7bCC; act=1587209841677%2F0; wd=1366x768; fr=0AWKYOwNZK6Sk6EED.AWX27UQLK2h5t5kAnt7N_go7j3I.BdMNE1.Os.F6Z.0.0.Bem-Fb.AWWs8pVU; spin=r.1002011833_b.trunk_t.1587286378_s.1_v.2_

';
json::json([], 1, false);

$parse = explode(PHP_EOL . PHP_EOL, $str);
$header = $parse[0];
$body = $parse[1];

$header_builder = explode(PHP_EOL, $header);

$result = stringb('$ch = curl_init();') . stringb('curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);');

if (preg_match('/^(GET|POST|PUT|PATCH|DELETE|HEAD)/s', $header_builder[0], $method)) {
  $method_builder = preg_split("[\s]", $header_builder[0]);
  if ('POST' == $method_builder[0]) {
    $result .= stringb('curl_setopt($ch, CURLOPT_POST, 1);');
  } else {
    $result .= stringb('curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");');
  }
  if (filter_var($method_builder[1], FILTER_VALIDATE_URL)) {
    $result .= stringb('curl_setopt($ch, CURLOPT_URL, "' . $method_builder[1] . '");');
  }
  //evj($header_builder);
}
unset($header_builder[0]);
$result .= stringb('$headers = array();');
foreach ($header_builder as $header) {
  $result .= stringb('$headers[] = "' . str_replace('"', '\"', $header) . '";');
}
$result .= stringb('curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);');

if (!empty($body)) {
  $result .= stringb('curl_setopt($ch, CURLOPT_POSTFIELDS, "' . str_replace('"', '\"', $body) . '");');
}

$result .= stringb('
curl_setopt($ch,CURLOPT_ENCODING , "gzip");
$result = curl_exec($ch);
if (curl_errno($ch)) {
    echo \'Error:\' . curl_error($ch);
}
var_dump($result);
curl_close($ch);');

echo $result;

file_put_contents(__DIR__ . '/raw2curl_result.php', "<?php \n\n $result \n\n ?>");

//evj($header_builder);

function stringb($str)
{
  return $str . PHP_EOL;
}
