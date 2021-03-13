<?php

function getUid()
{
  return substr(md5(uniqid(rand(), true)), 1, 4);
}
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
header('Content-Type: text/html; charset=UTF-8');
header('X-XSS-Protection: 0');

$uid = getUid();

$maxDocLen = 240000;
$cDocument = @$_POST['txtOrigHTMLCode'];

if (strlen($cDocument) > $maxDocLen) {
  die('Max doc len exceeded.');
}

function randomColor()
{
  $str = '#';
  for ($i = 0; $i < 6; ++$i) {
    $randNum = rand(0, 15);
    switch ($randNum) {
    case 10:
    $randNum = 'A';
    break;
    case 11:
    $randNum = 'B';
    break;
    case 12:
    $randNum = 'C';
    break;
    case 13:
    $randNum = 'D';
    break;
    case 14:
    $randNum = 'E';
    break;
    case 15:
    $randNum = 'F';
    break;
  }
    $str .= $randNum;
  }

  return $str;
}

function unMaskExpression($p_obj, $doc)
{
  $arr = $p_obj->replaces;
  foreach ($arr as $key => $val) {
    $doc = str_replace($key, $val, $doc);
  }

  return $doc;
}
function maskExpression($expr, $doc)
{
  $rpl = [];

  while (preg_match($expr, $doc, $m, PREG_OFFSET_CAPTURE)) {
    $matchText = $m[0][0];
    $startMatch = $m[0][1];
    $endMatch = $startMatch + strlen($matchText);
    $docStart = substr($doc, 0, $startMatch);
    $docEnd = substr($doc, $endMatch);
    $tmpId = getUid();
    $tmpId = '<' . $tmpId . '>';
    $rpl[$tmpId] = $matchText;
    $doc = $docStart . $tmpId . $docEnd;
  }

  return (object) ['replaces' => $rpl, 'doc' => $doc];
}
if (get_magic_quotes_gpc()) {
  $cDocument = stripslashes($cDocument);
  // strip off the slashes if they are magically added.
}
$txtOrigHTMLCode = $cDocument;

$obj = maskExpression('/([<][?].+[?][>])/isU', $cDocument);
$cDocument = $obj->doc;
$obj2 = maskExpression("/([<]script.+[<]\/script[>])/isU", $cDocument);
$cDocument = $obj2->doc;
$obj3 = maskExpression("/([<]style.+[<]\/style[>])/isU", $cDocument);
$cDocument = $obj3->doc;
//$obj4=maskExpression("/(\/\*.+\*\/)/isU",$cDocument); $cDocument=$obj4->doc;
$cAdStyle = '';
$styleNodeRegex = "/[<](\w+)\s+[^>]*(style\s*=\s*(['\"])([^>]+)\g{-2})[^>]*[>]/isU";
$idNodeRegex = "/id\s*=\s*(['\"])([^>]+)\g{-2}/isU";
if ($cDocument) {
  while (preg_match($styleNodeRegex, $cDocument, $sMatches, PREG_OFFSET_CAPTURE)) {
    $cElement = $sMatches[1][0];
    $cNode = $sMatches[0][0];
    $cStyleStart = $sMatches[2][1];
    $cStyleEnd = $cStyleStart + strlen($sMatches[2][0]);
    $cStyle = $sMatches[4][0];
    $cId = null;
    $newId = '';
    $highId = -1;
    //lets capture original id
    if (preg_match($idNodeRegex, $cNode, $idMatches, PREG_OFFSET_CAPTURE)) {
      $cId = $idMatches[2][0];
    //id found so lets use it
    } else {
      //lets get unique id
      $nodeRegex = '/' . $cElement . '[_]' . $uid . '[_]([0-9]+)/';
      //find highest number
      if (preg_match_all($nodeRegex, $cDocument, $uidMatches)) {
        foreach ($uidMatches[1] as $id) {
          if ($id > $highId) {
            $highId = $id;
          }
        }
      }
      ++$highId;
      $newId = $cElement . '_' . $uid . '_' . $highId;
      $cId = $newId;
      $newId = "id=\"$newId\"";
    }
    //lets replace style with new id

    $docStart = substr($cDocument, 0, $cStyleStart);
    $docEnd = substr($cDocument, $cStyleEnd);

    $cDocument = $docStart . $newId . $docEnd;
    $cAdStyle .= '#' . $cId . '{' . $cStyle . '}' . "\n";
  }
  if ('' == $cAdStyle) {
    $cAdStyle = '//No inline styles found.';
  }
}
$cDocument = unMaskExpression($obj, $cDocument);
$cDocument = unMaskExpression($obj2, $cDocument);
$cDocument = unMaskExpression($obj3, $cDocument);
//  $cDocument=unMaskExpression($obj4,$cDocument);

$cAdStyle = unMaskExpression($obj, $cAdStyle);
$cAdStyle = unMaskExpression($obj2, $cAdStyle);
$cAdStyle = unMaskExpression($obj3, $cAdStyle);
//  $cAdStyle=unMaskExpression($obj4,$cAdStyle);

$_SESSION['cAdStyle'] = $cAdStyle;
$_SESSION['cDocument'] = $cDocument;
$_SESSION['uid'] = $uid;
