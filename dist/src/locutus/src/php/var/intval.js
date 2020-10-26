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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50dmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3Zhci9pbnR2YWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxRQUFRLEVBQUUsSUFBSTtJQUM5Qyw4Q0FBOEM7SUFDOUMsb0RBQW9EO0lBQ3BELHNCQUFzQjtJQUN0QixvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHlEQUF5RDtJQUN6RCxzQkFBc0I7SUFDdEIsNkNBQTZDO0lBQzdDLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0IsaUJBQWlCO0lBQ2pCLDZCQUE2QjtJQUM3QixrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLGlCQUFpQjtJQUNqQixnQ0FBZ0M7SUFDaEMsa0JBQWtCO0lBQ2xCLG1DQUFtQztJQUNuQywwQkFBMEI7SUFDMUIsaUNBQWlDO0lBQ2pDLG1CQUFtQjtJQUNuQixnQ0FBZ0M7SUFDaEMsaUJBQWlCO0lBRWpCLElBQUksR0FBRyxFQUFFLEtBQUssQ0FBQTtJQUVkLElBQUksSUFBSSxHQUFHLE9BQU8sUUFBUSxDQUFBO0lBRTFCLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixPQUFPLENBQUMsUUFBUSxDQUFBO0tBQ2pCO1NBQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLElBQUksSUFBSSxLQUFLLENBQUMsRUFBRTtZQUNkLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO1lBQ3BDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7U0FDeEM7UUFDRCxHQUFHLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUE7UUFDcEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQTtLQUNoRDtTQUFNLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbEQsT0FBTyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ2pFO1NBQU07UUFDTCxPQUFPLENBQUMsQ0FBQTtLQUNUO0FBQ0gsQ0FBQyxDQUFBIn0=