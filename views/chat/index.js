/** websocket steam */
var socket;
//socket_start(); //start websocket

function socket_start() {
  if (!socket) { //if socket is null
    console.log('WebSocket Started'); //start server
    socket = socket_server();
  }
  try {
    socket.onopen = function(msg) {
      console.log('socket initialized', msg);
    };
    socket.onmessage = function(msg) {
      var data = JSON.parse(msg.data);
      console.log(data);
    };
    socket.onclose = function(msg) {
      console.log({
        closed: socket,
        msg: msg
      });
    };
  } catch (ex) {
    console.log(ex);
  }
}

function socket_server() {
  console.log('Socket Initialized');
  // Set YOUR PHP FILE URL
  var host = '/chat/server';
  if (!!window.EventSource) {
    var socket = new EventSource(host);
  } else {
    var socket = new WebSocket(host);
  }
  return socket;
}

function socket_stop() {
  if (socket != null) {
    console.log("WebSocket Stopped");
    socket.close();
    socket = null;
  }
}

function socket_check() {
  return socket;
}

/* Chat steam */
$(document).ready(function() {

  fetch_user();

  setInterval(function() {
    update_last_activity();
    fetch_user();
    update_chat_history_data();
    fetch_group_chat_history();
  }, 5000);

  function fetch_user() {
    $.ajax({
      url: "fetch_user",
      method: "POST",
      success: function(data) {
        $('#user_details').html(data);
      }
    })
  }

  function update_last_activity() {
    $.ajax({
      url: "update_last_activity",
      success: function() {

      }
    })
  }


  $(function() {
    $(document).on('click', '.start_chat', function() {
      var to_user_id = $(this).data('touserid');
      var to_user_name = $(this).data('tousername');
      make_chat_dialog_box(to_user_id, to_user_name);
      $("#user_dialog_" + to_user_id).dialog({
        autoOpen: false,
        width: 400
      });
      $('#user_dialog_' + to_user_id).dialog('open');
      $('#chat_message_' + to_user_id).emojioneArea({
        pickerPosition: "top",
        toneStyle: "bullet"
      });
    });

    $(document).on('click', '.send_chat', function() {
      var to_user_id = $(this).attr('id');
      var chat_message = $.trim($('#chat_message_' + to_user_id).val());
      if (chat_message != '') {
        $.ajax({
          url: "insert_chat",
          method: "POST",
          data: {
            to_user_id: to_user_id,
            chat_message: chat_message
          },
          success: function(data) {
            //$('#chat_message_'+to_user_id).val('');
            var element = $('#chat_message_' + to_user_id).emojioneArea();
            element[0].emojioneArea.setText('');
            $('#chat_history_' + to_user_id).html(data);
          }
        })
      } else {
        alert('Type something');
      }
    });

    $(document).on('click', '.ui-button-icon', function() {
      $('.user_dialog').dialog('destroy').remove();
      $('#is_active_group_chat_window').val('no');
    });

    $(document).on('focus', '.chat_message', function() {
      var is_type = 'yes';
      $.ajax({
        url: "update_is_type_status",
        method: "POST",
        data: {
          is_type: is_type
        },
        success: function() {

        }
      })
    });

    $(document).on('blur', '.chat_message', function() {
      var is_type = 'no';
      $.ajax({
        url: "update_is_type_status",
        method: "POST",
        data: {
          is_type: is_type
        },
        success: function() {

        }
      })
    });

    $('#group_chat_dialog').dialog({
      autoOpen: false,
      width: 400
    });

    $('#group_chat').click(function() {
      $('#group_chat_dialog').dialog('open');
      $('#is_active_group_chat_window').val('yes');
      fetch_group_chat_history();
    });

    $('#send_group_chat').click(function() {
      var chat_message = $.trim($('#group_chat_message').html());
      var action = 'insert_data';
      if (chat_message != '') {
        $.ajax({
          url: "group_chat",
          method: "POST",
          data: {
            chat_message: chat_message,
            action: action
          },
          success: function(data) {
            $('#group_chat_message').html('');
            $('#group_chat_history').html(data);
          }
        })
      } else {
        alert('Type something');
      }
    });

    $('#uploadFile').on('change', function() {
      $('#uploadImage').ajaxSubmit({
        target: "#group_chat_message",
        resetForm: true
      });
    });

    $(document).on('click', '.remove_chat', function() {
      var chat_message_id = $(this).attr('id');
      if (confirm("Are you sure you want to remove this chat?")) {
        $.ajax({
          url: "remove_chat",
          method: "POST",
          data: {
            chat_message_id: chat_message_id
          },
          success: function(data) {
            update_chat_history_data();
          }
        })
      }
    });
  });

  function make_chat_dialog_box(to_user_id, to_user_name) {
    var modal_content = '<div id="user_dialog_' + to_user_id + '" class="user_dialog" title="You have chat with ' + to_user_name + '">';
    modal_content += '<div style="height:400px; border:1px solid #ccc; overflow-y: scroll; margin-bottom:24px; padding:16px;" class="chat_history" data-touserid="' + to_user_id + '" id="chat_history_' + to_user_id + '">';
    modal_content += fetch_user_chat_history(to_user_id);
    modal_content += '</div>';
    modal_content += '<div class="form-group">';
    modal_content += '<textarea name="chat_message_' + to_user_id + '" id="chat_message_' + to_user_id + '" class="form-control chat_message"></textarea>';
    modal_content += '</div><div class="form-group" align="right">';
    modal_content += '<button type="button" name="send_chat" id="' + to_user_id + '" class="btn btn-info send_chat">Send</button></div></div>';
    $('#user_model_details').html(modal_content);
  }

  function fetch_user_chat_history(to_user_id) {
    $.ajax({
      url: "fetch_user_chat_history",
      method: "POST",
      data: {
        to_user_id: to_user_id
      },
      success: function(data) {
        $('#chat_history_' + to_user_id).html(data);
      }
    })
  }

  function update_chat_history_data() {
    $('.chat_history').each(function() {
      var to_user_id = $(this).data('touserid');
      fetch_user_chat_history(to_user_id);
    });
  }



  function fetch_group_chat_history() {
    var group_chat_dialog_active = $('#is_active_group_chat_window').val();
    var action = "fetch_data";
    if (group_chat_dialog_active == 'yes') {
      $.ajax({
        url: "group_chat",
        method: "POST",
        data: {
          action: action
        },
        success: function(data) {
          $('#group_chat_history').html(data);
        }
      })
    }
  }

});