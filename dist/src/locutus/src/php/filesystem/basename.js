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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvZmlsZXN5c3RlbS9iYXNlbmFtZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLElBQUksRUFBRSxNQUFNO0lBQzlDLGdEQUFnRDtJQUNoRCxvREFBb0Q7SUFDcEQscURBQXFEO0lBQ3JELDhCQUE4QjtJQUM5QixxQkFBcUI7SUFDckIsaUNBQWlDO0lBQ2pDLHNEQUFzRDtJQUN0RCxzQkFBc0I7SUFDdEIsd0NBQXdDO0lBQ3hDLDhCQUE4QjtJQUM5Qix1Q0FBdUM7SUFDdkMsc0JBQXNCO0lBQ3RCLHNEQUFzRDtJQUN0RCwwQkFBMEI7SUFFMUIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO0lBQ1osSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBRXJDLElBQUksUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1FBQ3pDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25CO0lBRUQsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBRTlCLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQy9FLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUMxQztJQUVELE9BQU8sQ0FBQyxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=