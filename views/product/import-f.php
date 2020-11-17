<?php

if (isset($_REQUEST['save'])) {
  header('Content-type: application/json');
  $path = realpath(__DIR__ . '/default-image.png');
  $type = pathinfo($path, PATHINFO_EXTENSION);
  $data = file_get_contents($path);
  $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
  $connect = pdo()->mysqli();
  $request_body = file_get_contents('php://input');
  $decode = json_decode($request_body);
  $valid['success'] = ['success' => false, 'messages' => [], 'fail' => []];

  $sqls = [];
  $fail = false;

  foreach ($decode as $excelData) {
    $sql = 'INSERT INTO `product` ';
    $sqld = '(';
    $sqlv = ' VALUES (';
    $sqladd = '';
    $indexer = 0;
    foreach ($excelData as $key => $value) {
      ///$key = mysqli_escape_string(pdo()->mysqli(), $key);
      $value = pdo()->escape($value);
      //var_dump($value);

      $sqld .= "`$key`";
      $sqlv .= "'$value'";
      if (!isset($excelData->product_type)) {
        $fail = true;
        $valid['fail'][] = $excelData;
        break;
      }

      // Detect
      if ($indexer != count((array) $excelData) - 1) { //is not last iteration
        $sqld .= ', ';
        $sqlv .= ', ';
      } else { // is last iteration
        $sqld .= ')';
        $sqlv .= ')';
        $sql .= "$sqld $sqlv ON DUPLICATE KEY UPDATE `product_type` = '$excelData->product_type'";
      }
      ++$indexer;
    }

    $sqls[] = $sql;
  }

  if (!$fail) {

    $imploded = implode("; \n", $sqls);
    if (true === $connect->query($imploded)) {
      $valid['success'] = true;
      $valid['messages'] = 'Successfully Updated';
    } else {
      $valid['success'] = false;
      $valid['messages'] = 'Error while importing database. ' . mysqli_error($connect);
      $valid['sql'] = $sqls;
    }
  }

  \JSON\json::json($valid);
  exit;
}

/*
INSERT INTO `product`(
    `product_name`,
    `product_alias`,
    `brand_id`,
    `categories_id`,
    `product_type`,
    `unit`,
    `active`,
    `status`
)
VALUES(
    `Akarbose tab 100 mg`,
    `-`,
    `1`,
    `1`,
    `SS`,
    `tablet`,
    `1`,
    `1`
) WHERE NOT EXISTS (
SELECT `product_name` FROM `product` WHERE `product_name` = ''
) */
