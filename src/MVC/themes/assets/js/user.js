var user = (function () {
    function user() {
        this.key = location.host + '/userdata';
    }
    user.prototype.all = function () {
        var data = localStorage.getItem(this.key);
        if (!data || data == '') {
            return undefined;
        }
        return JSON.parse(data);
    };
    user.prototype.get = function (key) {
        try {
            var data = this.all();
            if (data !== undefined) {
                if (data.hasOwnProperty(key.toString())) {
                    return data[key.toString()];
                }
            }
            console.log('user::get', data);
        }
        catch (error) {
            console.error('user::get', error);
            return undefined;
        }
    };
    user.prototype.fetch = function (callback) {
        var ini = this;
        return $.ajax({
            url: '/user',
            method: 'POST',
            data: {
                check: true,
                user: true
            },
            success: function (res) {
                if (typeof res != 'object') {
                    return;
                }
                if (res) {
                    if (res.hasOwnProperty('id')) {
                        res.user_id = res.id;
                        res._ = new Date();
                    }
                    if (res.hasOwnProperty('username')) {
                        if (typeof callback == 'function') {
                            callback(res);
                        }
                    }
                }
                localStorage.setItem(ini.key, JSON.stringify(res));
                console.log('user::fetch', ini.all());
            }
        });
    };
    return user;
}());
var userc = new user();
if (typeof window.user === 'undefined') {
    window.user = userc;
}
jQuery.user = userc;
//# sourceMappingURL=user.js.map