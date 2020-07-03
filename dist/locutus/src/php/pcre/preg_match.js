module.exports = function preg_match(regex, str) {
    //   original by: Muhammad Humayun (https://github.com/ronypt)
    //   example 1: preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "rony@pharaohtools.com")
    //   returns 1: true
    //   example 2: preg_match("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$", "ronypharaohtools.com")
    //   returns 2: false
    return (new RegExp(regex).test(str));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZ19tYXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC9wY3JlL3ByZWdfbWF0Y2guanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxLQUFLLEVBQUUsR0FBRztJQUM5Qyw4REFBOEQ7SUFDOUQsdUdBQXVHO0lBQ3ZHLG9CQUFvQjtJQUNwQixzR0FBc0c7SUFDdEcscUJBQXFCO0lBQ3JCLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtBQUN0QyxDQUFDLENBQUEifQ==