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
    var data = storage().get(this.key);
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
      var data = this.all();
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
   * fetch userdata
   */
  fetch(callback: Function | null) {
    const ini = this;
    return $.ajax({
      url: "/user",
      method: "POST",
      silent: true,
      indicator: false,
      data: {
        check: true,
        user: true,
      },
      success: function (res: Object) {
        if (typeof res != "object") {
          return;
        }
        if (res) {
          if (res.hasOwnProperty("id")) {
            (<any>res).user_id = (<any>res).id;
            (<any>res)._ = new Date();
          }
          if (res.hasOwnProperty("username")) {
            if (typeof callback == "function") {
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

if (!(typeof module !== "undefined" && module.exports)) {
  /**
   * @typedef {user} userc
   */
  const userc = new user();
  if (typeof window.user === "undefined") {
    window.user = userc;
  }
  jQuery.user = userc;
}
