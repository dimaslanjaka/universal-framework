module.exports = function strchr(haystack, needle, bool) {
    //  discuss at: https://locutus.io/php/strchr/
    // original by: Philip Peterson
    //   example 1: strchr('Kevin van Zonneveld', 'van')
    //   returns 1: 'van Zonneveld'
    //   example 2: strchr('Kevin van Zonneveld', 'van', true)
    //   returns 2: 'Kevin '
    var strstr = require('../strings/strstr');
    return strstr(haystack, needle, bool);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY2hyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmNoci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSTtJQUN0RCw4Q0FBOEM7SUFDOUMsK0JBQStCO0lBQy9CLG9EQUFvRDtJQUNwRCwrQkFBK0I7SUFDL0IsMERBQTBEO0lBQzFELHdCQUF3QjtJQUV4QixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtJQUN6QyxPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3ZDLENBQUMsQ0FBQSJ9