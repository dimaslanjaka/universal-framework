/**
 * @type {Storage}
 */
var LocalStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    LocalStorage = require("./dist/LocalStorage").LocalStorage;
    //var LocalStorage = require('node-localstorage').LocalStorage;
    if (typeof global != "undefined") {
        global.localStorage = new LocalStorage("./tmp/storage");
    }
    else {
        var localStorage_1 = new LocalStorage("./tmp/storage");
    }
}
module.exports.localStorage = localStorage;
module.exports.LocalStorage = LocalStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9ub2RlLWxvY2Fsc3RvcmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILElBQUksWUFBWSxDQUFDO0FBRWpCLElBQUksT0FBTyxZQUFZLEtBQUssV0FBVyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7SUFDaEUsOERBQThEO0lBQzlELFlBQVksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxZQUFZLENBQUM7SUFDM0QsK0RBQStEO0lBQy9ELElBQUksT0FBTyxNQUFNLElBQUksV0FBVyxFQUFFO1FBQ2hDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDekQ7U0FBTTtRQUNMLElBQU0sY0FBWSxHQUFHLElBQUksWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ3hEO0NBQ0Y7QUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDIn0=