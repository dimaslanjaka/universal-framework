module.exports = function quotemeta(str) {
    //  discuss at: https://locutus.io/php/quotemeta/
    // original by: Paulo Freitas
    //   example 1: quotemeta(". + * ? ^ ( $ )")
    //   returns 1: '\\. \\+ \\* \\? \\^ \\( \\$ \\)'
    return (str + '')
        .replace(/([.\\+*?[^\]$()])/g, '\\$1');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGVtZXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9zdHJpbmdzL3F1b3RlbWV0YS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsU0FBUyxDQUFFLEdBQUc7SUFDdEMsaURBQWlEO0lBQ2pELDZCQUE2QjtJQUM3Qiw0Q0FBNEM7SUFDNUMsaURBQWlEO0lBRWpELE9BQU8sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1NBQ2QsT0FBTyxDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQzFDLENBQUMsQ0FBQSJ9