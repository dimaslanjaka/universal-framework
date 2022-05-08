<?php $styles = new PageFrog_Styling_Storage();?>

<!doctype html>
<html lang="en" prefix="op: http://media.facebook.com/op#">
<head>
  <meta charset="utf-8">
  <link rel="canonical" href="<?php the_permalink(); ?>">
  <meta property="op:markup_version" content="v1.0">

    <!-- Stylesheets -->
    <link href="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/templates/Limitless/real_assets/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/templates/Limitless/real_assets/css/core.min.css" rel="stylesheet" type="text/css">
    <link href="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/templates/Limitless/real_assets/css/components.min.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <!-- End Stylesheets -->

    <style>
        /* overflow */
        html {
            overflow-x: hidden; // to prevent horizontal scrollbar in preview
        }

        /* top bar */
        #top-bar {
            position: fixed;
            color: #bfbebe;
            font-weight: 500;
            padding: 0px 7px;
            width: 100%;
            font-size: 10px;
            background-color: #000;
            height: 18px;
            z-index: 99999; /* top! */
        }
        #top-bar span:nth-of-type(1) { /* left arrow */
            float: left;
            font-size: 18px;
            margin-top: -8px;
        }
        #top-bar span:nth-of-type(2) { /* SHARE */
            float: right;
            padding-right: 0px;
            padding-top: 0px;
            font-size: 12px;
        }

        /* title bar */
        #title-bar.solid {
            background-color: <?php echo $styles->get_id_bar_color(); ?>;
            margin-left: -20px;
            margin-right: -20px;
            margin-top: -5px;
        }
        #title-bar.line {
            background-color: transparent;
            margin-left: -20px;
            margin-right: -20px;
            margin-top: -5px;
        }
        #title-bar img {
            height: 22px;
            width: auto;
            margin-top: 15px;
            margin-bottom: 15px;
            margin-left: 20px;
        }
        #title-bar-like { /* LIKE */
            float: right;
            padding-right: 20px;
            padding-top: 20px;
            font-size: 9px;
            opacity: 0.7;
        }
        #title-bar.line #title-bar-like {
            color: #ccc;
        }
        #title-bar.solid #title-bar-like {
            color: <?php if ($styles->get_id_bar_color() == '#ffffff') echo '#cccccc'; else echo '#ffffff'; ?>;
        }
        #title-bar.solid > hr {
            display: none;
        }
        #title-bar.line > hr {
            margin: 0;
            margin-left: 18px;
            margin-right: 18px;
            border-top-color: <?php echo $styles->get_id_bar_color(); ?>;
        }

        /* title text */
        header h1 {
            font-size: 34px;
            letter-spacing: 1.5;
            font-weight: 500;
            line-height: 1.2;
            letter-spacing: 0px;
            margin-top: 13px;
            margin-bottom: 16px;

            font-family: <?php echo $styles->get_title_font_family(); ?>;
            color: <?php echo $styles->get_title_font_color(); ?>;
        }

        /* header */
        header {
            margin-bottom: 10px;
        }

        /* featured image */
        header figure {
            margin-top: 0;
            margin-bottom: 0;
        }
        header figure figcaption {
            display: none; //todo - should it appear?
        }

        /* author(s) */
        address {
            text-transform: uppercase;
            font-style: normal;
            margin-bottom: -4px;
        }
        address a {
            text-decoration: none;
            color: inherit;
            line-height: inherit;
        }
        address, time {
            font-size: 9px;
            line-height: 0px;
            margin-left: -2px;
        }

        /* publication date */
        .op-published {
            display: none;  /* don't show - show update date instead */
        }

        /* modification date */
        .op-modified {
            text-transform: uppercase;
        }

        /* share button */
        .btn-share {
            color: #7f7f7f;
            background-color: white;
            border: 1px solid #7f7f7f;
            border-radius: 0px;
            margin-top: 30px;
            margin-bottom: 30px;
        }

        /* related articles */
        .footer-bg {
            background-color: #f7f9f9;
            margin-left: -20px;
            margin-right: -20px;
            padding: 20px;
            padding-top: 5px;
        }
        .footer-img {
            float:left;
            width:150px;
            margin-left:-20px;
            margin-right:20px;
        }
        .hr-related {
            margin-left: -20px;
            margin-top: 35px;
        }
        .p-related {
            font-weight: 600;
            margin-bottom: -10px;
            margin-top: 20px;
            font-size: 13px;
        }
        .a-related {
            text-decoration: none;
        }
        .op-related-articles li {
            list-style-type: none;
        }

        /* ELEMENT SPACING */
        body {
            font-family: sans-serif;
            font-size: 16px;
            line-height: 1.8;
            background: #fff;
            color: #3d596d;
            padding-bottom: 100px;
        }
        article {
            max-width: 600px;
            margin: 0 auto;
            padding-top: 0px; /* set to 18px to enable facebook top share bar */
        }
        figure {
            margin-top: 18px;
            margin-bottom: 33px;
            margin-left: -20px;
            margin-right: -20px;
        }
        .op-social, .op-interactive {
            margin-left: 0px;
            margin-right: 0px;
            max-width: 100%;
            width: 100%;
            height: auto;
        }
        .op-social[pagefrog-special=youtube] {
            margin-left: -20px !important;
            margin-right: -20px !important;
            width: 100% !important;
            height: auto !important;
        }
        .op-social[pagefrog-special=youtube] iframe {
            width: calc(100% + 40px) !important;
            height: auto !important;
            max-width: none;
        }
        img {
            width: 100%;
            max-width: 100%;
            height: auto;
        }
        p {
            margin-top: 15px;
            margin-bottom: 10px;
            margin-left: 0px;
            margin-right: 0px;
        }

        figcaption {
            margin-top: 12px;
            margin-bottom: 0px;
            margin-left: 0px;
            margin-right: 0px;
            width: auto;
        }
        figcaption > cite {
            text-transform: uppercase;
            font-style: normal;
            font-size: 10px;
            letter-spacing: 0px;
            display: block;
            opacity: 0.7;
            margin-top: 5px;
        }

        h1, h2 {
            margin-top: 30px;
            margin-bottom: 10px;
            margin-left: -2px;
            margin-right: 0px;
        }

        ol, ul {
            margin-top: 22px;
            margin-bottom: 22px;
            margin-left: -10px;
            margin-right: 0px;
        }

        li p {
            margin-bottom: 0px;
        }

        aside, blockquote {
            margin-top: 38px;
            margin-bottom: 38px;
            margin-left: 0px;
            margin-right: 0px;
        }

        /* ELEMENT STYLING */
        body {
            background-color: white;
            font-family: sans-serif;
            color: #222;
            font-weight: 300;
            font-size: 16px;
            margin: 0;
            padding: 0;
        }

        article {
            padding-left: 20px;
            padding-right: 20px;
            font-family: <?php echo $styles->get_body_text_font_family(); ?>;
            color: <?php echo $styles->get_body_text_font_color(); ?>;
        }

        figure > figcaption {
            margin-left: 20px;
            margin-right: 20px;
            display: block;
            font-weight: 300;
            line-height: 18px;
            letter-spacing: 0.4px;
            background-color: transparent;
            padding: 0;
            position: relative;
            top: 0px;
            opacity: 1 !important;
            visibility: visible;

            color: #7E7E7E;
            font-family: inherit;
            font-size: 12px;
        }
        figure > img {
            position: relative;
            z-index: -1;
        }

        /* fullscreen images */
        figure[data-mode="fullscreen"] {
            /* black bottom gradient */
            background: -moz-linear-gradient(top, rgba(0,0,0,0) 70%, rgba(0,0,0,0.65) 100%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(70%,0,0,0.65)), color-stop(100%,rgba(0,0,0,0)));
            background: -webkit-linear-gradient(top, rgba(0,0,0,0) 70%,rgba(0,0,0,0.65) 100%);
            background: -o-linear-gradient(top, rgba(0,0,0,0) 70%,rgba(0,0,0,0.65) 100%);
            background: -ms-linear-gradient(top, rgba(0,0,0,0) 70%,rgba(0,0,0,0.65) 100%);
            background: linear-gradient(to bottom, rgba(0,0,0,0) 70%,rgba(0,0,0,0.65) 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 );
        }
        figure[data-mode="fullscreen"] > img {
            width: 100%;
            height: 627px;
        }
        figure[data-mode="fullscreen"] > figcaption {
            position: absolute;
            bottom: 20px;
            top: auto;
            color: white;
        }

        /* slideshows */
        figure.op-slideshow > figure:not(:first-child) {
            display: none;  // only show first child
        }
        figure.op-slideshow > figure > figcaption {
            display: none;  // don't show figcaptions
        }
        @keyframes example {
            0% {right: 5px;}
            50% {right: 20px;}
            100% {right: 5px;}
        }
        figure.op-slideshow > i.fa-angle-right {
            font-size: 70px;
            transform: scale(0.8, 1);
            position: absolute;
            color: white;
            right: 5px;
            top: 50%;
            margin-top: -35px;
            opacity: 0.7;
            text-shadow: 0px 0px 5px #222;
            animation-name: example;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
        }

        /* video */
        figure img[data-pagefrog-type="video_poster"] {
            display: none;  // for now, don't show the poster image TODO: show
        }
        figure video {
            width: 100%;
            height: auto;
        }

        p {
            font-size: inherit;
            font-weight: inherit;
            line-height: 21px;
            letter-spacing: 0;
            margin-top: 0px;
            margin-bottom: 0px
            color: inherit;
            font-family: inherit;
        }

        h1 {
            font-size: 25px;
            font-weight: 500;
            line-height: 1.2;
            letter-spacing: -0.5px;

            font-family: <?php echo $styles->get_headings_font_family(); ?>;
            color: <?php echo $styles->get_headings_font_color(); ?>;
        }

        h2 {
            font-size: 18px;
            font-weight: 500;
            line-height: 1.2;
            letter-spacing: 0;

            font-family: <?php echo $styles->get_headings_font_family(); ?>;
            color: <?php echo $styles->get_headings_font_color(); ?>;
        }

        a {
            font-size: inherit;
            font-weight: inherit;
            line-height: 24px;
            letter-spacing: 0;

            color: <?php echo $styles->get_link_color(); ?>;
            text-decoration: <?php echo $styles->get_link_decoration(); ?>;
        }

        aside {
            font-size: 25px;
            font-weight: 500;
            line-height: 1.4;
            letter-spacing: -0.4px;

            font-family: <?php echo $styles->get_quotes_font_family(); ?>;
            color: <?php echo $styles->get_quotes_font_color(); ?>;
        }

        blockquote {
            font-size: inherit;
            font-weight: 300;
            line-height: 24px;
            letter-spacing: 0;
            border-left-width: 2px;
            border-left-style: solid;
            padding-left: 25px;
            color: inherit;
            border-left-color: inherit;
            padding-top: 0;
            padding-bottom: 0;
            font-family: <?php echo $styles->get_quotes_font_family(); ?>;
        }

        ol, ul {
            font-size: inherit;
            line-height: 26px;
            padding-left: 30px;
            font-weight: inherit;
            font-family: inherit;
            color: inherit;
        }

        iframe {
            width: 100% !important;
        }

        .btn-share {
            color: #7f7f7f;
            background-color: white;
            border: 1px solid #7f7f7f;
            border-radius: 0px;
            margin-top: 30px;
            margin-bottom: 30px;
        }

        article > br {  /* breaks don't have any effect at a top-level */
            display: none;
        }

        .footer-img {
            float:left;
            width:150px;
            margin-left:-20px;
            margin-right:20px;
        }

        #image-like-comment { /* LIKE&COMMENT */
            float: left;
            padding-top: 20px;
            font-size: 9px;
        }

    </style>

