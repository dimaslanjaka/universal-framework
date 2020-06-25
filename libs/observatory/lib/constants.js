'use strict';
var chalk = require('chalk');
var states = {
    active: 'active',
    done: 'done',
    fail: 'fail'
};
var defaultSettings = {
    width: 55,
    prefix: ' ⫸  ',
    write: process.stdout.write.bind(process.stdout),
    formatStatus: function (statusLabel, state) {
        if (!statusLabel) {
            return '';
        }
        if (state === states.active) {
            return chalk.yellow(statusLabel);
        }
        if (state === states.done) {
            return chalk.green(statusLabel);
        }
        if (state === states.fail) {
            return chalk.red(statusLabel);
        }
        return statusLabel;
    }
};
module.exports = {
    state: states,
    defaultSettings: defaultSettings
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29ic2VydmF0b3J5L2xpYi9jb25zdGFudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBQ2IsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTdCLElBQUksTUFBTSxHQUFHO0lBQ1QsTUFBTSxFQUFFLFFBQVE7SUFDaEIsSUFBSSxFQUFFLE1BQU07SUFDWixJQUFJLEVBQUUsTUFBTTtDQUNmLENBQUM7QUFFRixJQUFJLGVBQWUsR0FBRztJQUNsQixLQUFLLEVBQUUsRUFBRTtJQUNULE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQ2hELFlBQVksRUFBRSxVQUFTLFdBQVcsRUFBRSxLQUFLO1FBRXJDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxPQUFPLEVBQUUsQ0FBQztTQUNiO1FBRUQsSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUN6QixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ3ZCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQztRQUVELElBQUksS0FBSyxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDdkIsT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztDQUNKLENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsS0FBSyxFQUFFLE1BQU07SUFDYixlQUFlLEVBQUUsZUFBZTtDQUNuQyxDQUFDIn0=