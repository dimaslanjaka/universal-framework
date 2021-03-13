var modal = jQuery('#modalAjax');

function e_modal_error(data) {
  console.log(typeof data)
  modal.find('[id="title"]').removeClass('tx-success').addClass('tx-danger').html('Failure!');
  modal.find('[id="desc"]').html(JSON.stringify(data));
  modal.find('#icon').addClass('ion-ios-close-circle-outline tx-danger').removeClass('ion-ios-checkmark-circle-outline tx-success');
  modal.find('.btn').removeClass('btn-success').addClass('btn-danger');
  modal.modal('show');
}

function e_modal_success(data) {
  modal.find('[id="title"]').removeClass('tx-danger').addClass('tx-success').html('Successfull!');
  modal.find('[id="desc"]').html(data);
  modal.find('#icon').removeClass('ion-ios-close-circle-outline tx-danger').addClass('ion-ios-checkmark-circle-outline tx-success');
  modal.find('.btn').removeClass('btn-danger').addClass('btn-success');
  modal.modal('show');
}

jQuery('form[id="ajax"]').submit(function (e) {

  e.preventDefault(); // avoid to execute the actual submit of the form.

  var form = jQuery(this);
  var url = form.attr('action');
  var method = form.attr('method');

  jQuery.ajax({
    type: "POST",
    url: url,
    data: form.serialize(),
    success: function (data) {
      //console.log({ url: url, method: method, data: data });
      data = (data[0] || data);
      if (!data) {
        e_modal_error(data)
      }
      if (data.hasOwnProperty('success')) {
        e_modal_success(data.success)
      } else if (data.hasOwnProperty('error')) {
        e_modal_error(data.error)
      } else {
        e_modal_error(data);
      }
      if (data.hasOwnProperty('redirect')) {
        window.location.href = data.redirect;
      } else if (data.redirect || typeof redirect_to != 'undefined') {
        window.location.href = redirect_to;
      }
      if (data.hasOwnProperty('reset') && data.reset) {
        form.trigger('reset');
      }
      if (data.hasOwnProperty('refresh') && data.refresh) {
        window.location.reload(1);
      }
      if (typeof gexec != 'undefined') {
        gexec();
      }
    }
  });


});

/** Format Rupiah */
var inputrp = jQuery('[id="format-rupiah"]');
if (inputrp.length) {
  inputrp.on('keyup keydown change', function (e) {
    var t = jQuery(this);
    var v = t.val();
    var n = t.next('.form-text, #rupiah');
    if (dimas.isNumber(v)) {
      var V = dimas.rp(v);
      t.css('border-color', 'green');
      dimas.enable_button(t, V);
    } else {
      var V = 'Bukan nomor';
      t.css('border-color', 'red');
      dimas.disable_button(t, V);
    }
    if (n.length) {
      n.text(V);
    } else {
      jQuery('<p id="rupiah" class="form-text text-muted">' + V + '</p>').insertAfter(t);
    }
  });
}

/** datetime-local */
if (typeof dimas == 'object' && typeof dimas.datetimelocal != 'undefined') {
  dimas.datetimelocal();
}

/** metode rekening (debet) */
var select_method = jQuery('select[id="method"]');
if (select_method.length) {
  select_method.change(function () {
    var t = jQuery(this),
      v = t.val(),
      r = t.next('input#rekening');
    if (v == 'debit') {
      if (r.length === 0) {
        jQuery('<input type="text" class="form-control mt-2" name="rekening" placeholder="No rekening" id="rekening" required>').insertAfter(t).hide().show('slow');
      }
    } else {
      r.hide('slow', function (params) {
        setTimeout(function () {
          r.remove()
        }, 1000);
      });
    }
  });
}

/** Tooltip */
jQuery('[data-toggle="tooltip"]').tooltip();

// colored tooltip
jQuery('[data-toggle="tooltip-primary"]').tooltip({
  template: '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
});

jQuery('[data-toggle="tooltip-secondary"]').tooltip({
  template: '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
});

jQuery('[data-toggle="tooltip-danger"]').tooltip({
  template: '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
});

/** datatables */
if (jQuery.fn.DataTable && jQuery('#datatable1').length) {
  jQuery('#datatable1').DataTable({
    responsive: true,
    language: {
      searchPlaceholder: 'Search...',
      sSearch: '',
      lengthMenu: '_MENU_ items/page',
    }
  });
}

/** Select2 */
var ds = jQuery('.dataTables_length select');
if (ds.length || ds.data('select2') || jQuery.fn.select2) {
  ds.select2({
    minimumResultsForSearch: Infinity
  });
}

/** Query URL */
var hash = window.location.hash.substr(1);

var result = hash.split('&').reduce(function (result, item) {
  var parts = item.split('=');
  result[parts[0]] = parts[1];
  return result;
}, {});

if (hash.length > 1) {
  console.log(result);
}

jQuery('a[data-param]').click(function (e) {
  e.preventDefault();
  var t = jQuery(this),
    h = t.attr('href'),
    p = t.attr('data-param');

});

/** Progress bar */
var elm = jQuery('[countdown]');

if (elm.length > 0) {
  elm.each(function (e) {
    var t = jQuery(this);
    dimas.pctd(t);
  });
}

/** document body listener */
jQuery(document.body).on('click', '[data-redirect]', function (E) {
  var red = jQuery(this).attr('data-redirect');
  if (red && red != '') {
    window.open(red, location.host).focus();
  }
});

/** Linkify */
if (typeof mask_link != 'undefined') {
  var L = (jQuery('[data-linkify]').length ? jQuery('[data-linkify]') : jQuery(document.body))
  window.onload = function () {
    L.linkify({
      target: "_blank",
      attributes: null,
      className: 'linkified',
      format: function (value, type) {
        return value;
      },
      formatHref: function (href, type) {
        return '/youtube/s/' + btoa(CryptoJS.AES.encrypt(href, (typeof hash_pass != 'undefined' ? hash_pass : location.host)));
      },
    });
  }
}

//new tab links hide refferer
var nwtb = $('[data-newtab]');
if (nwtb.length) {
  nwtb.click(function (e) {
    window.open('http://href.li/?' + $(this).data('newtab'), 'newtab').focus();
  });
}

//links new tab form submit
var aform = $('[form]');
if (aform.length > 1) {
  aform.click(function (e) {
    e.preventDefault();
    var id_form = $(this).attr('form');
    if (typeof id_form != 'undefined') {
      var winame = document.getElementById(id_form).getAttribute('target'); //reduce caching
      console.log('Submiting Form ID#' + id_form);
      window.open('', winame ? winame : 'FormDynamic').focus();
      document.getElementById($(this).attr('form')).submit();
    }
    //w = window.open('', 'bagas31-post');
    //$('form#' + $(this).attr('form')).submit();
    //w.focus();
  });
}

//open in new tab
if (typeof openInNewTab == 'undefined') {
  function openInNewTab(url, name) {
    if (typeof url != 'undefined' && typeof name != 'undefined') {
      var win = window.open(url, name);
      win.focus();
    }
  }
}

//open in new tab
var linknewtab = $('[id="newtab"]');
if (linknewtab.length) {
  linknewtab.click(function (e) {
    e.preventDefault();
    if ($(this).attr('href')) {
      openInNewTab($(this).attr('href'), ($(this).data('name') ? $(this).data('name') : '_blank'));
    }
  });
}

//asynchronous
(function () {
  console.log(dimas);
})();