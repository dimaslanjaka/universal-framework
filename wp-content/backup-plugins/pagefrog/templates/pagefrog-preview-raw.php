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
    <!-- End Stylesheets -->
</head>
<body>

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
                    <figcaption><?php echo apply_filters("the_content", $attachment->post_excerpt); ?></figcaption>
                </figure>
            <?php endif; ?>

            <!-- The title and subtitle shown in your Instant Article -->
            <h1><?php the_title(); ?></h1>

            <!-- author(s) -->
            <address>
                BY <a><?php echo get_the_author_meta('display_name', get_post_field ('post_author', get_queried_object_id())); ?></a>
                <?php echo get_the_author_meta('description', get_post_field ('post_author', get_queried_object_id())); ?>
            </address>

            <!-- publication date/time -->
            <time class="op-published" datetime="<?php echo get_the_date("c"); ?>"><?php echo get_the_date('j M Y'); ?></time>

            <!-- modification date/time -->
            <time class="op-modified" datetime="<?php echo get_the_modified_date("c"); ?>"><?php echo get_the_modified_date('j M Y'); ?></time>

            <h2>Styles</h2>
            logo_img => <?php echo $styles->get_logo_img_url(); ?><br/>
            id_bar_type => <?php echo $styles->get_id_bar_type(); ?><br/>
            id_bar_color => <?php echo $styles->get_id_bar_color(); ?><br/>
            title_font_family => <?php echo $styles->get_title_font_family(); ?><br/>
            title_font_color => <?php echo $styles->get_title_font_color(); ?><br/>
            headings_font_family => <?php echo $styles->get_headings_font_family(); ?><br/>
            headings_font_color => <?php echo $styles->get_headings_font_color(); ?><br/>
            body_text_font_family => <?php echo $styles->get_body_text_font_family(); ?><br/>
            body_text_font_color => <?php echo $styles->get_body_text_font_color(); ?><br/>
            link_decoration => <?php echo $styles->get_link_decoration(); ?><br/>
            link_color => <?php echo $styles->get_link_color(); ?><br/>
            quotes_font_family => <?php echo $styles->get_quotes_font_family(); ?><br/>
            quotes_font_color => <?php echo $styles->get_quotes_font_color(); ?><br/>
            footer_text_font_family => <?php echo $styles->get_footer_text_font_family(); ?><br/>
            footer_text_font_color => <?php echo $styles->get_footer_text_font_color(); ?><br/>

        </header>

        <!-- Article body goes here -->
        <h1>Article</h1>
        <?php echo get_post(get_queried_object_id())->post_content; ?>

    </article>
</body>
</html>