(function( $ ) {
    'use strict';

    jQuery(document).on('ready', function () {
        jQuery(document).on('change', '.sync-form', function () {
            var target_hidden_input = jQuery('form.hidden input[name="' + jQuery(this).attr('name') + '"]');
            if (jQuery(this).attr('type') == 'radio') {
                if (this.checked) {
                    target_hidden_input.val(jQuery(this).val());
                }
            } else if (jQuery(this).attr('type') == 'checkbox'){
                if (this.checked) {
                    target_hidden_input.val('true');
                } else {
                    target_hidden_input.val('false');
                }
            } else {
                target_hidden_input.val(jQuery(this).val());
            }
        });
    });
})( jQuery );