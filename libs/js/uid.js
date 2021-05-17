if (!(typeof module !== "undefined" && module.exports)){
  var UIDvalue = getUID();
}

function currentUID() {
  return UIDvalue;
}


/**
 * Get uid saved in browser
 */
function getUID() {
  return localStorage.getItem('uid');
}


/**
 * Signing the uid
 * @param {String} UID
 */
function sign_uid(UID) {
  var url = location.protocol + '//' + location.host + location.pathname;
  //console.log(url);
  if (typeof jQuery != 'undefined') {
    $.ajax({
      url: url,
      dataType: 'jsonp',
      method: 'post',
      headers: {
        'Uid-Sign': guid()
      },
      data: {
        'uid_jsp': 1,
        'callback': 'saveUID',
        'uid': UID
      },
      silent: true,
      success: function(resdata) {
        console.log(resdata);
        if (resdata.hasOwnProperty('uid')) {
          localStorage.setItem('uid', resdata.uid);
        }
      }
    });
  } else {
    ajax().post(url, {
      'uid_jsp': genUID(),
      'callback': 'saveUID',
      'uid': UID
    }, function(res) {
      console.log(res);
      eval(res);
    });
  }
}

var UIDcalled = false;

/**
 * Check UID
 * @return {string} uid
 * @param {Function|any} callback
 */
function checkUID(callback) {
  UIDvalue = getUID();
  if (isExpireUID()) {
    UIDvalue = genUID();
    sign_uid(UIDvalue);
  }
  if (!UIDcalled) {
    setTimeout(() => {
      checkUID();
    }, 60000);
    UIDcalled = true;
  }
  UIDvalue = getUID();
  if (typeof callback == 'function') {
    return callback(UIDvalue);
  } else {
    return UIDvalue;
  }
}


function isExpireUID() {
  
  if (typeof UIDForce == 'boolean' && UIDForce) {
    console.log("UID FORCED");
    
    delete UIDForce;
    return true;
  } else {
    var timeLeft = framework().gc('signature-timeleft');
    
    timeLeft = new Date(timeLeft).getTime();
    var date = new Date().getTime();
    
    var isExpired = timeLeft < date;
    //console.log('uid is expired ' + isExpired);
    if (isExpired) {
      return true;
    }
    return !localStorage.getItem('uid');
  }
}

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function genUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
/**
 *  Save uid
 * @param {Object} data
 */
function saveUID(data) {
  console.log(data);
  if (typeof data == 'object') {
    if (data.hasOwnProperty('uid')) {
      console.log(`${data.uid} was saved`);
      localStorage.setItem('uid', data.uid);
      var date = new Date();
      framework().sc('signature-timeleft', AddMinutesToDate(date, 5)); // 5 mins
      //location.reload();
    }
  }
}