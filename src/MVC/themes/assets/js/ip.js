var ip = (function () {
    function ip() {
    }
    ip.check = function () { };
    ip.ipapi = function () {
        $.ajax({
            url: 'https://ipapi.co/json/',
            success: function (res) {
                if (typeof res == 'object') {
                    storage().set('ip_info', res);
                    if (res.hasOwnProperty('ip')) {
                        storage().set('ip', res.ip);
                    }
                }
            }
        });
    };
    ip.l2io = function () {
        $.ajax({
            url: 'https://l2.io/ip.json',
            success: function (res) {
                if (typeof res == 'object') {
                    storage().set('ip_info', res);
                    if (res.hasOwnProperty('ip')) {
                        storage().set('ip', res.ip);
                    }
                }
            }
        });
    };
    return ip;
}());
//# sourceMappingURL=ip.js.map