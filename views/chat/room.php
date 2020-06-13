<?php

use JSON\json;

$connect = pdo()->pdo();
if (isset($_REQUEST['from']) && isset($_REQUEST['to']) && user()->is_login()) {
  user()->update_last_seen();
  $from_user_id = $_REQUEST['from'];
  $to_user_id = $_REQUEST['to'];
  if (isset($_POST['send']) && isset($_POST['chat_message'])) {
    $chat = $_POST['chat_message'];
    if (empty($chat)) {
      return;
    }
    $data = [
      ':to_user_id' => $to_user_id,
      ':from_user_id' => user()->userdata('id'),
      ':chat_message' => $chat,
      ':status' => '1',
    ];

    $query = '
    INSERT INTO chat_message
    (to_user_id, from_user_id, chat_message, status)
    VALUES (:to_user_id, :from_user_id, :chat_message, :status)
    ';

    $statement = $connect->prepare($query);
    $statement->execute($data);
  }
  $history = [];
  $historySQL = pdo()->query("SELECT * FROM chat_message
	WHERE (`from_user_id` = '$from_user_id' AND `to_user_id` = '$to_user_id')
	OR (`from_user_id` = '$to_user_id' AND `to_user_id` = '$from_user_id')
  ORDER BY timestamp ASC")->row_array();
  if (!\ArrayHelper\helper::isSequent($historySQL)) {
    $history[] = $historySQL;
  } else {
    $history = $historySQL;
  }
  //exit(var_dump($history));
  $result = [];
  foreach ($history as $chat) {
    if (!$chat || empty($chat)) {
      continue;
    }
    if (2 == $chat['status']) {
      $chat['chat_message'] = 'Deleted';
    }
    if ($chat['from_user_id'] == $from_user_id) {
      $chat['state'] = 'sent';
      $chat['html'] = '<div class="messages messages--sent">
      <div class="message">' . $chat['chat_message'] . '</div>
    </div>';
    } else {
      $chat['state'] = 'receive';
      $chat['html'] = '<div class="messages messages--received">
      <div class="message">' . $chat['chat_message'] . '</div>
    </div>';
    }
    $result[] = $chat;
  }
  if (!($this instanceof \MVC\themes)) {
    $theme = new \MVC\themes();
  }
  if ($theme->isJSONRequest()) {
    exit(json::json($result));
  } else {
    header('Content-Type: text/event-stream');
    header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
    header('Cache-Control: post-check=0, pre-check=0', false);
    header('Cache-Control: no-cache');
    $serverTime = time();

    //SEND($serverTime, 'server time: ' . date('h:i:s', time()));
    echo "id: $serverTime" . PHP_EOL;
    $data = trim(json_encode($result, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
    echo "data: $data" . PHP_EOL;
    echo PHP_EOL;
    ob_flush();
    flush();
  }
}
