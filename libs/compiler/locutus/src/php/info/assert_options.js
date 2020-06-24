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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0X29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2luZm8vYXNzZXJ0X29wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxJQUFJLEVBQUUsS0FBSztJQUNuRCxzREFBc0Q7SUFDdEQsb0RBQW9EO0lBQ3BELGlEQUFpRDtJQUNqRCxvQkFBb0I7SUFFcEIsSUFBSSxNQUFNLEVBQUUsVUFBVSxDQUFBO0lBQ3RCLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxlQUFlO1lBQ2xCLE1BQU0sR0FBRyxlQUFlLENBQUE7WUFDeEIsVUFBVSxHQUFHLENBQUMsQ0FBQTtZQUNkLE1BQUs7UUFDUCxLQUFLLGdCQUFnQjtZQUNuQixNQUFNLEdBQUcsZ0JBQWdCLENBQUE7WUFDekIsVUFBVSxHQUFHLENBQUMsQ0FBQTtZQUNkLElBQUksR0FBRyxHQUFHLHVEQUF1RCxDQUFBO1lBQ2pFLEdBQUcsSUFBSSxrQ0FBa0MsQ0FBQTtZQUN6QyxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3RCLEtBQUssYUFBYTtZQUNoQixNQUFNLEdBQUcsYUFBYSxDQUFBO1lBQ3RCLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDZCxNQUFLO1FBQ1AsS0FBSyxtQkFBbUI7WUFDdEIsTUFBTSxHQUFHLG1CQUFtQixDQUFBO1lBQzVCLFVBQVUsR0FBRyxDQUFDLENBQUE7WUFDZCxNQUFLO1FBQ1AsS0FBSyxpQkFBaUI7WUFDcEIsTUFBTSxHQUFHLGlCQUFpQixDQUFBO1lBQzFCLFVBQVUsR0FBRyxJQUFJLENBQUE7WUFDakIsTUFBSztRQUNQO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0tBQ3hEO0lBRUQsOEVBQThFO0lBQzlFLElBQUksTUFBTSxHQUFHLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFBO0lBRTVHLE9BQU8sTUFBTSxDQUFBO0FBQ2YsQ0FBQyxDQUFBIn0=