module.exports = function sha1_file(str_filename) {
    //  discuss at: https://locutus.io/php/sha1_file/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Relies on file_get_contents which does not work in the browser, so Node only.
    //      note 2: Keep in mind that in accordance with PHP, the whole file is buffered and then
    //      note 2: hashed. We'd recommend Node's native crypto modules for faster and more
    //      note 2: efficient hashing
    //   example 1: sha1_file('test/never-change.txt')
    //   returns 1: '0ea65a1f4b4d69712affc58240932f3eb8a2af66'
    var fileGetContents = require('../filesystem/file_get_contents');
    var sha1 = require('../strings/sha1');
    var buf = fileGetContents(str_filename);
    if (buf === false) {
        return false;
    }
    return sha1(buf);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhMV9maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbGlicy9zcmMvbG9jdXR1cy9zcmMvcGhwL3N0cmluZ3Mvc2hhMV9maWxlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsWUFBWTtJQUMvQyxpREFBaUQ7SUFDakQsb0RBQW9EO0lBQ3BELDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsdUZBQXVGO0lBQ3ZGLGlDQUFpQztJQUNqQyxrREFBa0Q7SUFDbEQsMERBQTBEO0lBRTFELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO0lBQ2hFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3JDLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUV2QyxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7UUFDakIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2xCLENBQUMsQ0FBQSJ9