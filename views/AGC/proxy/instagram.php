<?php
onlyLocalhost();
$parser = new \DimasProxyParser\DimasProxyParser();
$parser->disableAllServices();

if (isreq('RuService')) {
  $parser->enableService("FreeproxyListRuService");
  $parser->setConfig("FreeproxyListRuService", [
    "limit" => 100,
    "token" => "demo"
  ]);
}

$parser->startParsing(100);
$parser->truncateList(20);
precom($parser->serviceList);
?>
<select name="" id="" class="form-control">
  <?php
  for ($i = 0; $i < count($parser->serviceList); $i++) {
    switch ($s) {
      case 'FreeproxyListRuService':
        echo '<option value="RuService">Service ' . ($i + 1) . '></option>';
        break;

      default:
        echo '<option value="' . $parser->serviceList[$i] . '">Service ' . ($i + 1) . '</option>';
        break;
    }
  }
  ?>
</select>
<?php
if (isreq('get')) {
  precom($parser->getList());
}


/*


$parser->disableAllServices();
$parser->enableService("FreeproxyListRuService");
$parser->setConfig("FreeproxyListRuService", [
  "limit" => 100,
  "token" => "demo"
]);
//precom($parser);

$start = time();
$parser->startParsing(100);
$parser->truncateList(20);
var_dump($parser->services);
*/
