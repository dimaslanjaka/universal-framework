(function( $ ) {
    'use strict';

    jQuery(document).on('ready', function () {
        // launch the pop-up to authorize with google when people click on the sign in with google button
        var num_clicks_on_auth = 0;
        jQuery(document).on('click', '.auth-google-adsense', function (e) {
            e.stopPropagation();
            e.preventDefault();
            num_clicks_on_auth += 1;
            var new_window = window.open(jQuery(this).attr('data-href'), '_blank', 'fullscreen=no,height=600,width=800,menubar=no,resizable=yes,titlebar=no,toolbar=no,left=300,top=300', false);
            if (num_clicks_on_auth >= 2) {
                jQuery('.ads-popup-not-working').removeClass('hidden');
            }
        });

        // submit the form when someone clicks the button
        jQuery(document).on('click', '.submit-ads-form', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery('#pagefrog-ads-settings-form').submit();
        });

        // submit the form when someone clicks the choose adsense account button
        jQuery(document).on('click', '.select-google-adsense-account', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery('#pagefrog-google-adsense-account-id').val(jQuery(this).attr('data-account-id'));
            jQuery('#pagefrog-google-adsense-account-name').val(jQuery(this).attr('data-account-name'));
            jQuery('#pagefrog-ads-settings-form').submit();
        });

        // submit the form when someone clicks the choose adsense adunit button
        jQuery(document).on('click', '.select-google-adsense-adunit', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery('#pagefrog-google-adsense-adunit-name').val(jQuery(this).attr('data-adunit-name'));
            jQuery('#pagefrog-google-adsense-adunit-dimensions').val(jQuery(this).attr('data-adunit-dimensions'));
            jQuery('#pagefrog-google-adsense-adunit-id').val(jQuery(this).attr('data-adunit-id'));
            jQuery('#pagefrog-ads-settings-form').submit();
        });

        // remove all of the adsense data when the user clicks a deactivate link
        jQuery(document).on('click', '.disconnect-google-adsense-account', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery('#pagefrog-google-adsense-access-token').val('');
            jQuery('#pagefrog-google-adsense-refresh-token').val('');
            jQuery('#pagefrog-google-adsense-account-id').val('');
            jQuery('#pagefrog-google-adsense-account-name').val('');
            jQuery('#pagefrog-google-adsense-adunit-name').val('');
            jQuery('#pagefrog-google-adsense-adunit-dimensions').val('');
            jQuery('#pagefrog-google-adsense-adunit-id').val('');
            jQuery('#pagefrog-google-adsense-enable').val('false');
            jQuery('#pagefrog-ads-settings-form').submit();
        });

        // trigger the modal on page load, if we should show one (indicated by the presence of a
        // show modal class present inside of the modal div).
        if (jQuery('.show-modal').length > 0) {
            var modal = jQuery(jQuery('.show-modal')[0]).parent();
            show_modal(modal);
        }

        jQuery(document).on('click', '.show-google-adsense-adunits-modal', function (e) {
            e.stopPropagation();
            e.preventDefault();
            show_modal(jQuery('#google-adsense-adunits-modal'));
        });

        function show_modal( modal ) {
            tb_show(jQuery(modal).attr('data-title'), '#TB_inline?width=600&height=550&inlineId=' + jQuery(modal).attr('id'));
        }

        // hook up hte postmessage handler to catch auth details
        if (window.addEventListener) {
            window.addEventListener('message', receivedPostMessage, false);
        } else {
            window.attachEvent('onmessage', receivedPostMessage);
        }
    });

    function receivedPostMessage(e) {
        var parsed_data = JSON.parse(e.data);
        if (parsed_data.hasOwnProperty('source') && parsed_data.source == 'pagefrog') {
            jQuery('#pagefrog-google-adsense-access-token').val(parsed_data.auth_data.access_token);
            jQuery('#pagefrog-google-adsense-refresh-token').val(parsed_data.auth_data.refresh_token);
            jQuery('#pagefrog-ads-settings-form').submit();
        }
    }
})( jQuery );