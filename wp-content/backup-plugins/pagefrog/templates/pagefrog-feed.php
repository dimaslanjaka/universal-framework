<?php
    /**
     * Feed Template - feed file
     *
     * @package pagefrog
     */

    header('Content-Type: ' . feed_content_type('rss2') . '; charset=' . get_option('blog_charset'), true);
    $more = 1;

    echo '<?xml version="1.0" encoding="'.get_option('blog_charset').'"?'.'>';

    /**
     * Fires between the xml and rss tags in a feed.
     *
     * @since 4.0.0
     *
     * @param string $context Type of feed. Possible values include 'rss2', 'rss2-comments',
     *                        'rdf', 'atom', and 'atom-comments'.
     */
    do_action( 'rss_tag_pre', 'rss2' );
?>

<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">

<channel>
	<title><?php bloginfo_rss('name'); ?></title>
	<link><?php bloginfo_rss('url') ?></link>
	<description><?php bloginfo_rss("description") ?></description>
	<lastBuildDate><?php echo mysql2date('c', get_lastpostmodified('GMT'), false); ?></lastBuildDate>
	<language><?php bloginfo_rss( 'language' ); ?></language>

	<?php
	    // fetch all published posts marked for FBIA publishing (render up to 50 valid posts)
        $meta_query = array(
            'relation' => 'OR',
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'value' => 1,
            ),
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'compare' => 'NOT EXISTS',
                'value' => '' // to fix a wp bug: https://core.trac.wordpress.org/ticket/23268
            ),
            array(
                'key' => PageFrog_PostStatus::FBIA_STATUS_KEY,
                'value' => '',
            )
        );
        $args = array(
            'meta_query' => $meta_query,
            'post_status' => 'publish'
        );
        $query = new WP_Query( $args );
        $rendered_posts = 0;

        while( $query->have_posts() ) :

            $query->the_post();

            // only show up to 50 rendered posts
            $rendered_posts += 1;
            if ( $rendered_posts > 50 ) {
                break;
            }
	?>

	<item>
        <title><?php the_title_rss() ?></title>
        <link><?php the_permalink_rss() ?></link>
        <guid><?php the_guid(); ?>&pagefrog_version=0.1</guid>
        <pubDate><?php echo mysql2date('c', get_post_time('c', true), false); ?></pubDate>
        <author><?php the_author() ?></author>
        <description><?php the_excerpt_rss(); ?></description>
        <content:encoded>
            <![CDATA[
                <?php
                    $template_file = PF__PLUGIN_DIR . 'templates/pagefrog-instant-article.php';
                    load_template($template_file, false);
                ?>
            ]]>
        </content:encoded>
    </item>

	<?php endwhile; ?>
</channel>
</rss>
