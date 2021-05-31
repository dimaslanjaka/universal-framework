/**
 * User framework
 */
class user {
    //constructor() { if (!this.all()) { this.fetch(null); } }
    key = location.host + "/userdata";

    /**
     * Get all userdata
     */
    all(): undefined | object | any {
        const data = storage().get(this.key);
        if (!data || data == "") {
            return undefined;
        }
        return data;
    }

    /**
     * get userdata
     */
    get(key: string) {
        try {
            const data = this.all();
            if (data !== undefined) {
                if (data.hasOwnProperty(key)) {
                    return data[key];
                }
            }
            console.log("user::get", data);
        } catch (error) {
            console.error("user::get", error);
            return undefined;
        }
    }

    /**
     * User login
     * @param user
     * @param pass
     * @param callback
     * @example
     * userClass().login('username', 'password', function (err, data) {
        console.log(arguments);
        if (!err){
            console.log('login successful');
        }
    });
     */
    login(user: string, pass: string, callback?: (err: boolean, data: object) => any) {
        const data = new URLSearchParams();
        data.append("user", user);
        data.append("pass", pass);
        fetch("/server/user?login", {
            method: "post",
            body: data,
        })
            .then((response) => response.json())
            .then((response) => {
                if (typeof callback == "function") {
                    callback(response.error, response);
                }
            });
    }

    /**
     * fetch userdata
     * @param callback
     * @returns
     */
    fetch(callback: Function | null) {
        const ini = this;
        return $.ajax({
            url: "/server/user",
            method: "POST",
            silent: true,
            indicator: false,
            data: {
                check: true,
                user: true,
            },
            success: function (res: Object) {
                if (typeof res !== "object") {
                    return;
                }
                if (res) {
                    if (res.hasOwnProperty("id")) {
                        (<any>res).user_id = (<any>res).id;
                        (<any>res)._ = new Date();
                    }
                    if (res.hasOwnProperty("username")) {
                        if (typeof callback === "function") {
                            callback(res);
                        }
                    }
                }
                storage().set(ini.key, JSON.stringify(res));
                console.log("user::fetch", ini.all());
            },
        });
    }
}

if (!isnode()) {
    const uclass = new user();

    /**
     * User Class
     */
    function userClass() {
        return uclass;
    }

    if (typeof window !== "undefined" && typeof window.user === "undefined") {
        window.user = userClass();
    }
    if (typeof jQuery !== "undefined") {
        jQuery.user = userClass();
    }
}
