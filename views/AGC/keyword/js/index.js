var GLOBAL_DATA = {},
  btnprocess = $('.float-right-bottom');

sessionStorage.scrollPos = $(window).scrollTop();

$(window).scroll(function () {
  sessionStorage.scrollPos = $(window).scrollTop();
  //console.log(sessionStorage.scrollPos);
});

$(document).on('click', '[class="float-right-bottom"]', function (e) {
  e.preventDefault();
  var form = document.createElement('form');
  form.setAttribute('action', '/AGC/keyword/builder');
  form.setAttribute('method', 'post');
  form.setAttribute('target', 'DomProcess');
  form.setAttribute('id', 'formProcess');
  form.setAttribute('style', 'max-height:500px;overflow: auto');
  var selectedItems = document.querySelectorAll('.item-added');
  for (var index = 0; index < selectedItems.length; index++) {
    var ie = selectedItems[index].cloneNode(true);
    ie.removeAttribute('class');
    var textarea = document.createElement('textarea');
    textarea.className = 'd-none';
    textarea.name = ie.getAttribute('data-id');
    textarea.value = htmlFromDom(ie);// escapeHTML();
    form.appendChild(textarea);
    var div = document.createElement('div');
    div.className = 'alert alert-success';
    div.innerHTML = htmlFromDom(ie);
    form.appendChild(div);
    if (index == selectedItems.length - 1) {
      swal({
        title: 'Confirm selection',
        content: form,
        buttons: {
          cancel: false,
          success: 'X'
        }
      });
    }
  }
});

$(document).on('submit', '[id="formProcess"]', function (e) {
  e.preventDefault();
  window.open($(this).attr('action'), $(this).attr('target')).focus();
});

$("#formQuery").submit(function (e) {
  e.preventDefault();
  searchNow();
});
$("#formQuery").trigger('submit');

var resultHTMLindicator = true;

function searchNow() {
  Loading('Searching..', {
    position: 'right'
  });

  $.post('/AGC/keyword/query', {
    q: $("#squery").val()
  }, function (res) {
    Loading(false);
    if (typeof res[0] != 'undefined') {
      res = res[0];
    }
    if (!res || res.hasOwnProperty('error')) {
      return toastr.warning('Retrying using different method', 'Search result chunked', {
        onShown: searchNow
      });
    }
    if (res.hasOwnProperty('link')) {
      res.link = array_unique(res.link);
      var html_indicator = [];
      for (var index = 0; index < res.link.length; index++) {
        var element = res.link[index];
        $.post('/AGC/keyword/exec', {
          class: element
        }, function (hj) {
          if (!hj) {
            return;
          }
          if (typeof hj[0] != 'undefined') {
            hj = hj[0];
          }
          if (resultHTMLindicator) {
            $("#domR").append(hj);
            html_indicator.push(hj);
          } else {
            $("#domR").html(hj);
            html_indicator.push(hj);
            resultHTMLindicator = true;
          }
        }).always(function () {
          if (index == res.link.length - 1) {
            resultHTMLindicator = false;

            var indic = $("#domR").html().toString().trim();
            if (!indic || indic == '') {
              $("#domR").html('<div class="alert alert-danger">No result in our database</div>');
            }
          }
        });
      }
    }
  });
}
/*
$("[id='selectParse']").click(function (e) {
  e.preventDefault();
  var Result = $("#domR"); //.toggleClass('drag-drop');
  var that = $(this);
  Result.children('div,p,h1,h2,h3,h4,h5,img').not('a').each(function (i) {
    if (this.innerText.toString().trim() != '') {
      if (that.data('type') == 'enable') {
        //this.classList.toggle('drag-drop');
        if (!this.getElementsByClassName('indicator-tag').length) {
          this.innerHTML += '<div class="indicator-tag border-primary border-bottom float-sm-right"><div class="form-check"> <input type="checkbox" class="form-check-input" id="checkOut' + i + '"> <label class="form-check-label" for="checkOut' + i + '">Add This</label> </div></div>';
        }
      } else {
        //this.classList.remove('drag-drop');
        this.getElementsByClassName('indicator-tag')[0].remove();
      }
    }
  });
});
*/

