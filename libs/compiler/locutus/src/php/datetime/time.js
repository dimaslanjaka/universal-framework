module.exports = function time() {
    //  discuss at: https://locutus.io/php/time/
    // original by: GeekFG (https://geekfg.blogspot.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: metjay
    // improved by: HKM
    //   example 1: var $timeStamp = time()
    //   example 1: var $result = $timeStamp > 1000000000 && $timeStamp < 2000000000
    //   returns 1: true
    return Math.floor(new Date().getTime() / 1000);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvZGF0ZXRpbWUvdGltZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsSUFBSTtJQUM1Qiw0Q0FBNEM7SUFDNUMsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVDQUF1QztJQUN2QyxnRkFBZ0Y7SUFDaEYsb0JBQW9CO0lBRXBCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQ2hELENBQUMsQ0FBQSJ9