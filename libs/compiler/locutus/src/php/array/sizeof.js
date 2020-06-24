module.exports = function sizeof(mixedVar, mode) {
    //  discuss at: https://locutus.io/php/sizeof/
    // original by: Philip Peterson
    //   example 1: sizeof([[0,0],[0,-4]], 'COUNT_RECURSIVE')
    //   returns 1: 6
    //   example 2: sizeof({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE')
    //   returns 2: 6
    var count = require('../array/count');
    return count(mixedVar, mode);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZW9mLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9hcnJheS9zaXplb2YuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBRSxRQUFRLEVBQUUsSUFBSTtJQUM5Qyw4Q0FBOEM7SUFDOUMsK0JBQStCO0lBQy9CLHlEQUF5RDtJQUN6RCxpQkFBaUI7SUFDakIsZ0VBQWdFO0lBQ2hFLGlCQUFpQjtJQUVqQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUVyQyxPQUFPLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDOUIsQ0FBQyxDQUFBIn0=