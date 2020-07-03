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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNjYXBlc2hlbGxhcmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZXhlYy9lc2NhcGVzaGVsbGFyZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsY0FBYyxDQUFFLEdBQUc7SUFDM0Msc0RBQXNEO0lBQ3RELHNFQUFzRTtJQUN0RSxvREFBb0Q7SUFDcEQsa0RBQWtEO0lBQ2xELHNDQUFzQztJQUV0QyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFFWixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDNUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUE7SUFDL0IsQ0FBQyxDQUFDLENBQUE7SUFFRixPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQ3hCLENBQUMsQ0FBQSJ9