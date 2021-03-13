$(document).ready(function() {
  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.js').done(function(e) {
    $('#summernote').summernote({
      placeholder: 'Visual editor bootstrap 4',
      tabsize: 2,
      height: 500,
      callbacks: {
        onKeyup: function(e) {
          setTimeout(function() {
            $('#live-preview').html(e.target.innerHTML);
            window.editor.setValue(e.target.innerHTML);
            window.editor.refresh();
          }, 200);
        }
      }
    });
    $("#summernote").summernote("code", $('#source').html());
    $('#title-visual, #title-plaintext').change(function(e) {
      var id = $(this).attr('id');
      if (id == 'title-visual') {
        $("#title-plaintext").val($(this).val());
      } else {
        $("#title-visual").val($(this).val());
      }
    });
    $("#save-wp").click(function(e){
      e.preventDefault();
      $("#wp-title").val($("#title-plaintext").val());
      $("#wp-body").val(window.editor.getValue());
      $("#wp-tab").click().trigger('click');
      return false;
    });
    window.editor = CodeMirror.fromTextArea(document.getElementById("body-plaintext"), {
      lineNumbers: true,
      lineWrapping: true,
      extraKeys: {
        "Ctrl-Q": function(cm) {
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

    window.editor.on('keyup', function(cMirror) {
      $('#live-preview').html(cMirror.getValue());
      $("#summernote").summernote("code", cMirror.getValue());
    });
    window.editor.setValue($('#source').html());
    $('#source').remove();
    window.editor.refresh();
    CodeMirror.commands["selectAll"](window.editor);
    $('#autoFormatSelection').click(function(e) {
      e.preventDefault();
      CodeMirror.commands["selectAll"](window.editor);
      var range = {
        from: window.editor.getCursor(true),
        to: window.editor.getCursor(false)
      };
      window.editor.autoFormatRange(range.from, range.to);
    });
    $('#commentSelection-true').click(function(e) {
      e.preventDefault();

      var range = {
        from: window.editor.getCursor(true),
        to: window.editor.getCursor(false)
      };
      editor.commentRange(true, range.from, range.to);
    });
    $('#commentSelection-false').click(function(e) {
      e.preventDefault();

      var range = {
        from: window.editor.getCursor(true),
        to: window.editor.getCursor(false)
      };
      editor.commentRange(false, range.from, range.to);
    });

  });
});

// When the user scrolls the page, execute StickyNow
window.onscroll = function() {
  StickyNow()
};
var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function StickyNow() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky-top");
  } else {
    header.classList.remove("sticky-top");
  }
}

setTimeout(function() {
  if (document.getElementById('showTX')) {
    $('#showTX').html('');
  }
}, 10000);