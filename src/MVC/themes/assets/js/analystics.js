var gtagID = 'UA-106238155-1';
var create_gtagscript = document.createElement('script');
create_gtagscript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtagID;
create_gtagscript.async = true;
document.getElementsByTagName('body')[0].appendChild(create_gtagscript);
var gtag = null;
window.onload = function () {
    if (window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        gtag = function () {
            window.dataLayer.push(arguments);
        };
        gtag('js', new Date());
        gtag('config', gtagID, {
            'page_title': document.title,
            'page_path': location.pathname
        });
        gtag('event', 'page_view', {
            'send_to': gtagID
        });
        gtag('config', 'UA-106238155-1', {
            'cookie_prefix': 'GoogleAnalystics',
            'cookie_domain': location.host,
            'cookie_update': false,
            'cookie_expires': 28 * 24 * 60 * 60
        });
        var trackLinks = document.getElementsByTagName('a');
        for (var i = 0, len = trackLinks.length; i < len; i++) {
            trackLinks[i].onclick = function () {
                if (!/^\#/gm.test(this.href) && !empty(this.href)) {
                    gtag("event", "click", {
                        event_category: "outbound",
                        event_label: this.href,
                        transport_type: "beacon"
                    });
                }
            };
        }
    }
};
function analys(event_action, event_label, event_category, event_value, event_callback) {
    var conf = {
        'event_label': event_label,
        'event_category': event_category,
        'value': event_value,
        'event_callback': (typeof event_callback == 'function' ? event_callback : false)
    };
    return gtag('event', event_action, conf);
}
//# sourceMappingURL=analystics.js.map