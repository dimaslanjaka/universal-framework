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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL2RhdGV0aW1lL2NoZWNrZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUMxQyxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0Qix3REFBd0Q7SUFDeEQsdUNBQXVDO0lBQ3ZDLG9CQUFvQjtJQUNwQixzQ0FBc0M7SUFDdEMscUJBQXFCO0lBQ3JCLHNDQUFzQztJQUN0QyxvQkFBb0I7SUFDcEIsdUNBQXVDO0lBQ3ZDLHFCQUFxQjtJQUVyQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlFLE9BQU8sRUFBRSxDQUFBO0FBQ2QsQ0FBQyxDQUFBIn0=