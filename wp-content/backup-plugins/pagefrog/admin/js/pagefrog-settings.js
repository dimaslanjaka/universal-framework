(function ( $ ) {
    'use strict';

    var old_html;
    var post_type_change_list = [];
    jQuery(document).ready(function () {
        jQuery('.bulk-enable-button').click(function (e) {
            e.stopPropagation();
            e.preventDefault();
            if (jQuery(this).hasClass('disabled')) {
                // we are already processing something
                return;
            }

            jQuery('.bulk-enable-button').addClass('disabled');
            var text = "Enabling All Posts...";
            if (jQuery(this).attr('data-enable') == '0') {
                text = "Disabling All Posts...";
            }
            old_html = jQuery(this).html();
            jQuery(this).html("<img style='float:left;position:relative;top:2px;width:22px' src='" + jQuery(this).attr('data-loading-icon') + "'><span>&nbsp;" + text + "</span>");
            var checkboxes = jQuery('.published-posts-checkbox[data-platform=' + jQuery(this).attr('data-platform') + "]");
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    post_type_change_list.push(jQuery(checkboxes[i]).attr('data-post-type'));
                }
            }
            bulk_edit_post_status(this);
        });
    });

    function bulk_edit_post_status(self) {
        if (post_type_change_list.length == 0) {
            jQuery('.bulk-enable-button').removeClass('disabled');
            jQuery(self).html(old_html);
            return;
        }

        var post_type = post_type_change_list[0];
        var _this = self;
        jQuery.ajax({
            url: ajaxurl,
            method: "POST",
            data: {
                action: 'pagefrog_bulk_edit_post_status',
                platform: jQuery(self).attr('data-platform'),
                enable: jQuery(self).attr('data-enable'),
                post_type: post_type
            },
            success: function (response) {
                if (response.hasOwnProperty('status') && response.status == 'ok') {
                    jQuery('.fbia-total-' + post_type).text(response.total);
                    jQuery('.amp-total-' + post_type).text(response.total);
                    jQuery('.amp-enabled-' + post_type).text(response.amp_enabled);
                    jQuery('.fbia-enabled-' + post_type).text(response.fbia_enabled);

                    var finished = false;
                    if (jQuery(_this).attr('data-platform') == 'amp') {
                        if (jQuery(_this).attr('data-enable') == '1') {
                            if (response.total == response.amp_enabled) {
                                finished = true;
                            }
                        } else if (jQuery(_this).attr('data-enable') == '0') {
                            if (response.amp_enabled == 0) {
                                finished = true;
                            }
                        }
                    } else if (jQuery(_this).attr('data-platform') == 'fbia') {
                        if (jQuery(_this).attr('data-enable') == '1') {
                            if (response.total == response.fbia_enabled) {
                                finished = true;
                            }
                        } else if (jQuery(_this).attr('data-enable') == '0') {
                            if (response.fbia_enabled == 0) {
                                finished = true;
                            }
                        }
                    }

                    if (finished) {
                        removeArrayElement(post_type_change_list, post_type)
                    }
                    bulk_edit_post_status(_this);

                } else if (response.hasOwnProperty('status') && response.status == 'error') {
                    alert(response.message);
                } else {
                    alert("Something went wrong setting all of your posts' status. Please try again.");
                }
            },
            error: function (xhr, error) {
                console.log(xhr.statusCode());
                alert("Something went wrong! Please contact team@pagefrog.com to let us know! Also please include the following information:\n\nHTTP Status Code: " + JSON.stringify(xhr.statusCode()));
            }
        });
    }

    function removeArrayElement(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    jQuery(document).on('change', '.select-all', function (e) {
        e.stopPropagation();
        e.preventDefault();
        jQuery('input[type=checkbox][data-platform=' + jQuery(this).attr('data-platform') + ']').attr('checked', jQuery(this)[0].checked);
    });


    jQuery(document).on('click', '.submit-ads-form', function (e) {
        e.stopPropagation();
        e.preventDefault();
        jQuery('#pagefrog-ads-settings-form').submit();
    });

    jQuery(document).on('click', '.submit-new-posts-form', function (e) {
        e.stopPropagation();
        e.preventDefault();
        jQuery('#pagefrog-new-posts-settings-form').submit();
    });

})( jQuery );