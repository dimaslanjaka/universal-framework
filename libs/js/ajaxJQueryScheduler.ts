let AjaxSchedulerInit: NodeJS.Timer | any = null;
let AjaxSchedulerRequests: Array<any> = [];
let AjaxSchedulerRunning: Boolean = false;

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
    }

    /**
     * Remove ajax from queues
     * @param opt
     */
    static remove(opt: Object) {
        if (jQuery.inArray(opt, AjaxSchedulerRequests) > -1) {
            AjaxSchedulerRequests.splice(jQuery.inArray(opt, AjaxSchedulerRequests), 1);
        }
    }

    /**
     * Run Ajax Scheduler
     */
    static run() {
        const self = this;
        let oriSuc: () => void;
        //console.log(AjaxSchedulerRequests.length);
        if (AjaxSchedulerRequests.length > 0) {
            oriSuc = AjaxSchedulerRequests[0].complete;

            AjaxSchedulerRequests[0].complete = function () {
                if (typeof oriSuc === "function") {
                    oriSuc();
                }
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
        clearTimeout(<any>AjaxSchedulerInit);
    }
}

/**
 * RUN AJAX Scheduler
 * @param url
 * @param method POST, GET, HEAD, DELETE, OPTIONS, PATCH, PROPATCH
 * @param data
 * @param success
 * @param failed
 * @param complete
 * @description ajax request one by one
 * @todo scheduling any jquery ajax
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
function ajaxRun(url: string, method: string, data: object, success: Function, failed: Function, complete: Function) {
    if (!AjaxSchedulerRunning) {
        ajaxScheduler.run();
        AjaxSchedulerRunning = true;
    }
    return ajaxScheduler.add({
        url: url,
        method: method,
        timeout: 30000, // sets timeout to 30 seconds
        data: data,
        indicator: true,
        headers: {
            "unique-id": getUID(),
            Accept: "application/json",
        },
        success: function (res) {
            if (typeof success == "function") {
                success(res);
            } else if (typeof success == "string") {
                ___call(success, window, res);
            } else {
                console.log(success + " isn't success callback, instead of " + typeof success);
            }
        },
        error: function (err: JQueryXHR) {
            if (typeof failed == "function") {
                failed(err);
            }
        },
        complete: function (res: JQueryXHR) {
            //AJAX = null;
            if (typeof complete == "function") {
                complete(res);
            }
            //gexec('Ajax_Reload');
        },
    });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
function ajaxFormSchedule() {
    $(document).on("submit", "form", function (e) {
        e.preventDefault();
        const t = $(this);
        const s = t.data("success"),
            err = t.data("error"),
            c = t.data("complete");
        ajaxScheduler.add({
            url: t.attr("action"),
            method: t.attr("method"),
            data: t.serialize(),
            success: s,
            error: err,
            complete: c,
        });
    });
}
