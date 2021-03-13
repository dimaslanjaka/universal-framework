$(document).ready(function() {

  toastr.options.escapeHtml = false;
  var $button_trigger = $('button:not(#webhook-test)');
  // Smart Wizard
  $('#smartwizard').smartWizard({
    lang: { // Language variables
      next: 'Next',
      previous: 'Previous'
    },
    theme: 'arrows',
  });

  $('#submitter').click(function(e) {
    e.preventDefault();
    webhook_requester('submit_post');
  });

  $('[name^="webhook"]').change(function(e) {
    e.preventDefault();
    $(this).val($(this).val().toString().trim());
    var DATA = {
      'update-webhook': true
    };
    DATA[$(this).attr('name')] = $(this).val().toString().trim();
    console.log(DATA)
    $.ajax({
      url: location.pathname,
      headers: {
        'Webhook': true
      },
      method: 'POST',
      data: DATA
    });
    webhook_requester('test');
  });
  webhook_requester('test');
  $("#webhook-test").click(function(e) {
    e.preventDefault();
    return webhook_requester('test');
  });

  function webhook_requester(mode) {
    if ($('[name="webhook-url"]').val() && $('[name="webhook-pass"]').val()) {
      loadingio(mode == 'test' ? 'Testing webhook' : 'Requesting webhook');
      var DATA = {
        'WMInsert': true,
        'WMIpass': $('[name="webhook-pass"]').val().toString().trim(),
      };
      var HEADERS = {
        'Insert-Post': true
      };
      if (mode == 'test') {
        HEADERS['Webhook-Test'] = true;
      } else if (mode == 'submit_post') {
        //HEADERS['Insert-Test'] = true;
        $('form#' + FORM_ID).serializeArray().forEach(function(A) {
          if (A.value) {
            A.value = A.value.toString().trim();
          }
          DATA[A.name] = A.value;
        });
        console.log(DATA);
      }
      $.ajax({
        url: $('[name="webhook-url"]').val().toString().trim(),
        headers: HEADERS,
        method: 'POST',
        data: DATA,
        complete: function(res) {
          res = res.responseJSON;
          if (typeof res.success != 'undefined' && typeof res.message != 'undefined') {
            if (res.success === true) {
              toastr.success(res.message, 'Webhook Info:');
              enable_trigger();
            } else {
              toastr.warning(res.message, 'Webhook Info:');
              disable_trigger();
            }
          } else if (typeof res.error != 'undefined' && typeof res.message != 'undefined') {
            toastr.error(res.message, 'Webhook Info:');
            disable_trigger();
          } else {
            toastr.error('Webhook Test Failed', 'Webhook Info:');
            disable_trigger();
          }
          loadingio(null, null, 'disabled');
        }
      });
    }
  }

  function enable_trigger() {
    setTimeout(() => {
      $button_trigger.prop('disabled', false);
    }, 500);
  }

  function disable_trigger() {
    setTimeout(() => {
      $button_trigger.prop('disabled', true);
    }, 500);
  }

});