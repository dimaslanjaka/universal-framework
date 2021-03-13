if ($('#summernote').length) {
  $('#summernote').summernote({
    placeholder: 'Start writing',
    tabsize: 2,
    height: 500,
    callbacks: {
      onKeyup: function (e) {
        setTimeout(function () {
          $('#live-preview').html(e.target.innerHTML);
          window.editor.setValue(e.target.innerHTML);
          $("#wp-body").val(e.target.innerHTML);
          window.editor.refresh();
        }, 200);
      }
    }
  });

  $("#summernote").summernote("code", $('#source').html());

  $('#title-visual, #title-plaintext').change(function (e) {
    var id = $(this).attr('id');
    if (id == 'title-visual') {
      $("#title-plaintext").val($(this).val());
    } else {
      $("#title-visual").val($(this).val());
    }
    $("#wp-title").val($(this).val());
  });
  /** Wordpress save */
  $("#save-wp").click(function (e) {
    e.preventDefault();
    $("#wp-title").val($("#title-plaintext").val());
    $("#wp-body").val(window.editor.getValue());
    $("#wp-tab").click().trigger('click');
    return false;
  });
  /** Blogger save */
  $("[id='save-blogger']").click(function (e) {
    e.preventDefault();
    loadingio('Stacking, please wait');
    $("#save-wp").trigger('click');
    $.post('/AGC/blogger/index', {
      'test': true
    }, function (r) {
      if (r) {
        if (typeof r[0] != 'undefined') {
          r = r[0];
        }
        if (typeof r.success != 'undefined') {
          var form = $("form#wp-post");
          form.attr('action', '/AGC/blogger/create');
          if (typeof r.type != 'undefined') {
            if (r.type == 'choose_blog') {
              loadingio(null, null, 'disable');
              var selectBlog = document.createElement('select');
              selectBlog.className = 'form-control';
              selectBlog.id = 'blogger-chooser';
              //console.log(r);
              if (typeof r.message != 'undefined' && r.message) {
                for (let index = 0; index < r.message.length; index++) {
                  var element = r.message[index];
                  var option = document.createElement("option");
                  option.value = element.id;
                  option.text = element.name;
                  selectBlog.appendChild(option);
                }
                swal({
                  title: 'Choose your blog',
                  content: selectBlog,
                  closeOnClickOutside: false,
                  closeOnEsc: false,
                }).then(function (c) {
                  var blogId = $('select#blogger-chooser').val();
                  $.post('/AGC/blogger/index', {
                    'set-blog': blogId
                  }, function (r) {
                    console.log(r, blogId);
                    return form.submit();
                  });
                });
              }
            }
          }
        } else if (typeof r.message != 'undefined' && typeof r.type != 'undefined') {
          var msg_type;
          loadingio(null, null, 'disable');
          switch (r.type) {
            case 'blogger_access':
              msg_type = 'Authenticate with blogger is required, click here to give blogger access';
              break;

            case 'blogger_id':
              msg_type = 'Blogger ID required, you must add into your account manually here'
              break;
            case 'blog_id':
              msg_type = 'Blog ID required, you must add into your account manually here'
              break;
          }
          console.log(r);
          swal({
            title: 'Blogger access is required',
            content: {
              element: 'a',
              attributes: {
                target: '_blank',
                href: r.message,
                innerHTML: msg_type
              }
            }
          }).then(function (C) {
            swal({
              title: 'Click save blogger',
              content: {
                element: 'p',
                attributes: {
                  innerHTML: 'Click save <i class="fab fa-blogger">logger</i> again to reinitialize blogger instance'
                }
              }
            })
          });
        }
      }
    })
  });
  if (document.getElementById("body-plaintext")) {
    window.editor = CodeMirror.fromTextArea(document.getElementById("body-plaintext"), {
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: {
        "Ctrl-Q": function (cm) {
          cm.foldCode(cm.getCursor());
        },
        "Ctrl-Space": "autocomplete",
      },
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      mode: 'htmlmixed',
      //mode: "text/html",
      readOnly: false,
      theme: 'material',
      autoRefresh: true,
    });
  }
  window.editor.on('keyup', function (cMirror) {
    $('#live-preview').html(cMirror.getValue());
    $("#summernote").summernote("code", cMirror.getValue());
    $("#wp-body").val(cMirror.getValue());
  });
  window.editor.setValue($('#source').html());
  $('#source').remove();
  window.editor.refresh();
  //CodeMirror.commands["selectAll"](window.editor);
  $('#autoFormatSelection').click(function (e) {
    e.preventDefault();
    CodeMirror.commands["selectAll"](window.editor);
    var range = {
      from: window.editor.getCursor(true),
      to: window.editor.getCursor(false)
    };
    window.editor.autoFormatRange(range.from, range.to);
  });
  $('#commentSelection-true').click(function (e) {
    e.preventDefault();
    var range = {
      from: window.editor.getCursor(true),
      to: window.editor.getCursor(false)
    };
    editor.commentRange(true, range.from, range.to);
  });
  $('#commentSelection-false').click(function (e) {
    e.preventDefault();

    var range = {
      from: window.editor.getCursor(true),
      to: window.editor.getCursor(false)
    };
    editor.commentRange(false, range.from, range.to);
  });


  // When the user scrolls the page, execute StickyNow

  var header = document.getElementById("myHeader");
  if (header) {
    window.onscroll = function () {
      StickyNow()
    };
    var sticky = header.offsetTop;

    function StickyNow() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky-top");
      } else {
        header.classList.remove("sticky-top");
      }
    }
  }
  if (document.getElementById('showTX')) {
    setTimeout(function () {
      $('#showTX').html('');
    }, 10000);
  }
}