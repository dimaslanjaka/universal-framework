module.exports = function is_scalar(mixedVar) {
    //  discuss at: https://locutus.io/php/is_scalar/
    // original by: Paulo Freitas
    //   example 1: is_scalar(186.31)
    //   returns 1: true
    //   example 2: is_scalar({0: 'Kevin van Zonneveld'})
    //   returns 2: false
    return (/boolean|number|string/).test(typeof mixedVar);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNfc2NhbGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc19zY2FsYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFNBQVMsQ0FBRSxRQUFRO0lBQzNDLGlEQUFpRDtJQUNqRCw2QkFBNkI7SUFDN0IsaUNBQWlDO0lBQ2pDLG9CQUFvQjtJQUNwQixxREFBcUQ7SUFDckQscUJBQXFCO0lBRXJCLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFFBQVEsQ0FBQyxDQUFBO0FBQ3hELENBQUMsQ0FBQSJ9