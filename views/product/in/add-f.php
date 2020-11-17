<?php

user()->login_required('/user/login');

if (isPost()) {
  $valid['success'] = ['success' => false, 'messages' => []];

  /**
   * Code item.
   */
  $code = getPost('code', '-', POST_NOT_EMPTY);
  /**
   * Item from product id list.
   */
  $productId = getPost('product', null, POST_NOT_EMPTY);
  /**
   * Product factory.
   */
  $producerId = getPost('producer', null, POST_NOT_EMPTY);
  /**
   * Quality.
   */
  $quality = getPost('quality', 'normal', POST_NOT_EMPTY);
  /**
   * Quantity.
   */
  $quantity = getPost('quantity', 0);
  /**
   * Expiring dates.
   */
  $expire = getPost('expires', (string)current_timestamp(), POST_NOT_EMPTY);
  /**
   * Incoming date.
   */
  $dateCreated = getPost('incoming-date', (string)current_timestamp(), POST_NOT_EMPTY);

  $arr = [
    'expires' => current_timestamp($expire),
    'created' => current_timestamp($dateCreated)
  ];
  $sql = "INSERT INTO `product_in`(`product_id`, `code`, `quality`, `quantity`, `expires`, `producer_id`, `created`) VALUES('$productId', '$code', '$quality', '$quantity', '{$arr['expires']}', '$producerId', '{$arr['created']}')";

  $connect = pdo()->mysqli();
  if (true === $connect->query($sql)) {
    $valid['success'] = true;
    $valid['messages'] = 'Successfully Added';
  } else {
    $valid['success'] = false;
    $valid['messages'] = 'Error while adding the items';
  }

  $connect->close();

  \JSON\json::json($valid);
  exit;
}
