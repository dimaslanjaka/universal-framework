<amp-analytics type="chartbeat">
    <script type="application/json">
        {
            "vars": {
              "uid": "<?php echo $analytics->get_chartbeat_uid(); ?>",
              "domain": "<?php echo preg_replace( "/\/.*/", '', preg_replace( "/https?\:\/\/(www\.)?/", '', get_site_url() ) ); ?>",
              "sections": "<?php
                  $tags = wp_get_post_tags( $post->ID );
                  $count = count( $tags );
                  $i = 0;
                  foreach( $tags as $tag ) {
                    echo $tag->name;
                    if ($i !== $count - 1) {
                      echo ",";
                    }
                    $i++;
                  }
                ?>"
            }
        }
    </script>
</amp-analytics>