<?php $ads = new PageFrog_AdSettings_Storage(); ?>

<!doctype html>
    <html lang="en" prefix="op: http://media.facebook.com/op#">
    <head>
      <meta charset="utf-8">
      <link rel="canonical" href="<?php the_permalink(); ?>">
      <meta property="op:markup_version" content="v1.0">

      <?php if ( $ads->get_fbia_enable_auto_ads_bool() ) : ?>
          <!-- automatic ad placement -->
          <meta property="fb:use_automatic_ad_placement" content="true">
      <?php endif; ?>
    </head>
    <body>
        <article>
            <header>
                <!-- title -->
				<h1><?php the_title(); ?></h1>

				<!-- kicker -->
				<!-- TODO -->

                <!-- publication date/time -->
				<time class="op-published" datetime="<?php echo get_the_date("c"); ?>"><?php echo get_the_date(get_option('date_format') . ", " . get_option('time_format')); ?></time>

				<!-- modification date/time -->
				<time class="op-modified" datetime="<?php echo get_the_modified_date("c"); ?>"><?php echo get_the_modified_date(get_option('date_format') . ", " . get_option('time_format')); ?></time>

				<!-- author(s) -->
                <address>
                    <a><?php the_author_meta('display_name'); ?></a>
                    <?php the_author_meta('description'); ?>
                </address>

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

				<?php if ( $ads->get_fbia_enable_auto_ads_bool() ) : ?>
                    <!-- facebook audience network ad -->
                    <figure class="op-ad">
                        <iframe width="300" height="250" style="border:0; margin:0;" src="https://www.facebook.com/adnw_request?placement=<?php echo $ads->get_fbia_placement_id(); ?>&adtype=banner300x250"></iframe>
                    </figure>
                <?php endif; ?>
            </header>

            <!-- body -->
            <?php echo apply_filters('pagefrog_format_instant_articles_content', get_the_content( '' )); ?>
            <?php do_action( 'pagefrog_post_instant_articles_content', $post ); ?>

            <footer>
            </footer>
        </article>
    </body>
</html>