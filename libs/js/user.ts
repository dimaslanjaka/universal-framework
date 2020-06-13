
/**
 * User framework
 */
class user {
  constructor() { }
  key = location.host + '/userdata'
  /**
   * Get all userdata
   */
  all(): undefined | object {
    var data = localStorage.getItem(this.key);
    if (!data || data == '') { return undefined; }
    return JSON.parse(data);
  }
  /**
   * get userdata
   */
  get(key: String) {
    try {
      var data = this.all();
      if (data !== undefined) {
        if (data.hasOwnProperty(key.toString())) {
          return (<any>data)[key.toString()];
        }
      }
      console.log('user::get', data);
    } catch (error) {
      console.error('user::get', error);
      return undefined;
    }
  }
  /**
   * fetch userdata
   */
  fetch(callback: Function) {
    const ini = this;
    return $.ajax({
      url: '/user',
      method: 'POST',
      data: {
        check: true,
        user: true
      },
      success: function (res: Object) {
        if (typeof res != 'object') {
          return;
        }
        if (res) {
          if (res.hasOwnProperty('id')) {
            (<any>res).user_id = (<any>res).id;
            (<any>res)._ = new Date();
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
  }

}

interface Window { user: user; }

/**
   * @typedef {user} userc
   */
const userc = new user();
if (typeof window.user === 'undefined') {
  window.user = userc;
}
jQuery.user = userc;