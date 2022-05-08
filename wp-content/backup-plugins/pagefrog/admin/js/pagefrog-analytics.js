(function ( $ ) {
    'use strict';

    jQuery(document).on('ready', function () {

        // show the thickboxes on click events
        jQuery('.thickbox-trigger').click(function () {
            tb_show(jQuery(this).attr('data-thickbox-title'), '#TB_inline?width=600&height=550&inlineId=' + jQuery(this).attr('data-thickbox-target'));
            jQuery('#TB_window').css({
                'width': 600
            });
            jQuery('#TB_ajaxContent').css({
                'padding': 0,
                'overflow-x':'hidden'
            });
        });

        // submit the form when submit buttons are pushed
        jQuery(document).on('click', '.submit-analytics', function (e) {
            e.stopPropagation();
            e.preventDefault();
            tb_remove();
            console.log('you submitted it!');
            jQuery('#pagefrog-analytics-settings-form').submit();
        });

        // sync the visible inputs with the invisible ones every time a change is made
        jQuery(document).on('change', '.sync-form', function () {
            jQuery('#pagefrog-analytics-settings-form input[name="' + jQuery(this).attr('name') + '"]').val(jQuery(this).val());
        });

        // allow people to disable integrations by changing the invisible form and then submitting
        jQuery(document).on('click', '.disable-integration', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery(jQuery(this).attr('data-integration-id')).val('false');
            jQuery('#pagefrog-analytics-settings-form').submit();
        });

        // allow people to enable integrations by changing the invisible form and then submitting
        jQuery(document).on('click', '.enable-integration', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery(jQuery(this).attr('data-integration-id')).val('true');
            jQuery('#pagefrog-analytics-settings-form').submit();
        });

        // launch the pop-up to authorize with google when people click on the sign in with google button
        jQuery(document).on('click', '.auth-google-analytics', function (e) {
            e.stopPropagation();
            e.preventDefault();
            var new_window = window.open(jQuery(this).attr('data-href'), '_blank', 'fullscreen=no,height=600,width=800,menubar=no,resizable=yes,titlebar=no,toolbar=no,left=300,top=300', false);
        });

        // allow people to choose which site should be used with their google analytics account
        jQuery(document).on('click', '.google-analytics-choose-site', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery('#pagefrog-google-analytics-site-id').val(jQuery(this).attr('data-google-analytics-tracking-code'));
            jQuery('#pagefrog-analytics-settings-form').submit();
        });

        // hook up the postmessage handler to catch authorization details
        if (window.addEventListener) {
            window.addEventListener('message', receivedPostMessage, false);
        } else {
            window.attachEvent('onmessage', receivedPostMessage);
        }

        // on load, check if there are any error messages. If so, bring up the first one we can find in the thickbox
        var error_boxes = jQuery(".analytics-modal .error-box");
        if (error_boxes.length > 0) {
            var modal = jQuery(error_boxes[0]).closest('.analytics-modal');
            jQuery('[data-thickbox-target="' + modal.attr('id') + '"]').click();
        }
    });

    function receivedPostMessage(e) {
        var parsed_data = JSON.parse(e.data);
        if (parsed_data.hasOwnProperty('source') && parsed_data.source == 'pagefrog') {
            jQuery('#pagefrog-google-analytics-access-token').val(parsed_data.auth_data.access_token);
            jQuery('#pagefrog-google-analytics-refresh-token').val(parsed_data.auth_data.refresh_token);
            jQuery('#pagefrog-analytics-settings-form').submit();
        }
    }

})( jQuery );