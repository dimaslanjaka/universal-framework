<figure class="op-tracker">
    <iframe>
        <script>
            PARSELY = {
                autotrack: false,
                onload: function() {
                PARSELY.beacon.trackPageView({
                urlref: 'http://facebook.com/instantarticles'
                    });
                    return true;
                }
            }
        </script>
        <div id="parsely-root" style="display: none">
            <span id="parsely-cfg" data-parsely-site="<?php echo $analytics->get_parsely_api_key(); ?>"></span>
        </div>

        <script>
            (function(s, p, d) {
                var h=d.location.protocol, i=p+"-"+s,
                    e=d.getElementById(i), r=d.getElementById(p+"-root"),
                    u=h==="https:"?"d1z2jf7jlzjs58.cloudfront.net"
                    :"static."+p+".com";
                if (e) return;
                e = d.createElement(s); e.id = i; e.async = true;
                e.src = h+"//"+u+"/p.js"; r.appendChild(e);
            })("script", "parsely", document);
        </script>
        <!-- http://www.parsely.com/docs/integration/tracking/fbinstant.html -->
    </iframe>
</figure>