</head>
<body>

    <!--<div id='top-bar'>
        <span><i class="fa fa-angle-left"></i></span>
        <span>SHARE</span>
    </div>-->

    <article>
        <header>
            <!-- cover -->
            <?php if(has_post_thumbnail($post->ID)):
                $thumb = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );
                $attachment = get_post(get_post_thumbnail_id($post->ID));
                $thumbnail_url = $thumb[0];
            ?>
                <figure>
                    <img src="<?php echo $thumbnail_url; ?>" />
                    <?php if (strlen(apply_filters("the_content", $attachment->post_excerpt)) > 0): ?>
                        <figcaption><?php echo apply_filters("the_content", $attachment->post_excerpt); ?></figcaption>
                    <?php endif; ?>
                </figure>
            <?php endif; ?>

            <div id='title-bar' class="<?php echo $styles->get_id_bar_type(); ?>">
                <img src="<?php echo $styles->get_logo_img_url(); ?>" />
                <span id='title-bar-like'><i class="fa fa-thumbs-up" style="font-size:12px"></i> LIKE</span>
                <hr/>
            </div>

            <!-- kicker -->
            <!-- TODO -->

            <!-- The title and subtitle shown in your Instant Article -->
            <h1><?php the_title(); ?></h1>

            <!-- author(s) -->
            <address>
                BY <a><?php echo get_the_author_meta('display_name', get_post_field ('post_author', get_queried_object_id())); ?></a>
                <?php /*echo get_the_author_meta('description', get_post_field ('post_author', get_queried_object_id())); // don't show description for now - not in preview */ ?>
            </address>

            <!-- publication date/time -->
            <time class="op-published" datetime="<?php echo get_the_date("c"); ?>"><?php echo get_the_date('j M Y'); ?></time>

            <!-- modification date/time -->
            <time class="op-modified" datetime="<?php echo get_the_modified_date("c"); ?>"><?php echo get_the_modified_date('j M Y'); ?></time>

        </header>

        <!-- Article body goes here -->
        <?php echo apply_filters('pagefrog_format_instant_articles_content_preview', apply_filters('pagefrog_format_instant_articles_content', get_post(get_queried_object_id())->post_content)); ?>

        <!-- <span id='image-like-comment'><i class="fa fa-thumbs-up" style="font-size:12px"></i> LIKE &nbsp;&nbsp;&nbsp;&nbsp;  <i class="fa fa-comment" style="font-size:12px"></i> COMMENT</span> -->

        <button type="button" class="btn btn-share btn-lg btn-block"><i class="fa fa-share"></i> SHARE</button>

        <!--<footer class="footer-bg">
            <p class="p-related">Related Articles</p>
            <hr>
            <ul class="op-related-articles">
                <li>
                    <img class="footer-img" src="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/default-related.jpg">
                    <p class="p-related"><a class="a-related" href="">This is where your related articles appear</a></p>
                </li>
                <br/><br/>
                <hr class="hr-related">
                <li>
                    <img class="footer-img" src="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/default-related.jpg">
                    <p class="p-related"><a class="a-related" href="">This is where your related articles appear</a></p>
                </li>
                <br/><br/>
                <hr class="hr-related">
                <li>
                    <img class="footer-img" src="https://32f587a93a46c5273bbf-3b6385667d5892a5f7ae9a8fb4047034.ssl.cf1.rackcdn.com/images/default-related.jpg">
                    <p class="p-related"><a class="a-related" href="">This is where your related articles appear</a></p>
                </li>
                <br/><br/>
            </ul>
        </footer>-->
    </article>

    <script>
        $(document).ready(function() {
            $("iframe").each(function() {
                var width = $(this).attr('width');
                var height = $(this).attr('height');
                var calc_width = $(this).width();
                $(this).attr('style', "width: " + calc_width + "px !important; height: " + height * calc_width * 1.0/width + "px !important");
            });
        });
    </script>

</body>
</html>