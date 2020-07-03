module.exports = function hexdec(hexString) {
    //  discuss at: https://locutus.io/php/hexdec/
    // original by: Philippe Baumann
    //   example 1: hexdec('that')
    //   returns 1: 10
    //   example 2: hexdec('a0')
    //   returns 2: 160
    hexString = (hexString + '').replace(/[^a-f0-9]/gi, '');
    return parseInt(hexString, 16);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGV4ZGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL21hdGgvaGV4ZGVjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxNQUFNLENBQUUsU0FBUztJQUN6Qyw4Q0FBOEM7SUFDOUMsZ0NBQWdDO0lBQ2hDLDhCQUE4QjtJQUM5QixrQkFBa0I7SUFDbEIsNEJBQTRCO0lBQzVCLG1CQUFtQjtJQUVuQixTQUFTLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RCxPQUFPLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDaEMsQ0FBQyxDQUFBIn0=