module.exports = function basename(path, suffix) {
    //  discuss at: https://locutus.io/php/basename/
    // original by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Ash Searle (https://hexmen.com/blog/)
    // improved by: Lincoln Ramsay
    // improved by: djmix
    // improved by: Dmitry Gorelenkov
    //   example 1: basename('/www/site/home.htm', '.htm')
    //   returns 1: 'home'
    //   example 2: basename('ecra.php?p=1')
    //   returns 2: 'ecra.php?p=1'
    //   example 3: basename('/some/path/')
    //   returns 3: 'path'
    //   example 4: basename('/some/path_ext.ext/','.ext')
    //   returns 4: 'path_ext'
    var b = path;
    var lastChar = b.charAt(b.length - 1);
    if (lastChar === '/' || lastChar === '\\') {
        b = b.slice(0, -1);
    }
    b = b.replace(/^.*[/\\]/g, '');
    if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
        b = b.substr(0, b.length - suffix.length);
    }
    return b;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2ZpbGVzeXN0ZW0vYmFzZW5hbWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFFBQVEsQ0FBRSxJQUFJLEVBQUUsTUFBTTtJQUM5QyxnREFBZ0Q7SUFDaEQsb0RBQW9EO0lBQ3BELHFEQUFxRDtJQUNyRCw4QkFBOEI7SUFDOUIscUJBQXFCO0lBQ3JCLGlDQUFpQztJQUNqQyxzREFBc0Q7SUFDdEQsc0JBQXNCO0lBQ3RCLHdDQUF3QztJQUN4Qyw4QkFBOEI7SUFDOUIsdUNBQXVDO0lBQ3ZDLHNCQUFzQjtJQUN0QixzREFBc0Q7SUFDdEQsMEJBQTBCO0lBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtJQUNaLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUVyQyxJQUFJLFFBQVEsS0FBSyxHQUFHLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtRQUN6QyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQjtJQUVELENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUU5QixJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLE1BQU0sRUFBRTtRQUMvRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDMUM7SUFFRCxPQUFPLENBQUMsQ0FBQTtBQUNWLENBQUMsQ0FBQSJ9