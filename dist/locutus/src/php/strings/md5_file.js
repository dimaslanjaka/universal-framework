module.exports = function md5_file(str_filename) {
    //  discuss at: https://locutus.io/php/md5_file/
    // original by: Kevin van Zonneveld (https://kvz.io)
    //    input by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    //      note 1: Relies on file_get_contents which does not work in the browser, so Node only.
    //      note 2: Keep in mind that in accordance with PHP, the whole file is buffered and then
    //      note 2: hashed. We'd recommend Node's native crypto modules for faster and more
    //      note 2: efficient hashing
    //   example 1: md5_file('test/never-change.txt')
    //   returns 1: 'bc3aa724b0ec7dce4c26e7f4d0d9b064'
    var fileGetContents = require('../filesystem/file_get_contents');
    var md5 = require('../strings/md5');
    var buf = fileGetContents(str_filename);
    if (buf === false) {
        return false;
    }
    return md5(buf);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWQ1X2ZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvc3RyaW5ncy9tZDVfZmlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxDQUFFLFlBQVk7SUFDOUMsZ0RBQWdEO0lBQ2hELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsdUZBQXVGO0lBQ3ZGLGlDQUFpQztJQUNqQyxpREFBaUQ7SUFDakQsa0RBQWtEO0lBRWxELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO0lBQ2hFLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ25DLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUV2QyxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7UUFDakIsT0FBTyxLQUFLLENBQUE7S0FDYjtJQUVELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQSJ9