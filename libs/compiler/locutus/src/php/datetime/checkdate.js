module.exports = function checkdate(m, d, y) {
    //  discuss at: https://locutus.io/php/checkdate/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Pyerre
    // improved by: Theriault (https://github.com/Theriault)
    //   example 1: checkdate(12, 31, 2000)
    //   returns 1: true
    //   example 2: checkdate(2, 29, 2001)
    //   returns 2: false
    //   example 3: checkdate(3, 31, 2008)
    //   returns 3: true
    //   example 4: checkdate(1, 390, 2000)
    //   returns 4: false
    return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0))
        .getDate();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9kYXRldGltZS9jaGVja2RhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDMUMsaURBQWlEO0lBQ2pELG9EQUFvRDtJQUNwRCxzQkFBc0I7SUFDdEIsd0RBQXdEO0lBQ3hELHVDQUF1QztJQUN2QyxvQkFBb0I7SUFDcEIsc0NBQXNDO0lBQ3RDLHFCQUFxQjtJQUNyQixzQ0FBc0M7SUFDdEMsb0JBQW9CO0lBQ3BCLHVDQUF1QztJQUN2QyxxQkFBcUI7SUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5RSxPQUFPLEVBQUUsQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9