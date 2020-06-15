// activate smartform whole documents
smartform();

$(document).ready(function() {
  $(document).on('submit', 'form', function(e) {
    e.preventDefault();
    var t = $(this);
    /**
     * @type {JQueryAjaxSettings} settings
     */
    var settings = {
      data: t.serialize(),
      url: t.attr('action'),
      method: t.attr('method') || 'POST'
    };
    return ajx(settings)
      .done(function(res) {
        console.log(res);
        if (t.data('success') && typeof window[t.data('success')] == 'function') {
          window[t.data('success')](res);
        }
      });
  });

  //clipboard copy
  $('.btn-copy').click(function(e) {
    var el = $(this);
    var text = $('#' + el.data('source'));
    if (text.length) {
      /**
       * @type {String} tag
       */
      var tag = text.prop('tagName') ? text.prop('tagName').toString().toLowerCase() : '';
      console.log(tag);
      if (tag.match(/(input|textarea)/s)) {
        copyToClipboard(text.val(), el);
      }
    }
  });
});

function oauthGen(oauth) {
  console.log(oauth, $('#oauth-res'));
  $('#oauth-res').val(oauth);
  gexec('OauthIM3_APISimulator');
}



/**
 * otp request
 * @param {ObjectConstructor} res
 */
function otpreq(res) {

  if (res.hasOwnProperty('data')) {
    if (res.data.hasOwnProperty('tokenid')) {
      ajx({
        url: '/im3/profile/get',
        method: 'post',
        data: {
          get_profile: true
        },
        success: function(profile) {
          console.log(profile);
        }
      });
    }
  }
  gexec('Im3OtpRequest_ApiSimulation');
}


/*
$('#btnFixed1').on({
  click: function(e) {
    e.preventDefault();
    toggleFABMenu($('#btnFixed1'));
    return false;
  }
});

function toggleFABMenu(btn) {

  $this = btn;
  if ($this.hasClass('active') === false) {
    $this.addClass('active');
    $this.find('ul .btn-floating').velocity({
      scaleY: ".4",
      scaleX: ".4",
      translateY: "40px"
    }, {
      duration: 0
    });

    var time = 0;
    $this.find('ul .btn-floating').reverse().each(function() {
      $(this).velocity({
        opacity: "1",
        scaleX: "1",
        scaleY: "1",
        translateY: "0"
      }, {
        duration: 80,
        delay: time
      });
      time += 40;
    });
  } else {
    $this.removeClass('active');
    var time = 0;
    $this.find('ul .btn-floating').velocity("stop", true);
    $this.find('ul .btn-floating').velocity({
      opacity: "0",
      scaleX: ".4",
      scaleY: ".4",
      translateY: "40px"
    }, {
      duration: 80
    });
  }
}*/

recaptcha().init();