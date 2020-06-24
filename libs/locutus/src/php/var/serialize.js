module.exports = function serialize(mixedValue) {
    //  discuss at: https://locutus.io/php/serialize/
    // original by: Arpad Ray (mailto:arpad@php.net)
    // improved by: Dino
    // improved by: Le Torbi (https://www.letorbi.de/)
    // improved by: Kevin van Zonneveld (https://kvz.io/)
    // bugfixed by: Andrej Pavlovic
    // bugfixed by: Garagoth
    // bugfixed by: Russell Walker (https://www.nbill.co.uk/)
    // bugfixed by: Jamie Beck (https://www.terabit.ca/)
    // bugfixed by: Kevin van Zonneveld (https://kvz.io/)
    // bugfixed by: Ben (https://benblume.co.uk/)
    // bugfixed by: Codestar (https://codestarlive.com/)
    // bugfixed by: idjem (https://github.com/idjem)
    //    input by: DtTvB (https://dt.in.th/2008-09-16.string-length-in-bytes.html)
    //    input by: Martin (https://www.erlenwiese.de/)
    //      note 1: We feel the main purpose of this function should be to ease
    //      note 1: the transport of data between php & js
    //      note 1: Aiming for PHP-compatibility, we have to translate objects to arrays
    //   example 1: serialize(['Kevin', 'van', 'Zonneveld'])
    //   returns 1: 'a:3:{i:0;s:5:"Kevin";i:1;s:3:"van";i:2;s:9:"Zonneveld";}'
    //   example 2: serialize({firstName: 'Kevin', midName: 'van'})
    //   returns 2: 'a:2:{s:9:"firstName";s:5:"Kevin";s:7:"midName";s:3:"van";}'
    //   example 3: serialize( {'ü': 'ü', '四': '四', '𠜎': '𠜎'})
    //   returns 3: 'a:3:{s:2:"ü";s:2:"ü";s:3:"四";s:3:"四";s:4:"𠜎";s:4:"𠜎";}'
    var val, key, okey;
    var ktype = '';
    var vals = '';
    var count = 0;
    var _utf8Size = function (str) {
        return ~-encodeURI(str).split(/%..|./).length;
    };
    var _getType = function (inp) {
        var match;
        var key;
        var cons;
        var types;
        var type = typeof inp;
        if (type === 'object' && !inp) {
            return 'null';
        }
        if (type === 'object') {
            if (!inp.constructor) {
                return 'object';
            }
            cons = inp.constructor.toString();
            match = cons.match(/(\w+)\(/);
            if (match) {
                cons = match[1].toLowerCase();
            }
            types = ['boolean', 'number', 'string', 'array'];
            for (key in types) {
                if (cons === types[key]) {
                    type = types[key];
                    break;
                }
            }
        }
        return type;
    };
    var type = _getType(mixedValue);
    switch (type) {
        case 'function':
            val = '';
            break;
        case 'boolean':
            val = 'b:' + (mixedValue ? '1' : '0');
            break;
        case 'number':
            val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue;
            break;
        case 'string':
            val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"';
            break;
        case 'array':
        case 'object':
            val = 'a';
            /*
            if (type === 'object') {
              var objname = mixedValue.constructor.toString().match(/(\w+)\(\)/);
              if (objname === undefined) {
                return;
              }
              objname[1] = serialize(objname[1]);
              val = 'O' + objname[1].substring(1, objname[1].length - 1);
            }
            */
            for (key in mixedValue) {
                if (mixedValue.hasOwnProperty(key)) {
                    ktype = _getType(mixedValue[key]);
                    if (ktype === 'function') {
                        continue;
                    }
                    okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
                    vals += serialize(okey) + serialize(mixedValue[key]);
                    count++;
                }
            }
            val += ':' + count + ':{' + vals + '}';
            break;
        case 'undefined':
        default:
            // Fall-through
            // if the JS object has a property which contains a null value,
            // the string cannot be unserialized by PHP
            val = 'N';
            break;
    }
    if (type !== 'object' && type !== 'array') {
        val += ';';
    }
    return val;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvc2VyaWFsaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxTQUFTLENBQUUsVUFBVTtJQUM3QyxpREFBaUQ7SUFDakQsZ0RBQWdEO0lBQ2hELG9CQUFvQjtJQUNwQixrREFBa0Q7SUFDbEQscURBQXFEO0lBQ3JELCtCQUErQjtJQUMvQix3QkFBd0I7SUFDeEIseURBQXlEO0lBQ3pELG9EQUFvRDtJQUNwRCxxREFBcUQ7SUFDckQsNkNBQTZDO0lBQzdDLG9EQUFvRDtJQUNwRCxnREFBZ0Q7SUFDaEQsK0VBQStFO0lBQy9FLG1EQUFtRDtJQUNuRCwyRUFBMkU7SUFDM0Usc0RBQXNEO0lBQ3RELG9GQUFvRjtJQUNwRix3REFBd0Q7SUFDeEQsMEVBQTBFO0lBQzFFLCtEQUErRDtJQUMvRCw0RUFBNEU7SUFDNUUsNERBQTREO0lBQzVELDBFQUEwRTtJQUUxRSxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFBO0lBQ2xCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQTtJQUNkLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtJQUViLElBQUksU0FBUyxHQUFHLFVBQVUsR0FBRztRQUMzQixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQTtJQUMvQyxDQUFDLENBQUE7SUFFRCxJQUFJLFFBQVEsR0FBRyxVQUFVLEdBQUc7UUFDMUIsSUFBSSxLQUFLLENBQUE7UUFDVCxJQUFJLEdBQUcsQ0FBQTtRQUNQLElBQUksSUFBSSxDQUFBO1FBQ1IsSUFBSSxLQUFLLENBQUE7UUFDVCxJQUFJLElBQUksR0FBRyxPQUFPLEdBQUcsQ0FBQTtR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