module.exports = function quotemeta(str) {
    //  discuss at: https://locutus.io/php/quotemeta/
    // original by: Paulo Freitas
    //   example 1: quotemeta(". + * ? ^ ( $ )")
    //   returns 1: '\\. \\+ \\* \\? \\^ \\( \\$ \\)'
    return (str + '')
        .replace(/([.\\+*?[^\]$()])/g, '\\$1');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGVtZXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3MvcXVvdGVtZXRhLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsR0FBRztJQUN0QyxpREFBaUQ7SUFDakQsNkJBQTZCO0lBQzdCLDRDQUE0QztJQUM1QyxpREFBaUQ7SUFFakQsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7U0FDZCxPQUFPLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxDQUFDLENBQUE7QUFDMUMsQ0FBQyxDQUFBIn0=