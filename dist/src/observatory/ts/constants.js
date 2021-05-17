"use strict";
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var states = {
    active: "active",
    done: "done",
    fail: "fail",
};
var loader = function () {
    (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
            process.stdout.write("\r" + P[x++]);
            x &= 3;
        }, 250);
    })();
};
var defaultSettings = {
    width: 55,
    prefix: ">>> ",
    write: process.stdout.write.bind(process.stdout),
    formatStatus: function (statusLabel, state) {
        if (!statusLabel) {
            return "";
        }
        if (state === states.active) {
            return chalk_1.default.yellow(statusLabel);
        }
        if (state === states.done) {
            return chalk_1.default.green(statusLabel);
        }
        if (state === states.fail) {
            return chalk_1.default.red(statusLabel);
        }
        return statusLabel;
    },
};
module.exports = {
    state: states,
    defaultSettings: defaultSettings,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9zcmMvb2JzZXJ2YXRvcnkvdHMvY29uc3RhbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7QUFDYix3REFBMEI7QUFFMUIsSUFBSSxNQUFNLEdBQUc7SUFDWCxNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxNQUFNO0NBQ2IsQ0FBQztBQUVGLElBQUksTUFBTSxHQUFHO0lBQ1gsQ0FBQztRQUNDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxXQUFXLENBQUM7WUFDakIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNULENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNWLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDUCxDQUFDLENBQUM7QUFFRixJQUFJLGVBQWUsR0FBRztJQUNwQixLQUFLLEVBQUUsRUFBRTtJQUNULE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2hELFlBQVksRUFBRSxVQUFVLFdBQVcsRUFBRSxLQUFLO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDM0IsT0FBTyxlQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLElBQUksRUFBRTtZQUN6QixPQUFPLGVBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakM7UUFFRCxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3pCLE9BQU8sZUFBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FDRixDQUFDO0FBRUYsaUJBQVM7SUFDUCxLQUFLLEVBQUUsTUFBTTtJQUNiLGVBQWUsRUFBRSxlQUFlO0NBQ2pDLENBQUMifQ==