module.exports = function intval(mixedVar, base) {
    //  discuss at: https://locutus.io/php/intval/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: stensi
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Rafał Kukawski (https://blog.kukawski.pl)
    //    input by: Matteo
    //   example 1: intval('Kevin van Zonneveld')
    //   returns 1: 0
    //   example 2: intval(4.2)
    //   returns 2: 4
    //   example 3: intval(42, 8)
    //   returns 3: 42
    //   example 4: intval('09')
    //   returns 4: 9
    //   example 5: intval('1e', 16)
    //   returns 5: 30
    //   example 6: intval(0x200000001)
    //   returns 6: 8589934593
    //   example 7: intval('0xff', 0)
    //   returns 7: 255
    //   example 8: intval('010', 0)
    //   returns 8: 8
    var tmp, match;
    var type = typeof mixedVar;
    if (type === 'boolean') {
        return +mixedVar;
    }
    else if (type === 'string') {
        if (base === 0) {
            match = mixedVar.match(/^\s*0(x?)/i);
            base = match ? (match[1] ? 16 : 8) : 10;
        }
        tmp = parseInt(mixedVar, base || 10);
        return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
    }
    else if (type === 'number' && isFinite(mixedVar)) {
        return mixedVar < 0 ? Math.ceil(mixedVar) : Math.floor(mixedVar);
    }
    else {
        return 0;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50dmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvaW50dmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsUUFBUSxFQUFFLElBQUk7SUFDOUMsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCxzQkFBc0I7SUFDdEIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCx5REFBeUQ7SUFDekQsc0JBQXNCO0lBQ3RCLDZDQUE2QztJQUM3QyxpQkFBaUI7SUFDakIsMkJBQTJCO0lBQzNCLGlCQUFpQjtJQUNqQiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLDRCQUE0QjtJQUM1QixpQkFBaUI7SUFDakIsZ0NBQWdDO0lBQ2hDLGtCQUFrQjtJQUNsQixtQ0FBbUM7SUFDbkMsMEJBQTBCO0lBQzFCLGlDQUFpQztJQUNqQyxtQkFBbUI7SUFDbkIsZ0NBQWdDO0lBQ2hDLGlCQUFpQjtJQUVqQixJQUFJLEdBQUcsRUFBRSxLQUFLLENBQUE7SUFFZCxJQUFJLElBQUksR0FBRyxPQUFPLFFBQVEsQ0FBQTtJQUUxQixJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDdEIsT0FBTyxDQUFDLFFBQVEsQ0FBQTtLQUNqQjtTQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixJQUFJLElBQUksS0FBSyxDQUFDLEVBQUU7WUFDZCxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUNwQyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO1NBQ3hDO1FBQ0QsR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUE7S0FDaEQ7U0FBTSxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2xELE9BQU8sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUNqRTtTQUFNO1FBQ0wsT0FBTyxDQUFDLENBQUE7S0FDVDtBQUNILENBQUMsQ0FBQSJ9