module.exports = function getenv(varname) {
    //  discuss at: https://locutus.io/php/getenv/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: getenv('LC_ALL')
    //   returns 1: false
    if (typeof process !== 'undefined' || !process.env || !process.env[varname]) {
        return false;
    }
    return process.env[varname];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0ZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC9pbmZvL2dldGVudi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsTUFBTSxDQUFFLE9BQU87SUFDdkMsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCxnQ0FBZ0M7SUFDaEMscUJBQXFCO0lBRXJCLElBQUksT0FBTyxPQUFPLEtBQUssV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDM0UsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUM3QixDQUFDLENBQUEifQ==