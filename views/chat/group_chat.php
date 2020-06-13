<?php

//group_chat.php

include 'database_connection.php';

if ('insert_data' == $_POST['action']) {
  $data = [
    ':from_user_id' => $_SESSION['user_id'],
    ':chat_message' => $_POST['chat_message'],
    ':status' => '1',
  ];

  $query = '
	INSERT INTO chat_message
	(from_user_id, chat_message, status)
	VALUES (:from_user_id, :chat_message, :status)
	';

  $statement = $connect->prepare($query);

  if ($statement->execute($data)) {
    echo fetch_group_chat_history($connect);
  }
}

if ('fetch_data' == $_POST['action']) {
  echo fetch_group_chat_history($connect);
}
