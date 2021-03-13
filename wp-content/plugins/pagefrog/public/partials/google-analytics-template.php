<amp-analytics type="googleanalytics">
    <script type="application/json">
        {
            "vars": {
                "account": "<?php echo $analytics->get_google_analytics_site_id(); ?>"
            },
            "triggers": {
                "trackPageview" : {
                    "on": "visible",
                    "request": "pageview"
                }
            }
        }
    </script>
</amp-analytics>