module.exports = function vsprintf(format, args) {
    //  discuss at: https://locutus.io/php/vsprintf/
    // original by: ejsanders
    //   example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
    //   returns 1: '1988-08-01'
    var sprintf = require('../strings/sprintf');
    return sprintf.apply(this, [format].concat(args));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnNwcmludGYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvdnNwcmludGYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxNQUFNLEVBQUUsSUFBSTtJQUM5QyxnREFBZ0Q7SUFDaEQseUJBQXlCO0lBQ3pCLHdEQUF3RDtJQUN4RCw0QkFBNEI7SUFFNUIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFFM0MsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ25ELENBQUMsQ0FBQSJ9