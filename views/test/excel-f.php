<?php

$str = 'Amitriptilin 25 mg	30
AMLODIPIN 5 mg tab	60
Amoxycillin 500 mg tab	15
Asam folat 1 mg	190
Asam mefenamat 500 mg tab	10
Bedak salisil 2%	1
Chlorpheniramine 4 mg (CTM)	33
Dexametason 0.5 mg tab	15
Glibenclamide 5 mg	30
Glycerin Guaiacolate 100mg	25';
preg_match_all('/(.*)\t(.*)/m', $str, $match);

$arr = [];
for ($i = 0; $i < count($match[1]); ++$i) {
  $arr[trim($match[1][$i])] = trim($match[2][$i]);
}

\JSON\json::json($arr);
exit;
