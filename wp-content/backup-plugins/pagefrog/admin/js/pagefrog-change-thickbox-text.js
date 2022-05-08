(function ( $ ) {
    'use strict';
    jQuery(document).ready(function () {
        (function change_text() {
            window.setTimeout(change_text, 500);
            jQuery('input[value="Insert into Post"]').attr('value', 'Choose Logo');
            jQuery('#tab-type_url').css({
              display: 'none'
            });
        })();
    });
})( jQuery );