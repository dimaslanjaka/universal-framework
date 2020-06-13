<?php

//fetch_user_chat_history.php

include 'database_connection.php';

echo fetch_user_chat_history($_SESSION['login']['id'], $_POST['to_user_id'], $connect);
