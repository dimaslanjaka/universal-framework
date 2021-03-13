(function ( $ ) {
    'use strict';

    jQuery(document).ready(function () {

        // ACTIVATE THE AMP PLUGIN
        jQuery('#activate-amp-button').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery.ajax({
                url: jQuery(this).attr('data-href'),
                success: function (r, status, request) {
                    if (r.indexOf('<div id="message" class="updated notice is-dismissible"><p>Plugin <strong>activated</strong>.</p></div>') > 0) {
                        jQuery('#activate-amp-button').parent().addClass('hidden');
                        jQuery('#pagefrog-amp-ready').removeClass('hidden');
                    } else {
                        window.location = jQuery('#activate-amp-button').attr('data-href');
                    }
                }
            });
        });

        jQuery('#facebook-walkthrough-button').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            tb_show('Setting up Facebook Instant Articles', '#TB_inline?inlineId=facebook-walkthrough-modal&width=800&height=670');
            jQuery('#TB_window').css({
                width:800
            });
        });

        jQuery('#amp-walkthrough-button').click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            tb_show('Setting up AMP', '#TB_inline?inlineId=amp-walkthrough-modal&width=800&height=670');
            jQuery('#TB_window').css({
                width:800
            });
        });

        var swf_location = jQuery('#copy-feed-button').attr('data-swf-location');
        ZeroClipboard.config({
            swfPath: swf_location,
            moviePath: swf_location
        });
        var zero_clipboard = new ZeroClipboard(document.getElementById('copy-feed-button'));
        zero_clipboard.on('complete', function (event) {
            $('.text-shadow').removeClass('hidden');
            window.setTimeout(function () {
                $('.text-shadow').addClass('animate-up');
                window.setTimeout(function () {
                    $('.text-shadow').removeClass('animate-up').addClass('hidden');
                }, 550);
            }, 20);
        });
    });
})( jQuery );