$(document).on('contextmenu', 'div[id="domR"]', function (e) {
  var top = e.pageY - 10;
  var left = e.pageX - 90;
  //console.log($(e.target).attr('data-id'));
  var ID = domControl(e, true);
  //console.log(ID);
  if (ID) {
    $('[id="add-btn"], [id="remove-btn"]').attr('data-target', ID);
  }
  $("#context-menu").css({
    display: "block",
    top: top,
    left: left
  }).addClass("show").fadeIn('fast');
  return false; //blocks default Webbrowser right click menu
}).on("click", function (e) {
  $("#context-menu").removeClass("show").fadeOut('fast');
  //domControl(e, false);
})
/*.on('mouseover', 'div[id="domR"] *', function (e) {
  domControl(e, true);
}).on('mouseout', 'div[id="domR"] *', function (e) {
  domControl(e, false);
});*/

$(document).on("click", "[id='context-menu'] a", function (e) {
  e.preventDefault();
  //$(this).parent().removeClass("show").hide();
  var target = $(this).attr('data-target');

  var elt = $('[data-id="' + target + '"]');
  if ($(this).hasClass('add')) {
    elt.attr('class', 'item-added border border-success p-1');
  } else if ($(this).hasClass('remove')) {
    elt.removeAttr('class');
  }
  scrollBack();
  var countSelected = checkSelectedItems();
  if (countSelected) {
    btnprocess.removeClass('d-none');
  } else {
    btnprocess.addClass('d-none');
  }
});

$(document).on('click', 'div[id="domR"] a:not(.dropdown-item)', function (e) {
  e.preventDefault();
  return false;
});
/**
 *
 * @param {jQuery} e
 * @param {Boolean} type
 * @param {Boolean} onlyID
 */
function domControl(e, type, onlyID) {
  var target = $(e.target);
  var parent = target.parents('span,p,h1,h2,h3,h4,h5,ul,ol');
  //console.log(target[0].className, target[0].className.includes('item-added'))
  if (target.hasClass('dropdown-item') || target.attr('id') == 'domR') {
    return false;
  }

  if (target[0].nodeName != 'SPAN') {
    contextButton(target[0]);
    var cl = 'border border-blue p-1';
    if (!onlyID) {
      if (type) {
        if (!target.hasClass(cl) && !target.hasClass('item-added')) {
          target.addClass(cl);
        }
      } else {
        target.removeClass(cl);
      }
    }
    if (!target.data('id')) {
      target.attr('data-id', uuidv4());
    }
    return target.data('id');
  } else {
    contextButton(parent);
    var cl = 'border border-violet p-1';
    if (!onlyID) {
      if (type) {
        if (!parent.hasClass(cl) && !parent.hasClass('item-added')) {
          parent.addClass(cl);
        }
      } else {
        parent.removeClass(cl);
      }
    }
    if (!parent.data('id')) {
      parent.attr('data-id', uuidv4());
    }
    return parent.data('id');
  }
}
/**
 * COntext button controller
 * @param {JQueryStatic} target
 */
function contextButton(target) {
  if (!target) $("[id='context-menu'] a").hide();
  if ($(target).hasClass('item-added')) {
    $("[id='context-menu'] a.remove").show();
    $("[id='context-menu'] a.add").hide();
  } else {
    $("[id='context-menu'] a.remove").hide();
    $("[id='context-menu'] a.add").show();
  }
}
/**
 * Scroll back to previous position
 */
function scrollBack() {
  $(window).scrollTop(sessionStorage.scrollPos || 0);
  //console.log(sessionStorage.scrollPos)
}
/**
 * Count selected items
 */
function checkSelectedItems() {
  var items = $('#domR .item-added');
  if (items.length) return items.length;
  return false;
}
/**
 * Create HTML from DOMNode
 * @param {Node} ClonedNode
 */
function htmlFromDom(ClonedNode) {
  var target = document.getElementById('element-helper');
  if (!target) {
    document.body.innerHTML += '<div id="element-helper" style="display:none"></div>';
    target = document.getElementById('element-helper');
  }
  target.innerHTML = '';
  var wrap = document.createElement('div');
  wrap.appendChild(ClonedNode);
  return wrap.innerHTML;
}
/**
 * Escape HTML string
 * @param {String} str
 */
function escapeHTML(str) {
  return new Option(str).innerHTML;
}