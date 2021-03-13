<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=285339728303925";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div>
    <img src="<?php echo plugin_dir_url(__FILE__) . 'images/logo_color.png'; ?>" alt="" id="pagefrog-big-logo">
    <p>PageFrog allows content publishers to instantly optimize their content for Facebook Instant Articles, Google <br> AMP, and Apple News.</p>
</div>
<div id="pagefrog-settings-container">
    <div class="row">
        <div class="col-sm-12" id="pagefrog-settings-box">
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
            </div>
            <div class="row">
                <div class="col-sm-6 margin-top-bottom">
                    <h1 class="text-center">Contact us</h1>
                    <h3 class="text-center">What can we help you with?</h3>

                    <div class="alert green hidden" id="pagefrog-comment-submitted">
                        <p>Thank you! Your comment has been sent and a member of the PageFrog team will reach out with a reply shortly!</p>
                    </div>
                    <div class="alert red hidden" id="pagefrog-comment-error">
                        <p>Uh-oh! Please make sure all of the fields below were correctly filled in.</p>
                    </div>
                    <form action="" id="pagefrog-contact-form">
                        <div class="form-group margin-top-bottom">
                            <label for="pagefrog-contact-form-name"><strong>Your Name </strong><span class="required">(required)</span></label>
                            <input id="pagefrog-contact-form-name" name="name" type="text" class="form-control" value="<?php global $current_user; get_currentuserinfo(); if ( $current_user->display_name ) { echo $current_user->display_name; } ?>" placeholder="Clark Kent">
                        </div>
                        <div class="form-group margin-top-bottom">
                            <label for="pagefrog-contact-form-email"><strong>Email </strong><span class="required">(required)</span></label>
                            <input id="pagefrog-contact-form-email" name="email" type="text" class="form-control" value="<?php global $current_user; if ( $current_user->user_email ) { echo $current_user->user_email; } ?>" placeholder="clark@superman.com">
                        </div>
                        <div class="form-group margin-top-bottom">
                            <label for="pagefrog-contact-form-comment"><strong>Comment </strong><span class="required">(required)</span></label>
                            <textarea name="comment" id="pagefrog-contact-form-comment" rows="8" class="form-control"></textarea>
                        </div>
                        <div class="form-group margin-top-bottom">
                            <input type="submit" class="button block button-lg" value="Submit">
                        </div>
                    </form>    
                    <br/><br/>
                    <hr>
                    <br/>
                    
                    <div class="col-sm-6">
                        <a class="button block green secondary" href="https://wordpress.org/support/plugin/pagefrog#plugin-description" target="blank"><span class="dashicons dashicons-admin-comments" style="font-size: 16px;line-height: 1.8;"></span>&nbsp;Support Forum</a>
                    </div>
                    <div class="col-sm-3"></div>
                    <a href="https://twitter.com/PageFrog" class="twitter-follow-button" data-show-count="false" data-size="large" data-dnt="true">Follow @PageFrog</a>
                    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div class="fb-like" data-href="https://www.facebook.com/pagefrog" data-layout="button" data-action="like" label="like" data-show-faces="false" data-share="false">
                    </div>
                </div>
                <div class="col-sm-1"></div>
                <div class="col-sm-4 margin-top-bottom">

                    <h1 class="text-center">Support us</h1>
                    <h3 class="text-center">Words from the developers</h3>
                    <div class="col-sm-12 margin-top-bottom">
                        <p>Our goal is to give all publishers free access to powerful tools for getting content onto Facebook Instant Articles, Google Accelerated Mobile Pages, Apple News, and more.</p>

                        <p>It's hard work building open source plugins and releasing them free of charge, but we are committed to releasing frequent updates while providing 24/7 support to the best of our abilities.</p>

                        <p>If you appreciate our work and see value in our plugin, please consider supporting our team with a good review, or perhaps even a donation!</p>

                        <p><i>Sincerely,<br/>
                        Chris, Mike, Nigel, Sophia</i></p>
                    </div>
                    <div class="col-sm-6">
                        <a class="button yellow block secondary" href="https://wordpress.org/support/view/plugin-reviews/pagefrog?filter=5#postform" target="blank"><span class="dashicons dashicons-star-filled" style="font-size: 16px;line-height: 1.5;"></span>&nbsp;Write a Review</a>
                    </div>    
                    <div class="col-sm-6">
                        <a class="button pink block secondary" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=V88AHXYQWWY6Q" target="blank"><span class="dashicons dashicons-heart" style="font-size: 16px;line-height: 1.8;"></span>&nbsp;Donate</a>
                    </div>
                </div>    
            </div>
            <div class="row">
                <div class="col-sm-12 margin-top-bottom">&nbsp;</div>
            </div>
        </div>
    </div>
</div>