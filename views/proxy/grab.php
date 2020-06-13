<?php
header('Content-Type: text/plain');
$url = 'http://spys.one/en/https-ssl-proxy/';
$curl = new \Proxy\grab();
$curl->set_api_headers([
  'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Accept-Encoding' => 'gzip, deflate, br',
  'Accept-Language' => 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ms;q=0.6',
  'DNT' => '1',
  'SEC-FETCH-DEST' => 'document',
  'SEC-FETCH-MODE' => 'navigate',
  'SEC-FETCH-SITE' => 'none',
  'UPGRADE-INSECURE-REQUESTS' => '1',
  'USER-AGENT' => 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
]);
$curl->setReferer('https://www.google.com/');
$curl->get($url);
if (!$curl->error) {
  $dom = new \simplehtmldom\simple_html_dom();
  $html = $dom->str_get_html($curl->response);
  if ($html->find('td')) {
    foreach ($html->find('td') as $td) {
      //var_dump($td->innertext);
    }
  }
  if ($html->find('font.spy14')) {
    foreach ($html->find('font.spy14') as $font) {
      $inner = str_replace('TwoThreeZero', '10988 ^ 8000', $font->innertext);
      $inner = str_replace('TwoZeroSixEight', '5 ^ 10988 ^ 8000', $inner);
      $inner = str_replace(['EightNineThreeSeven', 'Two9Nine'], ['9 ^ 4169 ^ 8088', '12026 ^ 9090'], $inner);
      var_dump($inner);
    }
  }
}
?>
<script>
  console.clear();
  Four = 4;
  Zero = 1;
  Five = 5;
  Nine = 3;
  Eight1Six = 7439 ^ 808;
  ThreeOneTwo = 11659 ^ 3127;
  TwoThreeZero = 10988 ^ 8000;
  Two9Nine = 12026 ^ 9090;
  Six = 7;
  Four0Three = 4456 ^ 8909;
  One = 8;
  ThreeFiveFour = 9121 ^ 8888;
  Eight = 2;
  SixThreeEight = 10483 ^ 8090;
  Seven = 0;
  OneEightFive = 1712 ^ 1080;
  Six5Seven = 6704 ^ 88;
  Five6One = 4169 ^ 8088;
  Two = 9;
  Three = 6;
  Four2OneSix = Seven ^ Four0Three;
  FiveThreeSevenFour = Zero ^ Six5Seven;
  Two3ZeroFive = Eight ^ SixThreeEight;
  SevenEightTwoTwo = Nine ^ OneEightFive;
  Five2EightNine = Four ^ ThreeOneTwo;
  //TwoZeroSixEight = Five ^ TwoThreeZero;
  Seven3FiveThree = Three ^ Eight1Six;
  NineSevenNineZero = Six ^ ThreeFiveFour;
  SixFiveFourOne = One ^ Two9Nine;
  //EightNineThreeSeven = Two ^ Five6One;
  EightNineThreeSeven = 9 ^ 4169 ^ 8088;
  TwoZeroSixEight = 5 ^ 10988 ^ 8000;

  document.write('x' + (TwoZeroSixEight ^ TwoThreeZero) + (SixFiveFourOne ^ Two9Nine) + (SevenEightTwoTwo ^ OneEightFive) + (Seven3FiveThree ^ Eight1Six));

  document.write('<hr/>');
  document.write(TwoZeroSixEight ^ TwoThreeZero)
</script>