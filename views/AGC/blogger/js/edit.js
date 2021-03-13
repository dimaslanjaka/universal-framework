if ($('#summernote').length) {
  $('#summernote').summernote({
    height: 500,
    placeholder: 'Tap to start writing',
    codemirror: {
      mode: 'text/html',
      htmlMode: true,
      lineNumbers: true,
      theme: 'material'
    },
    callbacks: {
      onKeyup: function (e) {
        setTimeout(function () {
          $('#live-preview').html(e.target.innerHTML);
          window.editor.setValue(e.target.innerHTML);
          window.editor.refresh();
        }, 200);
      },
      onInit: function () {

      },
      onFocus: function () {

      },
      onBlur: function () {
        var $self = $(this);
        setTimeout(function () {
          if ($self.summernote('isEmpty') && !$self.summernote('codeview.isActivated')) {

          }
        }, 300);
      }
    }
  });
  var accordion = $("#accordion");

  $('#title-visual, #title-plaintext').change(function (e) {
    var id = $(this).attr('id');
    if (id == 'title-visual') {
      $("#title-plaintext").val($(this).val());
    } else {
      $("#title-visual").val($(this).val());
    }
  });

  window.editor = CodeMirror.fromTextArea(document.getElementById("body-plaintext"), {
    lineNumbers: true,
    lineWrapping: true,
    hint: true,
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

  window.editor.on('keyup', function (cMirror) {
    $('#live-preview').html(cMirror.getValue());
    $("#summernote").summernote("code", cMirror.getValue());

  });

  window.editor.on('change', function (cMirror) {
    var doc = parseDocument(window.editor.getValue(), 'text/html');
    var DOM = doc.dom.querySelectorAll('iframe,img,a');

    var seo = $('#seo_result'), ehtml = $("#html_error_result");
    if (typeof doc.error != 'undefined') {
      ehtml.html(doc.message);
      var error_msg = ehtml.find('parsererror');
      if (error_msg.length) {
        for (var index = 0; index < error_msg.length; index++) {
          var element = error_msg[index];
          element.removeAttribute('style')
          element.setAttribute('class', 'alert alert-danger');
          element.setAttribute('role', 'alert');
        }
      }
      $('#html-error-collapse').collapse('show');
    }
    if (DOM.length) {
      var message = $('<ul/>').append(`<p class="tx-danger">Critical SEO Detected:</p>`).attr('id', 'seo-detected');
      var detected = 0, identifier = [];
      for (let index = 0; index < DOM.length; index++) {
        var element = DOM[index];
        var tag = element.tagName.toLowerCase();
        var hasTitle = element.hasAttribute('title');
        var hasAlt = element.hasAttribute('alt');
        var hasRel = element.hasAttribute('rel');
        var src = element.getAttribute('src');
        if (!src || src == '') {
          src = element.outerHTML;
        }
        var href = element.getAttribute('href');
        if (!href || href == '' || href == '#' || href.match(/^\#/gm)) {
          href = element.outerHTML;
        }
        if (tag == 'img' && !inArray(src, identifier)) {
          if (!hasTitle) {
            identifier.push(src);
            var li = $('<li/>').html(`image: not have <kbd class="">TITLE</kbd> attribute <a data-find="${src}" data-toggle="tooltip" title="Peek a string"><i class="fas fa-search"></i></a>`);
            message.append(li);
            detected++;
          }

          if (!hasAlt) {
            identifier.push(src);
            var li = $('<li/>').html(`image: not have <kbd class="">ALT</kbd> attribute <a data-find="${src}" data-toggle="tooltip" title="Peek a string"><i class="fas fa-search"></i></a>`);
            message.append(li);
            detected++;
          }
        } else if (tag == 'a' && !inArray(href, identifier)) {
          if (!hasTitle) {
            identifier.push(href);
            var li = $('<li/>').html(`anchor: not have <kbd class="">TITLE</kbd> attribute <a data-find="${href}" data-toggle="tooltip" title="Peek a string"><i class="fas fa-search"></i></a>`);
            message.append(li);
            detected++;
          }
          if (!hasRel) {
            identifier.push(href);
            var li = $('<li/>').html(`anchor: not have <kbd class="">REL</kbd> attribute <a data-find="${href}" data-toggle="tooltip" title="Peek a string"><i class="fas fa-search"></i></a> <a data-scroll="#a-rel" data-toggle="tooltip" title="Peek a definition"><i class="fas fa-book"></i></a>`);
            message.append(li);
            detected++;
          }
        } else if (tag == 'iframe' && !inArray(src, identifier)) {
          if (!hasTitle) {
            identifier.push(src);
            var li = $('<li/>').html(`iframe: not have <kbd class="">TITLE</kbd> attribute <a data-find="${src}" data-toggle="tooltip" title="Peek a string"><i class="fas fa-search"></i></a>`);
            message.append(li);
            detected++;
          }
        }
      }
      if (!detected || detected == 0) {
        message = $('<ul/>').html('<p class="tx-success">No SEO problems detected</p>');
      }
      seo.replaceWith(message);
      $('#seo-collapse').collapse('show');
    }
  });

  $(document).on('click', '[data-scroll]', function () {
    $(window).scrollTop($($(this).data('scroll')).offset().top);
  });

  function parseDocument(str, type) {
    if (!type) {
      type = 'text/xml';
    }
    var parser = new DOMParser();
    var dom = parser.parseFromString(str, type);
    if (isParseError(dom)) {
      return {
        'error': true,
        'message': getParseError(dom),
        'dom': dom
      };
    }
    return {
      'dom': dom,
      'message': 'No HTML error detected'
    };
  }

  function isParseError(parsedDocument) {
    var parser = new DOMParser(),
      errorneousParse = parser.parseFromString('<', 'text/xml'),
      parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI;

    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
      return parsedDocument.getElementsByTagName("parsererror").length > 0;
    }

    return parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0;
  };

  function getParseError(parsedDocument) {
    var parser = new DOMParser(),
      errorneousParse = parser.parseFromString('<', 'text/xml'),
      parsererrorNS = errorneousParse.getElementsByTagName("parsererror")[0].namespaceURI, documentError;

    if (parsererrorNS === 'http://www.w3.org/1999/xhtml') {
      documentError = parsedDocument.getElementsByTagName("parsererror");
    } else {
      documentError = parsedDocument.getElementsByTagNameNS(parsererrorNS, 'parsererror');
    }
    //console.log(documentError);
    return documentError;
  }

  $(document).on('click', '[data-find]', function (e) {
    e.preventDefault();
    var str = $(this).data('find');
    var cursor = window.editor.getSearchCursor(str);
    cursor.findNext();
    window.editor.setSelection(cursor.from(), cursor.to());
  });

  var srcvalue = $('#source');
  if (srcvalue.length) {
    $("#summernote").summernote("code", srcvalue.html());
    window.editor.setValue(srcvalue.html());
    window.editor.refresh();
    srcvalue.remove();
  }
  $('[name="label"]').keyup(function (e) {
    e.preventDefault();
    var label = $('[id="label-helper"]');
    var split = $(this).val() ? $(this).val().toString().trim().split(',') : false;
    if (split) {
      var splitted = '';
      split.forEach(function (l) {
        splitted += `<span class="badge badge-primary mr-1">${l.trim()}</span>`;
      });
      label.html(splitted);
    }
    setTimeout(() => {
      $('[name="label"]').val($(this).val());
    }, 500);
  });

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

  $('#clean-inline').click(function (e) {
    e.preventDefault();
    editor.inlineStyleRemover();
  });
  if ($('#detach-codemirror').length) {
    $('#detach-codemirror').click(function (e) {
      e.preventDefault();
      editor.setOption("mode", 'text/plain');
    });
  }
  if ($('#attach-codemirror').length) {
    $('#attach-codemirror').click(function (e) {
      e.preventDefault();
      editor.setOption("mode", 'text/html');//htmlmixed
    });
  }
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

  $(document).on('click', '[data-form]', function (t) {
    t.preventDefault();
    var form = $('form#' + $(this).data('form'));
    swal("Are you sure?", {
      dangerMode: true,
      buttons: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        return form.submit();
      }
    });
  });

  if (typeof update != 'undefined') {
    if (update) {
      if (typeof refreshURL != 'undefined') {
        toastr.options.onHidden = function () {
          location.replace(refreshURL);
        }
      }
      toastr.success('Article updated successfully', 'Update success');
    } else {
      toastr.error('Article updated unsuccessfully', 'Update failed');
    }
  }

  accordion.on("hide.bs.collapse show.bs.collapse", e => {
    $(e.target)
      .prev()
      .find("i:last-child")
      .toggleClass("fa-minus fa-plus");
  });

  if (typeof AGC_HASH != 'undefined') {
    var hash = $('form').find('[name="hash"]');
    if (!hash.length) {
      $('form').prepend('<input id="hash" name="hash" type="hidden" value="' + AGC_HASH + '"/>');
    }
  }
}