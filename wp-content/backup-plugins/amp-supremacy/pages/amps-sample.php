<?php
$amps_settings_array = get_option('amps');
?>
<!DOCTYPE html>
<html class="no-js" amp lang="en-US">
    <head>
        <meta charset="utf-8">
        <title>Sample Post</title>
        <meta name="description" content="">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
                    <meta name="theme-color" content="">
                <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, minimal-ui">

        <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <link rel='canonical' href="<?php echo get_site_url(); ?>/?plugin_trigger=amps_sample">  
        <!-- AMP Boilerplate -->
        <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

        <!-- Custom Design Changes -->
        <style amp-custom>

            html{font:400 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background:#fff;color:#666;background-image:-webkit-radial-gradient(100% 100%,center,#fff,#fff);background-image:radial-gradient(100% 100% at center,#fff,#fff)}.uk-article:after,.uk-container:after,.uk-grid:after{clear:both}.uk-nav-offcanvas .uk-nav-header,.uk-nav-offcanvas>li>a{border-top:1px solid rgba(0,0,0,.3);text-shadow:0 1px 0 rgba(0,0,0,.5)}.uk-container{box-sizing:border-box;max-width:980px;padding:0 25px}@media (min-width:1220px){.uk-container{max-width:1200px;padding:0 35px}}.uk-container:after,.uk-container:before{content:"";display:table}.uk-container-center{margin-left:auto;margin-right:auto}.uk-article>:last-child,.uk-grid>*>:last-child{margin-bottom:0}.uk-grid{display:-ms-flexbox;display:-webkit-flex;display:flex;-ms-flex-wrap:wrap;-webkit-flex-wrap:wrap;flex-wrap:wrap;margin:0;padding:0;list-style:none}.uk-grid:after,.uk-grid:before{content:"";display:block;overflow:hidden}.uk-grid>*{-ms-flex:none;-webkit-flex:none;flex:none;margin:0;float:left;padding-left:14px}.uk-grid{margin-left:-25px}.uk-grid+.uk-grid,.uk-grid-margin,.uk-grid>*>.uk-panel+.uk-panel{margin-top:25px}@media (min-width:1220px){.uk-grid{margin-left:-35px}.uk-grid+.uk-grid,.uk-grid-margin,.uk-grid>*>.uk-panel+.uk-panel{margin-top:35px}}@media (min-width:200px){.uk-grid-divider>[class*=uk-width-medium-]:not(.uk-width-medium-1-1):nth-child(n+2){border-left:1px solid #e5e5e5}.uk-width-medium-1-1{width:100%}}.uk-article:after,.uk-article:before{content:"";display:table}.uk-article+.uk-article{margin-top:50px}.uk-article-title{font-size:36px;line-height:42px;font-weight:300;text-transform:none}.uk-article-meta,.uk-nav li>a>div{font-size:12px;line-height:18px}.uk-article-title a{color:inherit;text-decoration:none}.uk-article-meta{color:#999}.uk-offcanvas-bar{position:fixed;top:0;bottom:0;left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%);z-index:1001;width:270px;max-width:100%;background:#333;overflow-y:auto;-webkit-overflow-scrolling:touch;-webkit-transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;-ms-scroll-chaining:none}.uk-offcanvas-bar-flip:after,.uk-offcanvas-bar:after{width:1px;background:rgba(0,0,0,.6);box-shadow:0 0 5px 2px rgba(0,0,0,.6)}.uk-offcanvas.uk-active .uk-offcanvas-bar.uk-offcanvas-bar-show{-webkit-transform:translateX(0);transform:translateX(0)}.uk-offcanvas-bar-flip{left:auto;right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}.uk-offcanvas .uk-panel{margin:20px 15px;color:#777;text-shadow:0 1px 0 rgba(0,0,0,.5)}.uk-offcanvas .uk-panel a:not([class]),.uk-offcanvas .uk-panel-title{color:#ccc}.uk-offcanvas .uk-panel a:not([class]):hover{color:#fff}.uk-offcanvas-bar:after{content:"";display:block;position:absolute;top:0;bottom:0;right:0}.uk-offcanvas-bar-flip:after{right:auto;left:0}.uk-nav,.uk-nav ul{margin:0;padding:0;list-style:none}.uk-nav li>a{display:block;text-decoration:none}.uk-nav>li>a{padding:3px 15px}.uk-nav ul{padding-left:15px}.uk-nav ul a{padding:2px 0}.uk-nav-offcanvas>li>a{color:#ccc;padding:10px 15px;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}.uk-nav-offcanvas>.uk-open>a,html:not(.uk-touch) .uk-nav-offcanvas>li>a:focus,html:not(.uk-touch) .uk-nav-offcanvas>li>a:hover{background:#404040;color:#fff;outline:0}html .uk-nav.uk-nav-offcanvas>li.uk-active>a{background:#1a1a1a;color:#fff;box-shadow:inset 0 1px 3px rgba(0,0,0,.3)}.uk-nav-offcanvas .uk-nav-header{color:#777;margin-top:0;background:#404040;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}.uk-nav-offcanvas .uk-nav-divider{border-top:1px solid rgba(255,255,255,.01);margin:0;height:4px;background:rgba(0,0,0,.2);box-shadow:inset 0 1px 3px rgba(0,0,0,.3)}.uk-nav-offcanvas ul a{color:#ccc}html:not(.uk-touch) .uk-nav-offcanvas ul a:hover{color:#fff}.uk-nav-offcanvas{border-bottom:1px solid rgba(0,0,0,.3);box-shadow:0 1px 0 rgba(255,255,255,.05)}.uk-nav-offcanvas .uk-nav-sub{border-top:1px solid rgba(0,0,0,.3);box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}.uk-nav-side>li.uk-active>a{background:#009dd8;color:#fff;box-shadow:inset 0 2px 4px rgba(0,0,0,.2);text-shadow:0 -1px 0 rgba(0,0,0,.2)}
            @font-face{font-family:'Droid Sans';font-style:normal;font-weight:400;src:local('Droid Sans'),local('DroidSans'),url(https://fonts.gstatic.com/s/droidsans/v6/s-BiyweUPV0v-yRb-cjciPk_vArhqVIZ0nv9q090hN8.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}@font-face{font-family:Pacifico;font-style:normal;font-weight:400;src:local('Pacifico Regular'),local('Pacifico-Regular'),url(https://fonts.gstatic.com/s/pacifico/v7/Q_Z9mv4hySLTMoMjnk_rCfesZW2xOQ-xsNqO47m55DA.woff2) format('woff2');unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2212,U+2215,U+E0FF,U+EFFD,U+F000}input[type=checkbox]:checked:before{margin:1px 0 0}input[type=checkbox]{width:15px;height:15px}.uk-grid *{font-family:'Droid Sans',sans-serif}small.hand{font-family:Pacifico,cursive;color:#98AC29}small.text-desc{font-size:12px;font-style:italic;font-weight:400}nav.navbar.amp{height:auto;box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);}.amp-container,.amp-site-name{max-width:840px}.amp-site-name{margin-left:auto;margin-right:auto;padding:15px 35px 15px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;font-size:20px;font-weight:700;color:#fff;padding-left: 15px;}.uk-article-title{font-size:28px;font-weight:700;margin:25px 25px 15px 0;font: 300 27px/34px;}.uk-article-content{font-size:16px;font-weight:400;word-spacing:1px;margin-right: 25px;}p.uk-article-meta{font-size:15px;margin-bottom:25px; line-height:25px;margin-right: 25px;}img.alignleft{float:left}img.alignright{float:right}img.aligncenter{clear:both;display:block;margin:0 auto 28px}body:not(.custom-background-image):after,body:not(.custom-background-image):before{height:0}.uk-article{margin-bottom:35px; text-align: justify;}input#mobile-test-url{width:270px}.avatar-16{margin:0 5px;border-radius:5px}.sp-replacer {height: 15px;border-radius: 5px;}.sp-preview-inner,.sp-preview {height: 12px ;}
            .uk-grid{margin-left:0;padding-bottom:15px;background-color:#fff;width:100%;margin:auto;box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);}
            body{background-color: #F5F5F5; }h3{font:400 20px/32px;} h1{font:400 24px/36px;}@media only screen and (max-width: 800px){.uk-container{ padding: 0px; }} amp-iframe{margin: 10px 0;}
            amp-sidebar {width: 250px;padding-right: 10px;} .amp-close-image {top: 15px;left: 225px;cursor: pointer;} li {margin-bottom: 10px;} button {margin-left: 20px;} .amp-logo-image{margin-left: 10px;}.menu-icon{cursor:pointer;}
            .amp-site-footer {padding: 20px;} a.menu-item {text-decoration: none; color: #4BA0CC; font-weight:bold;}table{border: 1px solid #cccccc; margin-bottom: 10px; width: 100%;border-collapse: collapse;}td, th{border: 1px solid #cccccc; padding: 15px;} .img-in-text-sm{margin: 0px 33.33%;} .img-in-text-lg{float: left;width: 100%;margin: 10px 0px;}.img-div{width: 100%; float:left;margin-left:25%;} .seperator{border: 2px solid #a7cdf0; width: 95%; box-shadow: 2px 2px 4px #ccc;} .margin-right-5{margin-right:5px;}.img-div > a{float:left;}.uk-article-content, .uk-article-content a{color: #000000;}.amp-related-posts{background-color:#EEE;padding:0 15px 20px;border-radius:5px;border:1px solid #ccc}.amp-related-posts h3{margin-bottom:10px}.amp-related-posts ul li{margin-bottom:5px; list-style: none;}.amp-related-posts ul{padding:0}amp-sidebar li{list-style: none;}
            #beginPageLink{float:right; text-decoration: underline;}.original-page{margin: 15px 0 -15px 0}
            @media screen and (max-width:320px){ .img-div {margin-left: 0} .uk-article-title, .uk-grid h1{font-size: 20px;} .uk-article-content, .uk-article-meta{font-size: 14px;} }
                <?php if (isset($amps_settings_array['color_header'])) { ?>
                .navbar.amp {
                    background: <?php echo $amps_settings_array['color_header']; ?> ;
                }
            <?php } ?>

            <?php if (isset($amps_settings_array['color_header_text'])) { ?>
                .amp-site-name a, .amp-site-footer, .amp-site-footer a {
                    color: <?php echo $amps_settings_array['color_header_text']; ?> ;
                    text-decoration: none ;
                }
            <?php } ?>

            <?php if (isset($amps_settings_array['color_article_title'])) { ?>
                .uk-article-title a {
                    color: <?php echo $amps_settings_array['color_article_title']; ?> ;
                }
            <?php } ?>

            <?php if (isset($amps_settings_array['color_article_text'])) { ?>
                .uk-article-content, .uk-article-content *{
                    color: <?php echo $amps_settings_array['color_article_text']; ?> ;
                }
            <?php } ?>
        </style>
    </head>
    <body>
    <amp-sidebar id='sidebar'
                 layout="nodisplay"
                 side="right">
        <amp-img class='amp-close-image'
                 src="<?php echo get_site_url(); ?>/wp-content/plugins/amp-supremacy/assets/img/close-menu.png"
                 width="20"
                 height="20"
                 alt="close sidebar"
                 on="tap:sidebar.close"
                 role="button"
                 tabindex="0"></amp-img>

        <ul id="menu-short" class=""> <li id="menu-item-1629" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-1629"><a href="http://wpthemetestdata.wordpress.com/amp/" class=" menu-item">- Home</a></li> <li id="menu-item-1630" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1630"><a href="<?php echo get_site_url(); ?>/blog/amp" class=" menu-item">- Blog</a></li> <li id="menu-item-1631" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-1631"><a href="<?php echo get_site_url(); ?>/about/amp" class=" menu-item">- About The Tests</a> <ul class="sub-menu"> <li id="menu-item-1632" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1632"><a href="<?php echo get_site_url(); ?>/about/clearing-floats/amp" class=" menu-item">- Clearing Floats</a></li> <li id="menu-item-1633" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1633"><a href="<?php echo get_site_url(); ?>/about/page-with-comments/amp" class=" menu-item">- Page with comments</a></li> <li id="menu-item-1634" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1634"><a href="<?php echo get_site_url(); ?>/about/page-with-comments-disabled/amp" class=" menu-item">- Page with comments disabled</a></li> </ul> </li> <li id="menu-item-1635" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-1635"><a href="<?php echo get_site_url(); ?>/amp" class=" menu-item">- Lorem Ipsum</a></li> </ul>         </amp-sidebar>

    <!-- Content -->
    <div class="uk-container uk-container-center uk-margin-top uk-margin-large-bottom amp-container" id="beginPage">
        <!-- Header -->
        <nav class="navbar amp 1.2.13">

            <div class="amp-site-name">
                <a on='tap:sidebar.toggle' class="menu-icon"><amp-img src="<?php echo get_site_url(); ?>/wp-content/plugins/amp-supremacy/assets/img/menu-icon.png" height="30" width="30"></amp-img></a>
                <!-- <a class="amp-logo-heading" href="<?php echo get_site_url(); ?>/amp/">                            Test Website</a> -->
                <a class="amp-logo-heading" href="<?php echo get_site_url(); ?>/amp/">
                    <?php if (isset($amps_settings_array['logo_image']) && !empty($amps_settings_array['logo_image'])) { ?>
                        <amp-img src="<?php echo $amps_settings_array['logo_image']; ?>" alt="Logo" height="<?php echo!empty($amps_settings_array['logo_image_height']) ? $amps_settings_array['logo_image_height'] : 20; ?>" width="<?php echo!empty($amps_settings_array['logo_image_width']) ? $amps_settings_array['logo_image_width'] : 25; ?>" class="amp-logo-image"></amp-img>
                    <?php } ?>
                        <?php //if(empty($amps_settings_array['sitename_hide'])) echo get_bloginfo("name"); ?>Test
                </a>
            </div>
        </nav>
        <div class="uk-grid" data-uk-grid-margin>
            <!--<p class="original-page"><a href="#">Visit Original Page</a></p>-->
            <div class="uk-width-medium-1-1">


                <article class="uk-article">

                    <h1 class="uk-article-title">
                        <a href="<?php echo get_site_url(); ?>/sample-post/amp/">Sample Post</a>
                    </h1>

                    <p class="uk-article-meta">
                        <?php if (!empty($amps_settings_array['on_author_name'])) { ?>
                            Author: &nbsp;<amp-img src="http://0.gravatar.com/avatar/03379b3c4df0784aa31004f82f7b2129?s=96&d=mm&r=g" height="16" width="16" class='margin-right-5'></amp-img>&nbsp;John Doe
                    <?php }

                    if (!empty($amps_settings_array['on_post_date'])) {
                        ?>
                        on <?php echo date('d F Y', time()); ?>&nbsp;
                    <?php }

                    if (!empty($amps_settings_array['on_post_categories'])) {
                        ?>
                        <amp-img src="<?php echo get_site_url(); ?>/wp-content/plugins/amp-supremacy/assets/img/category-icon.png" width="16" height="16" title="Categories"></amp-img> <a href="javscript:void(0);">category1,</a>&nbsp;<a href="javscript:void(0);">category2</a>
                    <?php }

                    if (!empty($amps_settings_array['on_post_tags'])) {
                        ?>
                        <amp-img src="<?php echo get_site_url(); ?>/wp-content/plugins/amp-supremacy/assets/img/tags-icon.png" width="16" height="16" title="Tags"></amp-img> <a href="javscript:void(0);">Tag1,</a>&nbsp;<a href="javscript:void(0);">Tag2</a
<?php } ?>
                    </p>
                    <div class="uk-article-content">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </article>
            </div>
        </div>

        <nav class="navbar amp 1.2.13 footer">
            <div class="amp-site-footer">
                <a class="amp-logo-heading" href="<?php echo get_site_url(); ?>">
                    Test Website | We view it                    </a>
<?php if (!empty($amps_settings_array['footer-extra-content'])) { ?>
                    <br/><span class="amp-logo-heading"><?php echo preg_replace('/\\\\/', '', $amps_settings_array['footer-extra-content']); ?></span>
<?php } ?>
                <a href="#beginPage" id="beginPageLink">Scroll to Top</a>
            </div>
        </nav>
    </div>
</body>
</html>
