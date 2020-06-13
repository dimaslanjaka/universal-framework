var AjaxSchedulerInit = null;
var AjaxSchedulerRequests = [];
var AjaxSchedulerRunning = false;
var ajaxScheduler = (function () {
    function ajaxScheduler() {
    }
    ajaxScheduler.add = function (opt) {
        AjaxSchedulerRequests.push(opt);
    };
    ;
    ajaxScheduler.remove = function (opt) {
        if (jQuery.inArray(opt, AjaxSchedulerRequests) > -1) {
            AjaxSchedulerRequests.splice(jQuery.inArray(opt, AjaxSchedulerRequests), 1);
        }
    };
    ;
    ajaxScheduler.run = function () {
        var self = this;
        var oriSuc;
        if (AjaxSchedulerRequests.length > 0) {
            oriSuc = AjaxSchedulerRequests[0].complete;
            AjaxSchedulerRequests[0].complete = function () {
                if (typeof (oriSuc) === 'function') {
                    oriSuc();
                }
                AjaxSchedulerRequests.shift();
                self.run.apply(self, []);
            };
            $.ajax(AjaxSchedulerRequests[0]);
        }
        else {
            AjaxSchedulerInit = setTimeout(function () {
                self.run.apply(self, []);
            }, 1000);
        }
        return true;
    };
    ajaxScheduler.stop = function () {
        AjaxSchedulerRequests = [];
        clearTimeout(AjaxSchedulerInit);
    };
    return ajaxScheduler;
}());
function ajaxRun(url, method, data, success, failed, complete) {
    if (!AjaxSchedulerRunning) {
        ajaxScheduler.run();
        AjaxSchedulerRunning = true;
    }
    return ajaxScheduler.add({
        url: url,
        method: method,
        timeout: 30000,
        data: data,
        indicator: true,
        headers: {
            'unique-id': getUID(),
            'Accept': 'application/json'
        },
        success: function (res) {
            successAjax(res, success);
        },
        error: function (err) {
            if (typeof failed == 'function') {
                failed(err);
            }
        },
        complete: function (res) {
            AJAX = null;
            if (typeof complete == 'function') {
                complete(res);
            }
        }
    });
}
function ajaxFormSchedule() {
    $(document).on('submit', 'form', function (e) {
        e.preventDefault();
        var t = $(this);
        var s = t.data('success'), err = t.data('error'), c = t.data('complete');
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
//# sourceMappingURL=ajaxJQueryScheduler.js.map