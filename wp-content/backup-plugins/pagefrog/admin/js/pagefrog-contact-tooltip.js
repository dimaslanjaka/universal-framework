(function ( $ ) {
    'use strict';

    jQuery(document).ready(function() {
        // initialize the pointer
        var pointer = jQuery('#toplevel_page_PageFrog-setup').pointer({
            content: "\
        <h3 id='pagefrog-submit-contact-details-header'>Welcome to PageFrog!</h3>\
        <div class='padding-container'>\
            <div class='row'>\
                <div class='col-sm-12'>\
                    <p>This plugin allows you to easily publish and manage your content for Facebook Instant Articles (FBIA) and Google Accelerated Mobile Pages (AMP).</p>\
                    <p>Our team provides 24/7 support, so please enter in your email and website so that we can provide assistance when needed.</p>\
                </div>\
            </div>\
            <div class='row'>\
                <div class='col-sm-12'>\
                    <form id='pagefrog-submit-contact-details-form' method='post'>\
                        <div class='form-group'>\
                            <label for='submit-contact-details-email'>Enter your email</label>\
                            <input class='form-control' id='submit-contact-details-email' name='email' type='email' placeholder='clark.kent@gmail.com'>\
                        </div>\
                        <div class='form-group'>\
                            <label for='submit-contact-details-site'>Enter your website URL</label>\
                            <input class='form-control' id='submit-contact-details-site' name='name' placeholder='Clark Kent'>\
                        </div>\
                        <div class='form-group margin-top'>\
                            <input type='submit' value='Submit' class='button' id='submit-contact-details-form-submit'>\
                            <a href='#' class='button close' id='submit-contact-details-form-dismiss'>Dismiss</a>\
                        </div>\
                    </form>\
                </div>\
            </div>\
        </div>\
            ",
            position: 'left',
            close: function (e) {
                
            },
            open: function () {
                if (jQuery('#pagefrog-submit-contact-details-hidden-email')) {
                    jQuery('#submit-contact-details-email').val(jQuery('#pagefrog-submit-contact-details-hidden-email').val()); 
                }
                if (jQuery('#pagefrog-submit-contact-details-hidden-site')) {
                    jQuery('#submit-contact-details-site').val(jQuery('#pagefrog-submit-contact-details-hidden-site').val());
                }
            }
        }).pointer('open');
        
        // hide the ugly dismiss button
        var dismiss_button = jQuery('#pagefrog-submit-contact-details-header').parent().find('.wp-pointer-buttons');
        dismiss_button.addClass('hidden');

        // hook up our own dismiss button
        jQuery(document).on('click', '#submit-contact-details-form-dismiss', function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery('#toplevel_page_PageFrog-setup').pointer('close');
        });
        
        // hook up the form submission
        jQuery('#pagefrog-submit-contact-details-form').submit(function (e) {
            e.stopPropagation();
            e.preventDefault();
            jQuery.ajax({
                url: ajaxurl,
                method: 'POST',
                data: {
                    action: 'pagefrog_signup_to_drip',
                    site: jQuery('#submit-contact-details-site').val(),
                    email: jQuery('#submit-contact-details-email').val(),
                },
                success: function (response) {
                    if (response.hasOwnProperty('status') && response.status == 'ok') {
                        jQuery('#toplevel_page_PageFrog-setup').pointer('close');
                    } else if (response.hasOwnProperty('status') && response.status == 'error') {
                        if (response.hasOwnProperty('reason')) {
                            alert(response.reason);
                        } else {
                            alert('Something went wrong! Please check your site URL and email and try again.');
                        }
                    } else {
                        alert('Something slipped through the cracks! Please check your URL and email and try again.');
                    }
                },
                error: function () {
                    alert('Something went wrong. Please check the values that you provided, then try again.');
                }
            });
        });
    });
})( jQuery );
