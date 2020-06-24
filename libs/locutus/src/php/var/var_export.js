module.exports = function var_export(mixedExpression, boolReturn) {
    //  discuss at: https://locutus.io/php/var_export/
    // original by: Philip Peterson
    // improved by: johnrembo
    // improved by: Brett Zamir (https://brett-zamir.me)
    //    input by: Brian Tafoya (https://www.premasolutions.com/)
    //    input by: Hans Henrik (https://hanshenrik.tk/)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: Brett Zamir (https://brett-zamir.me)
    // bugfixed by: simivar (https://github.com/simivar)
    // bugfixed by: simivar (https://github.com/simivar)
    // bugfixed by: simivar (https://github.com/simivar)
    //   example 1: var_export(null)
    //   returns 1: null
    //   example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true)
    //   returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld',\n)"
    //   example 3: var data = 'Kevin'
    //   example 3: var_export(data, true)
    //   returns 3: "'Kevin'"
    //   example 4: var_export({0: 'Kevin', 1: 'van', 'lastName': 'Zonneveld'}, true)
    //   returns 4: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  'lastName' => 'Zonneveld',\n)"
    //   example 5: var_export([], true)
    //   returns 5: "array (\n)"
    //   example 6: var_export({ test: [ 'a', 'b' ] }, true)
    //   returns 6: "array (\n  'test' =>\n  array (\n    0 => 'a',\n    1 => 'b',\n  ),\n)"
    var echo = require('../strings/echo');
    var retstr = '';
    var iret = '';
    var value;
    var cnt = 0;
    var x = [];
    var i = 0;
    var funcParts = [];
    // We use the last argument (not part of PHP) to pass in
    // our indentation level
    var idtLevel = arguments[2] || 2;
    var innerIndent = '';
    var outerIndent = '';
    var getFuncName = function (fn) {
        var name = (/\W*function\s+([\w$]+)\s*\(/).exec(fn);
        if (!name) {
            return '(Anonymous)';
        }
        return name[1];
    };
    var _isNormalInteger = function (string) {
        var number = Math.floor(Number(string));
        return number !== Infinity && String(number) === string && number >= 0;
    };
    var _makeIndent = function (idtLevel) {
        return (new Array(idtLevel + 1))
            .join(' ');
    };
    var __getType = function (inp) {
        var i = 0;
        var match;
        var types;
        var cons;
        var type = typeof inp;
        if (type === 'object' && (inp && inp.constructor) &&
            getFuncName(inp.constructor) === 'LOCUTUS_Resource') {
            return 'resource';
        }
        if (type === 'function') {
            return 'function';
        }
        if (type === 'object' && !inp) {
            // Should this be just null?
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
            for (i = 0; i < types.length; i++) {
                if (cons === types[i]) {
                    type = types[i];
                    break;
                }
            }
        }
        return type;
    };
    var type = __getType(mixedExpression);
    if (type === null) {
        retstr = 'NULL';
    }
    else if (type === 'array' || type === 'object') {
        outerIndent = _makeIndent(idtLevel - 2);
        innerIndent = _makeIndent(idtLevel);
        for (i in mixedExpression) {
            value = ' ';
            var subtype = __getType(mixedExpression[i]);
            if (subtype === 'array' || subtype === 'object') {
                value = '\n';
            }
            value += var_export(mixedExpression[i], 1, idtLevel + 2);
            i = _isNormalInteger(i) ? i : "'" + i + "'";
            x[cnt++] = innerIndent + i + ' =>' + value;
        }
        if (x.length > 0) {
            iret = x.join(',\n') + ',\n';
        }
        retstr = outerIndent + 'array (\n' + iret + outerIndent + ')';
    }
    else if (type === 'function') {
        funcParts = mixedExpression.toString().match(/function .*?\((.*?)\) \{([\s\S]*)\}/);
        // For lambda functions, var_export() outputs such as the following:
        // '\000lambda_1'. Since it will probably not be a common use to
        // expect this (unhelpful) form, we'll use another PHP-exportable
        // construct, create_function() (though dollar signs must be on the
        // variables in JavaScript); if using instead in JavaScript and you
        // are using the namespaced version, note that create_function() will
        // not be available as a global
        retstr = "create_function ('" + funcParts[1] + "', '" +
            funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
    }
    else if (type === 'resource') {
        // Resources treated as null for var_export
        retstr = 'NULL';
    }
    else {
        retstr = typeof mixedExpression !== 'string' ? mixedExpression
            : "'" + mixedExpression.replace(/(["'])/g, '\\$1').replace(/\0/g, '\\0') + "'";
    }
    if (!boolReturn) {
        echo(retstr);
        return null;
    }
    return retstr;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyX2V4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9sb2N1dHVzL3NyYy9waHAvdmFyL3Zhcl9leHBvcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBRSxlQUFlLEVBQUUsVUFBVTtJQUMvRCxrREFBa0Q7SUFDbEQsK0JBQStCO0lBQy9CLHlCQUF5QjtJQUN6QixvREFBb0Q7SUFDcEQsOERBQThEO0lBQzlELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELGdDQUFnQztJQUNoQyxvQkFBb0I7SUFDcEIsd0VBQXdFO0lBQ3hFLGlGQUFpRjtJQUNqRixrQ0FBa0M7SUFDbEMsc0NBQXNDO0lBQ3RDLHlCQUF5QjtJQUN6QixpRkFBaUY7SUFDakYsMEZBQTBGO0lBQzFGLG9DQUFvQztJQUNwQyw0QkFBNEI7SUFDNUIsd0RBQXdEO0lBQ3hELHdGQUF3RjtJQUV4RixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUNyQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFDZixJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7SUFDYixJQUFJLEtBQUssQ0FBQTtJQUNULElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQTtJQUNYLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNULElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNsQix3REFBd0Q7SUFDeEQsd0JBQXdCO0lBQ3hCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO0lBQ3BCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQTtJQUNwQixJQUFJLFdBQVcsR0FBRyxVQUFVLEVBQUU7UUFDNUIsSUFBSSxJQUFJLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxhQUFhLENBQUE7U0FDckI7UUFDRCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNoQixDQUFDLENBQUE7SUFFRCxJQUFJLGdCQUFnQixHQUFHLFVBQVUsTUFBTTtRQUNyQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssTUFBTSxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUE7SUFDeEUsQ0FBQyxDQUFBO0lBRUQsSUFBSSxXQUFXLEdBQUcsVUFBVSxRQUFRO1FBQ2xDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsQ0FBQyxDQUFBO0lBQ0QsSUFBSSxTQUFTLEdBQUcsVUFBVSxHQUFHO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULElBQUksS0FBSyxDQUFBO1FBQ1QsSUFBSSxLQUFLLENBQUE7UUFDVCxJQUFJLElBQUksQ0FBQTtRQUNSLElBQUksSUFBSSxHQUFHLE9BQU8sR0FBRyxDQUFBO1FBQ3JCLElBQUksSUFBSSxLQUFLLFFBQVEsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDO1lBQy9DLFdBQVcsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssa0JBQWtCLEVBQUU7WUFDckQsT0FBTyxVQUFVLENBQUE7U0FDbEI7UUFDRCxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDdkIsT0FBTyxVQUFVLENBQUE7U0FDbEI7UUFDRCxJQUFJLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDN0IsNEJBQTRCO1lBQzVCLE9BQU8sTUFBTSxDQUFBO1NBQ2Q7UUFDRCxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLE9BQU8sUUFBUSxDQUFBO2FBQ2hCO1lBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDakMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDN0IsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQTthQUM5QjtZQUNELEtBQUssR0FBRyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ2hELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDakMsSUFBSSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNyQixJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNmLE1BQUs7aUJBQ047YUFDRjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDLENBQUE7SUFDRCxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFckMsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2pCLE1BQU0sR0FBRyxNQUFNLENBQUE7S0FDaEI7U0FBTSxJQUFJLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNoRCxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUN2QyxXQUFXLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ25DLEtBQUssQ0FBQyxJQUFJLGVBQWUsRUFBRTtZQUN6QixLQUFLLEdBQUcsR0FBRyxDQUFBO1lBQ1gsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNDLElBQUksT0FBTyxLQUFLLE9BQU8sSUFBSSxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMvQyxLQUFLLEdBQUcsSUFBSSxDQUFBO2FBQ2I7WUFDRCxLQUFLLElBQUksVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQ3hELENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFJLENBQUMsTUFBRyxDQUFBO1lBQ3RDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFdBQVcsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQTtTQUMzQztRQUNELElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEIsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFBO1NBQzdCO1FBQ0QsTUFBTSxHQUFHLFdBQVcsR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUE7S0FDOUQ7U0FBTSxJQUFJLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDOUIsU0FBUyxHQUFHLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQTtRQUVuRixvRUFBb0U7UUFDcEUsZ0VBQWdFO1FBQ2hFLGlFQUFpRTtRQUNqRSxtRUFBbUU7UUFDbkUsbUVBQW1FO1FBQ25FLHFFQUFxRTtRQUNyRSwrQkFBK0I7UUFDL0IsTUFBTSxHQUFHLG9CQUFvQixHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNO1lBQ25ELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQTtLQUMzRDtTQUFNLElBQUksSUFBSSxLQUFLLFVBQVUsRUFBRTtRQUM5QiwyQ0FBMkM7UUFDM0MsTUFBTSxHQUFHLE1BQU0sQ0FBQTtLQUNoQjtTQUFNO1FBQ0wsTUFBTSxHQUFHLE9BQU8sZUFBZSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsZUFBZTtZQUM1RCxDQUFDLENBQUMsR0FBRyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFBO0tBQ2pGO0lBRUQsSUFBSSxDQUFDLFVBQVUsRUFBRTtRQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNaLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9