<!--
//index.php
!-->

<?php

include 'database_connection.php';

if (!isset($_SESSION['login']['id'])) {
  header('location: /signin');
}
const SCRIPTSRC = ['https://code.jquery.com/ui/1.12.1/jquery-ui.js', 'https://cdn.rawgit.com/mervick/emojionearea/master/dist/emojionearea.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.form/4.2.2/jquery.form.js'];
?>

<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

<div class="container">
  <br />

  <h3 align="center">Chat Application using PHP Ajax Jquery</h3><br />
  <br />
  <div class="row">
    <div class="col-md-8 col-sm-6">
      <h4>Online User</h4>
    </div>
    <div class="col-md-2 col-sm-3">
      <input type="hidden" id="is_active_group_chat_window" value="no" />
      <button type="button" name="group_chat" id="group_chat" class="btn btn-warning btn-xs">Group Chat</button>
    </div>
    <div class="col-md-2 col-sm-3">
      <p align="right">Hi - <?php echo $_SESSION['login']['username']; ?> - <a href="logout.php">Logout</a></p>
    </div>
  </div>
  <div class="table">

    <div id="user_details"></div>
    <div id="user_model_details"></div>
  </div>
  <br />
  <br />

</div>


<style>
  .chat_message_area {
    position: relative;
    width: 100%;
    height: auto;
    background-color: #FFF;
    border: 1px solid #CCC;
    border-radius: 3px;
  }

  #group_chat_message {
    width: 100%;
    height: auto;
    min-height: 80px;
    overflow: auto;
    padding: 6px 24px 6px 12px;
  }

  .image_upload {
    position: absolute;
    top: 3px;
    right: 3px;
  }

  .image_upload>form>input {
    display: none;
  }

  .image_upload img {
    width: 24px;
    cursor: pointer;
  }
</style>

<div id="group_chat_dialog" title="Group Chat Window">
  <div id="group_chat_history" style="height:400px; border:1px solid #ccc; overflow-y: scroll; margin-bottom:24px; padding:16px;">

  </div>
  <div class="form-group">
    <!--<textarea name="group_chat_message" id="group_chat_message" class="form-control"></textarea>!-->
    <div class="chat_message_area">
      <div id="group_chat_message" contenteditable class="form-control">

      </div>
      <div class="image_upload">
        <form id="uploadImage" method="post" action="upload.php">
          <label for="uploadFile"><img src="/load-asset?src=/views/chat/upload.png" /></label>
          <input type="file" name="uploadFile" id="uploadFile" accept=".jpg, .png" />
        </form>
      </div>
    </div>
  </div>
  <div class="form-group" align="right">
    <button type="button" name="send_group_chat" id="send_group_chat" class="btn btn-info">Send</button>
  </div>
</div>

<?php

define('unminify', 1);
