(function ( $ ) {
    'use strict';

    jQuery(document).on('ready', function () {
        jQuery('#pagefrog-contact-form').on('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            jQuery.ajax({
                url: ajaxurl,
                method: "POST",
                data: {
                    action: 'pagefrog_contact_form_submission',
                    name: jQuery('#pagefrog-contact-form-name').val(),
                    email: jQuery('#pagefrog-contact-form-email').val(),
                    comment: jQuery('#pagefrog-contact-form-comment').val()
                },
                success: function (response) {
                    if (response.hasOwnProperty('status') && response.status == 'ok' && response.hasOwnProperty('return') && response.return == true) {
                        jQuery('#pagefrog-contact-form').addClass('hidden');
                        jQuery('#pagefrog-comment-error').addClass('hidden');
                        jQuery('#pagefrog-comment-submitted').removeClass('hidden');
                    } else if (response.hasOwnProperty('status') && response.status == 'error' && response.hasOwnProperty('reason')) {
                        jQuery('#pagefrog-comment-error p').text(response.reason);
                        jQuery('#pagefrog-comment-error').removeClass('hidden');
                    } else {
                        jQuery('#pagefrog-comment-error p').text('Uh-oh! Something went wrong, please make sure all of the fields below were correctly filled out. If you are still experiencing issues, please send an email to pagefrog@gmail.com');
                        jQuery('#pagefrog-comment-error').removeClass('hidden');
                    }
                },
                error: function () {
                    jQuery('#pagefrog-comment-error p').text('Uh-oh! Something went wrong, please try again in a few minutes. If you are still experiencing issues, please send an email to pagefrog@gmail.com');
                    jQuery('#pagefrog-comment-error').removeClass('hidden');
                }
            });
        });
    });
})( jQuery );