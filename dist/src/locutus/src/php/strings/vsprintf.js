module.exports = function vsprintf(format, args) {
    //  discuss at: https://locutus.io/php/vsprintf/
    // original by: ejsanders
    //   example 1: vsprintf('%04d-%02d-%02d', [1988, 8, 1])
    //   returns 1: '1988-08-01'
    var sprintf = require('../strings/sprintf');
    return sprintf.apply(this, [format].concat(args));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnNwcmludGYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy92c3ByaW50Zi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLE1BQU0sRUFBRSxJQUFJO0lBQzlDLGdEQUFnRDtJQUNoRCx5QkFBeUI7SUFDekIsd0RBQXdEO0lBQ3hELDRCQUE0QjtJQUU1QixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUUzQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDbkQsQ0FBQyxDQUFBIn0=