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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFyX2V4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYnMvc3JjL2xvY3V0dXMvc3JjL3BocC92YXIvdmFyX2V4cG9ydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFFLGVBQWUsRUFBRSxVQUFVO0lBQy9ELGtEQUFrRDtJQUNsRCwrQkFBK0I7SUFDL0IseUJBQXlCO0lBQ3pCLG9EQUFvRDtJQUNwRCw4REFBOEQ7SUFDOUQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsb0RBQW9EO0lBQ3BELG9EQUFvRDtJQUNwRCxvREFBb0Q7SUFDcEQsZ0NBQWdDO0lBQ2hDLG9CQUFvQjtJQUNwQix3RUFBd0U7SUFDeEUsaUZBQWlGO0lBQ2pGLGtDQUFrQztJQUNsQyxzQ0FBc0M7SUFDdEMseUJBQXlCO0lBQ3pCLGlGQUFpRjtJQUNqRiwwRkFBMEY7SUFDMUYsb0NBQW9DO0lBQ3BDLDRCQUE0QjtJQUM1Qix3REFBd0Q7SUFDeEQsd0ZBQXdGO0lBRXhGLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQ3JDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLElBQUksS0FBSyxDQUFBO0lBQ1QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFBO0lBQ1gsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO0lBQ1YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ1QsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ2xCLHdEQUF3RDtJQUN4RCx3QkFBd0I7SUFDeEIsSUFBSSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7SUFDcEIsSUFBSSxXQUFXLEdBQUcsRUFB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