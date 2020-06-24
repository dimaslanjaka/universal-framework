module.exports = function isset() {
    //  discuss at: https://locutus.io/php/isset/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: FremyCompany
    // improved by: Onno Marsman (https://twitter.com/onnomarsman)
    // improved by: Rafał Kukawski (https://blog.kukawski.pl)
    //   example 1: isset( undefined, true)
    //   returns 1: false
    //   example 2: isset( 'Kevin van Zonneveld' )
    //   returns 2: true
    var a = arguments;
    var l = a.length;
    var i = 0;
    var undef;
    if (l === 0) {
        throw new Error('Empty isset');
    }
    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pc3NldC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsS0FBSztJQUM3Qiw2Q0FBNkM7SUFDN0Msb0RBQW9EO0lBQ3BELDRCQUE0QjtJQUM1Qiw4REFBOEQ7SUFDOUQseURBQXlEO0lBQ3pELHVDQUF1QztJQUN2QyxxQkFBcUI7SUFDckIsOENBQThDO0lBQzlDLG9CQUFvQjtJQUVwQixJQUFJLENBQUMsR0FBRyxTQUFTLENBQUE7SUFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLEtBQUssQ0FBQTtJQUVULElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUE7S0FDL0I7SUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDZCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQyxPQUFPLEtBQUssQ0FBQTtTQUNiO1FBQ0QsQ0FBQyxFQUFFLENBQUE7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQyxDQUFBIn0=