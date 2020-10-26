<?php

if (!user()->is_admin()) {
  e('{
    "recordsTotal": 1,
    "recordsFiltered": 1,
    "data": [
        {
            "id": 1,
            "code": "No Data",
            "token": "",
            "limit": 0,
            "success": 0
        }
    ],
    "draw": 1,
    "request": []
  }');
};

$search = (string) isset($_REQUEST['search']['value']) ? $_REQUEST['search']['value'] : '';
if (!empty($search)) {
  $search = " `code` LIKE '%$search%' AND ";
}

$sql = "SELECT * FROM `coupon` WHERE
$search
`limit` > `success`
"; //LIMIT $start, $length
if (user()->is_admin()) {
  $result['sql'] = pdo()->trim($sql);
}
$p = pdo()->pdo()->prepare(pdo()->trim($sql));
$p->execute();
$data = $p->fetchAll();
$result['recordsTotal'] = count($data);
$result['recordsFiltered'] = (int) count($data);
$data_filter = array_map(function ($map_data) {
  $i = 0;
  foreach ($map_data as $key => $value) {
    if (is_numeric($value)) {
      $map_data[$key] = (int) $value;
    }
    if ('price' == $key) {
      $map_data[$key] = (string) \Accounting\money::nominal($value, 'IDR');
    }

    if ($i == count($map_data) - 1) {
      return $map_data;
    }
    ++$i;
  }

  return $map_data;
}, $data);

$start = (int) isset($_REQUEST['start']) ? $_REQUEST['start'] : 0;
$length = (int) isset($_REQUEST['length']) ? $_REQUEST['length'] : 1;
$result['data'] = array_values(array_slice($data_filter, $start, $length, true));

$result['draw'] = isset($_REQUEST['draw']) ? $_REQUEST['draw'] : 1;
$result['request'] = $_POST;

e($result);
