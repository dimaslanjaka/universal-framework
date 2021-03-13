<figure class="op-tracker">
    <iframe>
    <script type='text/javascript'>var _sf_startpt=(new Date()).getTime()</script>
    <script type='text/javascript'>
        var _sf_async_config = _sf_async_config || {};
         /** CONFIGURATION START **/
        _sf_async_config.uid = <?php echo $analytics->get_chartbeat_uid(); ?>;
        _sf_async_config.domain = '<?php echo preg_replace( "/\/.*/", '', preg_replace( "/https?\:\/\/(www\.)?/", '', get_site_url() ) ); ?>';
        _sf_async_config.useCanonical = true;
        _sf_async_config.sections = '<?php
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
        ?>';
        _sf_async_config.authors = '<?php echo get_the_author_meta("nicename", $post->post_author); ?>';
        /** CONFIGURATION END **/
        (function () {
              function loadChartbeat() {
                   window._sf_endpt = (new Date()).getTime();
                   var e = document.createElement('script');
                   e.setAttribute('language', 'javascript');
                   e.setAttribute('type', 'text/javascript');
                   e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
                   document.body.appendChild(e);
              }
              loadChartbeat();
        })();
    </script>
    </iframe>
</figure>