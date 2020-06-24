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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyY21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3N0cmNtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLElBQUksRUFBRSxJQUFJO0lBQzFDLDhDQUE4QztJQUM5Qyw4REFBOEQ7SUFDOUQsNEJBQTRCO0lBQzVCLG9EQUFvRDtJQUNwRCx3QkFBd0I7SUFDeEIsMENBQTBDO0lBQzFDLGlCQUFpQjtJQUNqQiwwQ0FBMEM7SUFDMUMsa0JBQWtCO0lBRWxCLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN6RCxDQUFDLENBQUEifQ==