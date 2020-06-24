module.exports = function floatval(mixedVar) {
    //  discuss at: https://locutus.io/php/floatval/
    // original by: Michael White (https://getsprink.com)
    //      note 1: The native parseFloat() method of JavaScript returns NaN
    //      note 1: when it encounters a string before an int or float value.
    //   example 1: floatval('150.03_page-section')
    //   returns 1: 150.03
    //   example 2: floatval('page: 3')
    //   example 2: floatval('-50 + 8')
    //   returns 2: 0
    //   returns 2: -50
    return (parseFloat(mixedVar) || 0);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXR2YWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9mbG9hdHZhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLFFBQVE7SUFDMUMsZ0RBQWdEO0lBQ2hELHFEQUFxRDtJQUNyRCx3RUFBd0U7SUFDeEUseUVBQXlFO0lBQ3pFLCtDQUErQztJQUMvQyxzQkFBc0I7SUFDdEIsbUNBQW1DO0lBQ25DLG1DQUFtQztJQUNuQyxpQkFBaUI7SUFDakIsbUJBQW1CO0lBRW5CLE9BQU8sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDcEMsQ0FBQyxDQUFBIn0=