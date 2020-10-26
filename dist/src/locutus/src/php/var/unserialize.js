module.exports = function unserialize(data) {
    //  discuss at: https://locutus.io/php/unserialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Pedro Tainha (https://www.pedrotainha.com)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Kevin van Zonneveld (https://kvz.io)
    // improved by: Chris
    // improved by: James
    // improved by: Le Torbi
    // improved by: Eli Skeggs
    // bugfixed by: dptr1988
    // bugfixed by: Kevin van Zonneveld (https://kvz.io)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: philippsimon (https://github.com/philippsimon/)
    //  revised by: d3x
    //    input by: Brett Zamir (https://brett-zamir.me)
    //    input by: Martin (https://www.erlenwiese.de/)
    //    input by: kilops
    //    input by: Jaroslaw Czarniak
    //    input by: lovasoa (https://github.com/lovasoa/)
    // improved by: Rafał Kukawski
    //      note 1: We feel the main purpose of this function should be
    //      note 1: to ease the transport of data between php & js
    //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: unserialize('a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}')
    //   returns 1: ['Kevin', 'van', 'Zonneveld']
    //   example 2: unserialize('a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}')
    //   returns 2: {firstName: 'Kevin', midName: 'van'}
    //   example 3: unserialize('a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}')
    //   returns 3: {'ü': 'ü', '四': '四', '𠜎': '𠜎'}
    //   example 4: unserialize(undefined)
    //   returns 4: false
    //   example 5: unserialize('O:8:"stdClass":1:{s:3:"foo";b:1;}')
    //   returns 5: { foo: true }
    var utf8Overhead = function (str) {
        var s = str.length;
        for (var i = str.length - 1; i >= 0; i--) {
            var code = str.charCodeAt(i);
            if (code > 0x7f && code <= 0x7ff) {
                s++;
            }
            else if (code > 0x7ff && code <= 0xffff) {
                s += 2;
            }
            // trail surrogate
            if (code >= 0xDC00 && code <= 0xDFFF) {
                i--;
            }
        }
        return s - 1;
    };
    var readUntil = function (data, offset, stopchr) {
        var i = 2;
        var buf = [];
        var chr = data.slice(offset, offset + 1);
        while (chr !== stopchr) {
            if ((i + offset) > data.length) {
                throw Error('Invalid');
            }
            buf.push(chr);
            chr = data.slice(offset + (i - 1), offset + i);
            i += 1;
        }
        return [buf.length, buf.join('')];
    };
    var readChrs = function (data, offset, length) {
        var i, chr, buf;
        buf = [];
        for (i = 0; i < length; i++) {
            chr = data.slice(offset + (i - 1), offset + i);
            buf.push(chr);
            length -= utf8Overhead(chr);
        }
        return [buf.length, buf.join('')];
    };
    function _unserialize(data, offset) {
        var dtype;
        var dataoffset;
        var keyandchrs;
        var keys;
        var contig;
        var length;
        var array;
        var obj;
        var readdata;
        var readData;
        var ccount;
        var stringlength;
        var i;
        var key;
        var kprops;
        var kchrs;
        var vprops;
        var vchrs;
        var value;
        var chrs = 0;
        var typeconvert = function (x) {
            return x;
        };
        if (!offset) {
            offset = 0;
        }
        dtype = (data.slice(offset, offset + 1));
        dataoffset = offset + 2;
        switch (dtype) {
            case 'i':
                typeconvert = function (x) {
                    return parseInt(x, 10);
                };
                readData = readUntil(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'b':
                typeconvert = function (x) {
                    var value = parseInt(x, 10);
                    switch (value) {
                        case 0:
                            return false;
                        case 1:
                            return true;
                        default:
                            throw SyntaxError('Invalid boolean value');
                    }
                };
                readData = readUntil(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'd':
                typeconvert = function (x) {
                    return parseFloat(x);
                };
                readData = readUntil(data, dataoffset, ';');
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 1;
                break;
            case 'n':
                readdata = null;
                break;
            case 's':
                ccount = readUntil(data, dataoffset, ':');
                chrs = ccount[0];
                stringlength = ccount[1];
                dataoffset += chrs + 2;
                readData = readChrs(data, dataoffset + 1, parseInt(stringlength, 10));
                chrs = readData[0];
                readdata = readData[1];
                dataoffset += chrs + 2;
                if (chrs !== parseInt(stringlength, 10) && chrs !== readdata.length) {
                    throw SyntaxError('String length mismatch');
                }
                break;
            case 'a':
                readdata = {};
                keyandchrs = readUntil(data, dataoffset, ':');
                chrs = keyandchrs[0];
                keys = keyandchrs[1];
                dataoffset += chrs + 2;
                length = parseInt(keys, 10);
                contig = true;
                for (i = 0; i < length; i++) {
                    kprops = _unserialize(data, dataoffset);
                    kchrs = kprops[1];
                    key = kprops[2];
                    dataoffset += kchrs;
                    vprops = _unserialize(data, dataoffset);
                    vchrs = vprops[1];
                    value = vprops[2];
                    dataoffset += vchrs;
                    if (key !== i) {
                        contig = false;
                    }
                    readdata[key] = value;
                }
                if (contig) {
                    array = new Array(length);
                    for (i = 0; i < length; i++) {
                        array[i] = readdata[i];
                    }
                    readdata = array;
                }
                dataoffset += 1;
                break;
            case 'O': {
                // O:<class name length>:"class name":<prop count>:{<props and values>}
                // O:8:"stdClass":2:{s:3:"foo";s:3:"bar";s:3:"bar";s:3:"baz";}
                readData = readUntil(data, dataoffset, ':'); // read class name length
                dataoffset += readData[0] + 1;
                readData = readUntil(data, dataoffset, ':');
                if (readData[1] !== '"stdClass"') {
                    throw Error('Unsupported object type: ' + readData[1]);
                }
                dataoffset += readData[0] + 1; // skip ":"
                readData = readUntil(data, dataoffset, ':');
                keys = parseInt(readData[1], 10);
                dataoffset += readData[0] + 2; // skip ":{"
                obj = {};
                for (i = 0; i < keys; i++) {
                    readData = _unserialize(data, dataoffset);
                    key = readData[2];
                    dataoffset += readData[1];
                    readData = _unserialize(data, dataoffset);
                    dataoffset += readData[1];
                    obj[key] = readData[2];
                }
                dataoffset += 1; // skip "}"
                readdata = obj;
                break;
            }
            default:
                throw SyntaxError('Unknown / Unhandled data type(s): ' + dtype);
        }
        return [dtype, dataoffset - offset, typeconvert(readdata)];
    }
    try {
        if (typeof data !== 'string') {
            return false;
        }
        return _unserialize(data, 0)[2];
    }
    catch (err) {
        console.error(err);
        return false;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zZXJpYWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9saWJzL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL3Vuc2VyaWFsaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxXQUFXLENBQUUsSUFBSTtJQUN6QyxtREFBbUQ7SUFDbkQsZ0RBQWdEO0lBQ2hELDBEQUEwRDtJQUMxRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELHFCQUFxQjtJQUNyQixxQkFBcUI7SUFDckIsd0JBQXdCO0lBQ3hCLDBCQUEwQjtJQUMxQix3QkFBd0I7SUFDeEIsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCwrREFBK0Q7SUFDL0QsbUJBQW1CO0lBQ25CLG9EQUFvRDtJQUNwRCxtREFBbUQ7SUFDbkQsc0JBQXNCO0lBQ3RCLGlDQUFpQztJQUNqQyxxREFBcUQ7SUFDckQsOEJBQThCO0lBQzlCLG1FQUFtRTtJQUNuRSw4REFBOEQ7SUFDOUQsb0ZBQW9GO0lBQ3BGLHVGQUF1RjtJQUN2Riw2Q0FBNkM7SUFDN0MseUZBQXlGO0lBQ3pGLG9EQUFvRDtJQUNwRCx1RkFBdUY7SUFDdkYsZ0RBQWdEO0lBQ2hELHNDQUFzQztJQUN0QyxxQkFBcUI7SUFDckIsZ0VBQWdFO0lBQ2hFLDZCQUE2QjtJQUU3QixJQUFJLFlBQVksR0FBRyxVQUFVLEdBQUc7UUFDOUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssRUFBRTtnQkFD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