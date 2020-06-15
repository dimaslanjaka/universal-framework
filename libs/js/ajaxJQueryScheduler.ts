var AjaxSchedulerInit: NodeJS.Timeout = null;
var AjaxSchedulerRequests: Array<any> = [];
var AjaxSchedulerRunning: Boolean = false;
/**
 * AJAX MANAGER
 * @todo handle ajax request queue
 * @see https://bit.ly/2Tz0wrf
 */
class ajaxScheduler {
  /**
   * Add ajax to queues
   * @param opt
   */
  static add(opt: JQueryAjaxSettings) {
    AjaxSchedulerRequests.push(opt);
  };
  /**
   * Remove ajax from queues
   * @param opt
   */
  static remove(opt: Object) {
    if (jQuery.inArray(opt, AjaxSchedulerRequests) > -1) {
      AjaxSchedulerRequests.splice(jQuery.inArray(opt, AjaxSchedulerRequests), 1);
    }
  };
  /**
   * Run Ajax Scheduler
   */
  static run() {
    var self = this;
    var oriSuc: () => void;
    //console.log(AjaxSchedulerRequests.length);
    if (AjaxSchedulerRequests.length > 0) {
      oriSuc = AjaxSchedulerRequests[0].complete;

      AjaxSchedulerRequests[0].complete = function () {
        if (typeof (oriSuc) === 'function') { oriSuc(); }
        AjaxSchedulerRequests.shift();
        self.run.apply(self, []);
      };

      $.ajax(AjaxSchedulerRequests[0]);
    } else {
      AjaxSchedulerInit = setTimeout(function () {
        self.run.apply(self, []);
      }, 1000);
    }
    return true;
  }
  /**
   * Stop ajax scheduler
   */
  static stop() {
    AjaxSchedulerRequests = [];
    clearTimeout(AjaxSchedulerInit);
  }
}

/**
 * RUN AJAX Scheduler
 * @param method POST, GET, HEAD, DELETE, OPTIONS, PATCH, PROPATCH
 * @description ajax request one by one
 * @todo scheduling any jquery ajax
 */
function ajaxRun(url: string, method: string, data: object, success: Function, failed: Function, complete: Function) {
  if (!AjaxSchedulerRunning) { ajaxScheduler.run(); AjaxSchedulerRunning = true; }
  return ajaxScheduler.add({
    url: url,
    method: method,
    timeout: 30000, // sets timeout to 30 seconds
    data: data,
    indicator: true,
    headers: {
      'unique-id': getUID(),
      'Accept': 'application/json'
    },
    success: function (res) {
      processAjaxForm(res, success);
    },
    error: function (err: JQueryXHR) {
      if (typeof failed == 'function') {
        failed(err);
      }
    },
    complete: function (res: JQueryXHR) {
      AJAX = null;
      if (typeof complete == 'function') {
        complete(res);
      }
      //gexec('Ajax_Reload');
    }
  });
}

function ajaxFormSchedule() {
  $(document).on('submit', 'form', function (e) {
    e.preventDefault();
    var t = $(this);
    var s = t.data('success'),
      err = t.data('error'),
      c = t.data('complete');
    ajaxScheduler.add({
      url: t.attr('action'),
      method: t.attr('method'),
      data: t.serialize(),
      success: s,
      error: err,
      complete: c
    });
  });
}