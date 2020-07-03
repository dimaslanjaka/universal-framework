module.exports = function assert_options(what, value) {
    //  discuss at: https://locutus.io/php/assert_options/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: assert_options('ASSERT_CALLBACK')
    //   returns 1: null
    var iniKey, defaultVal;
    switch (what) {
        case 'ASSERT_ACTIVE':
            iniKey = 'assert.active';
            defaultVal = 1;
            break;
        case 'ASSERT_WARNING':
            iniKey = 'assert.warning';
            defaultVal = 1;
            var msg = 'We have not yet implemented warnings for us to throw ';
            msg += 'in JavaScript (assert_options())';
            throw new Error(msg);
        case 'ASSERT_BAIL':
            iniKey = 'assert.bail';
            defaultVal = 0;
            break;
        case 'ASSERT_QUIET_EVAL':
            iniKey = 'assert.quiet_eval';
            defaultVal = 0;
            break;
        case 'ASSERT_CALLBACK':
            iniKey = 'assert.callback';
            defaultVal = null;
            break;
        default:
            throw new Error('Improper type for assert_options()');
    }
    // I presume this is to be the most recent value, instead of the default value
    var iniVal = (typeof require !== 'undefined' ? require('../info/ini_get')(iniKey) : undefined) || defaultVal;
    return iniVal;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0X29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvaW5mby9hc3NlcnRfb3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFFLElBQUksRUFBRSxLQUFLO0lBQ25ELHNEQUFzRDtJQUN0RCxvREFBb0Q7SUFDcEQsaURBQWlEO0lBQ2pELG9CQUFvQjtJQUVwQixJQUFJLE1BQU0sRUFBRSxVQUFVLENBQUE7SUFDdEIsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLGVBQWU7WUFDbEIsTUFBTSxHQUFHLGVBQWUsQ0FBQTtZQUN4QixVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQ2QsTUFBSztRQUNQLEtBQUssZ0JBQWdCO1lBQ25CLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQTtZQUN6QixVQUFVLEdBQUcsQ0FBQyxDQUFBO1lBQ2QsSUFBSSxHQUFHLEdBQUcsdURBQXVELENBQUE7WUFDakUsR0FBRyxJQUFJLGtDQUFrQyxDQUFBO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdEIsS0FBSyxhQUFhO1lBQ2hCLE1BQU0sR0FBRyxhQUFhLENBQUE7WUFDdEIsVUFBVSxHQUFHLENBQUMsQ0FBQTtZQUNkLE1BQUs7UUFDUCxLQUFLLG1CQUFtQjtZQUN0QixNQUFNLEdBQUcsbUJBQW1CLENBQUE7WUFDNUIsVUFBVSxHQUFHLENBQUMsQ0FBQTtZQUNkLE1BQUs7UUFDUCxLQUFLLGlCQUFpQjtZQUNwQixNQUFNLEdBQUcsaUJBQWlCLENBQUE7WUFDMUIsVUFBVSxHQUFHLElBQUksQ0FBQTtZQUNqQixNQUFLO1FBQ1A7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7S0FDeEQ7SUFFRCw4RUFBOEU7SUFDOUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxPQUFPLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxVQUFVLENBQUE7SUFFNUcsT0FBTyxNQUFNLENBQUE7QUFDZixDQUFDLENBQUEifQ==