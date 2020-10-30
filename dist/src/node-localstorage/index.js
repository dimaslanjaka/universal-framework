if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("./LocalStorage").LocalStorage;
    //var LocalStorage = require('node-localstorage').LocalStorage;
    if (typeof global != "undefined") {
        global.localStorage = new LocalStorage("./tmp/storage");
    }
    else {
        var localStorage_1 = new LocalStorage("./tmp/storage");
    }
}
module.exports.localStorage = localStorage;
module.exports.LocalStorage = this.LocalStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9ub2RlLWxvY2Fsc3RvcmFnZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO0lBQ2hFLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUM1RCwrREFBK0Q7SUFDL0QsSUFBSSxPQUFPLE1BQU0sSUFBSSxXQUFXLEVBQUU7UUFDaEMsTUFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztLQUN6RDtTQUFNO1FBQ0wsSUFBTSxjQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLENBQUM7S0FDeEQ7Q0FDRjtBQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUMzQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDIn0=