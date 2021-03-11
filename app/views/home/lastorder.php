<?php
header('Content-Type: application/json');
/**
 * @var PDO|Database
 */
$pdo = $data['db'];

foreach ($data['pembelian'] as $order) {
  if (strtolower($order['status']) == 'error') {
    $username = $order['user'];
    $price = (float) $order['harga'];
    $id_order = $order['id_pesan'];
    $refund = $order['refund'];
    $userfetch = $pdo->prepare("SELECT * FROM users WHERE username = '$username'");
    $userfetch->execute();
    $user = $userfetch->fetch(PDO::FETCH_ASSOC);
    $usersaldo = (float) $user['saldo_top_up'];
    $saldorefund = $usersaldo + $price;

    //var_dump($usersaldo, $price, $saldorefund);
    //var_dump($order);
    //SELECT * FROM users
    if ($refund != '1') {
      $update_saldo = $pdo->prepare("UPDATE users SET saldo_top_up = '$saldorefund' WHERE username = '$username'");
      $update_saldo->execute();
      $update_status = $pdo->prepare("UPDATE semua_pembelian SET refund = '1'  WHERE id_pesan = '$id_order'");
      $update_status->execute();
      //var_dump($order['user']);
    }
  }
}
