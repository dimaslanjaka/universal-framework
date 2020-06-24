module.exports = function escapeshellarg(arg) {
    //  discuss at: https://locutus.io/php/escapeshellarg/
    // original by: Felix Geisendoerfer (https://www.debuggable.com/felix)
    // improved by: Brett Zamir (https://brett-zamir.me)
    //   example 1: escapeshellarg("kevin's birthday")
    //   returns 1: "'kevin\\'s birthday'"
    var ret = '';
    ret = arg.replace(/[^\\]'/g, function (m, i, s) {
        return m.slice(0, 1) + '\\\'';
    });
    return "'" + ret + "'";
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlc2hlbGxhcmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2V4ZWMvZXNjYXBlc2hlbGxhcmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLGNBQWMsQ0FBRSxHQUFHO0lBQzNDLHNEQUFzRDtJQUN0RCxzRUFBc0U7SUFDdEUsb0RBQW9EO0lBQ3BELGtEQUFrRDtJQUNsRCxzQ0FBc0M7SUFFdEMsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBRVosR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFBO0lBQy9CLENBQUMsQ0FBQyxDQUFBO0lBRUYsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUN4QixDQUFDLENBQUEifQ==