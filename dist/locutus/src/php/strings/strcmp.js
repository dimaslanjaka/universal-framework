module.exports = function strcmp(str1, str2) {
    //  discuss at: https://locutus.io/php/strcmp/
    // original by: Waldo Malqui Silva (https://waldo.malqui.info)
    //    input by: Steve Hilder
    // improved by: Kevin van Zonneveld (https://kvz.io)
    //  revised by: gorthaur
    //   example 1: strcmp( 'waldo', 'owald' )
    //   returns 1: 1
    //   example 2: strcmp( 'owald', 'waldo' )
    //   returns 2: -1
    return ((str1 === str2) ? 0 : ((str1 > str2) ? 1 : -1));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc3RyY21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsSUFBSSxFQUFFLElBQUk7SUFDMUMsOENBQThDO0lBQzlDLDhEQUE4RDtJQUM5RCw0QkFBNEI7SUFDNUIsb0RBQW9EO0lBQ3BELHdCQUF3QjtJQUN4QiwwQ0FBMEM7SUFDMUMsaUJBQWlCO0lBQ2pCLDBDQUEwQztJQUMxQyxrQkFBa0I7SUFFbEIsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3pELENBQUMsQ0FBQSJ9