(function( $ ) {
    'use strict';

    jQuery(document).on('after-autosave', function () {
        update_preview();
    });

    jQuery(document).on('click', '.preview.button', function () {
        window.setTimeout(update_preview, 500);
    });

    jQuery(document).on('change', '#pagefrog-preview-format .pagefrog-preview-format-select', function () {
        update_preview();
    });

    jQuery(document).on('ready', function () {
        update_preview();
    });

    jQuery(document).on('change', '#pagefrog-preview-format .pagefrog-preview-post-id', function () {
        update_preview();
    });

    function update_preview() {
        clear_mobile_preview_link();

        jQuery.ajax({
            url: ajaxurl,
            method: 'GET',
            data: {
                action: 'pagefrog_get_preview',
                format: jQuery('#pagefrog-preview-format .pagefrog-preview-format-select').val(),
                post_id: jQuery('#pagefrog-preview-format .pagefrog-preview-post-id').val()
            },
            success: function (response) {
                if (typeof response == 'object' && response.hasOwnProperty('preview_url') && response.hasOwnProperty('fbia_status') && response.hasOwnProperty('amp_status')) {   
                    jQuery('.pagefrog-preview-container iframe').attr('src', response.preview_url);
                    jQuery('#pagefrog-fbia-status')[0].checked = response.fbia_status;
                    jQuery('#pagefrog-amp-status')[0].checked = response.amp_status;
                    set_mobile_preview_link(response.preview_url);
                }
                resize_preview_iframe();
            }
        });

        resize_preview_iframe();
        jQuery('.pagefrog-rules').addClass('hidden');
        jQuery('.arrow-toggle').text('\u25BC');
    }

    function resize_preview_iframe() {
        // TODO: move this into an init/resize handler
        // TODO: hide the scrollbar?
        var iphone_width = 375.0;
        var scale_factor = jQuery('.pagefrog-preview-container').width() / iphone_width;
        jQuery('.pagefrog-preview-container iframe').css({
            transform: 'scale(' + scale_factor.toString() + ', ' + scale_factor.toString() + ')',
            width: (100.0 / scale_factor).toString() + '%',
            height: (100.0 / scale_factor).toString() + '%'
        });
    }

    jQuery(document).on('click', '.pagefrog-status-toggle', function () {
        jQuery.ajax({
            url: ajaxurl,
            method: 'POST',
            data: {
                action: 'pagefrog_set_post_status',
                post_id: jQuery('#pagefrog-preview-format .pagefrog-preview-post-id').val(),
                fbia_status: jQuery('#pagefrog-fbia-status')[0].checked,
                amp_status: jQuery('#pagefrog-amp-status')[0].checked,
            },
            success: function (response) {
                if (typeof response == 'object' && response.hasOwnProperty('fbia_status') && response.hasOwnProperty('amp_status') && response.hasOwnProperty('amp_capable')) {
                    jQuery('#pagefrog-fbia-status')[0].checked = response.fbia_status;
                    jQuery('#pagefrog-amp-status')[0].checked = response.amp_status;

                    // any items that need to be toggled externally, must work using these selectors
                    var indicators = jQuery(".pagefrog-status-circle[data-post-id=" + jQuery('#pagefrog-preview-format .pagefrog-preview-post-id').val() + '] .pagefrog-status-circle-inner');
                    var color_options = ['red', 'yellow', 'grey', 'green'];
                    var fill_options = ['empty', 'half', 'full'];
                    var color = '';
                    var fill = '';

                    if (response.amp_capable) {
                        if (response.fbia_status) {
                            color = 'green';
                            if (response.amp_status) {
                                fill = 'full';
                            } else {
                                fill = 'half';
                            }
                        } else {
                            if (response.amp_status) {
                                fill = 'half';
                                color = 'green';
                            } else {
                                fill = 'empty';
                                color = 'grey';
                            }
                        }
                    } else {
                        color = 'yellow';
                        fill = 'full';
                    }

                    indicators.removeClass(color_options.join(' ')).removeClass(fill_options.join(' ')).addClass(color).addClass(fill);
                }
            }
        });
    });

    jQuery(document).on('click', '#pagefrog-unsupported-button', function (e) {
        e.stopPropagation();
        e.preventDefault();
        jQuery('.pagefrog-' + jQuery('#pagefrog-preview-format .pagefrog-preview-format-select').val() + '-rules').toggleClass('hidden');
        if (jQuery('.pagefrog-rules').length > jQuery('.pagefrog-rules.hidden').length) {
            jQuery('.arrow-toggle').text('\u25B2');
        } else {
            jQuery('.arrow-toggle').text('\u25BC');
        }
    });

    // show tooltips
    jQuery(document).tooltip({
        items: "[pagefrog-title]",
        content: function () {
            return jQuery(this).attr('pagefrog-title');
        }
    });

    // mobile preview links
    function clear_mobile_preview_link() {
        jQuery("#mobile_preview_link").val('');
    }

    function set_mobile_preview_link(preview_url) {
        jQuery.ajax({
            url: '//pagefrog.com/get_tinyurl_redirect_link/?url=' + encodeURIComponent(preview_url),
            method: 'GET',
            success: function (response) {
                jQuery("#mobile_preview_link").val(response.replace('http://', ''));
            }
        });
    }


})( jQuery );



