module.exports = function array_replace_recursive(arr) {
    //  discuss at: https://locutus.io/php/array_replace_recursive/
    // original by: Brett Zamir (https://brett-zamir.me)
    //   example 1: array_replace_recursive({'citrus' : ['orange'], 'berries' : ['blackberry', 'raspberry']}, {'citrus' : ['pineapple'], 'berries' : ['blueberry']})
    //   returns 1: {citrus : ['pineapple'], berries : ['blueberry', 'raspberry']}
    var i = 0;
    var p = '';
    var argl = arguments.length;
    var retObj;
    if (argl < 2) {
        throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
    }
    // Although docs state that the arguments are passed in by reference,
    // it seems they are not altered, but rather the copy that is returned
    // So we make a copy here, instead of acting on arr itself
    if (Object.prototype.toString.call(arr) === '[object Array]') {
        retObj = [];
        for (p in arr) {
            retObj.push(arr[p]);
        }
    }
    else {
        retObj = {};
        for (p in arr) {
            retObj[p] = arr[p];
        }
    }
    for (i = 1; i < argl; i++) {
        for (p in arguments[i]) {
            if (retObj[p] && typeof retObj[p] === 'object') {
                retObj[p] = array_replace_recursive(retObj[p], arguments[i][p]);
            }
            else {
                retObj[p] = arguments[i][p];
            }
        }
    }
    return retObj;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlfcmVwbGFjZV9yZWN1cnNpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvbG9jdXR1cy9zcmMvcGhwL2FycmF5L2FycmF5X3JlcGxhY2VfcmVjdXJzaXZlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyx1QkFBdUIsQ0FBRSxHQUFHO0lBQ3BELCtEQUErRDtJQUMvRCxvREFBb0Q7SUFDcEQsZ0tBQWdLO0lBQ2hLLDhFQUE4RTtJQUU5RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDVCxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksTUFBTSxDQUFBO0lBRVYsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywwRUFBMEUsQ0FBQyxDQUFBO0tBQzVGO0lBRUQscUVBQXFFO0lBQ3JFLHNFQUFzRTtJQUN0RSwwREFBMEQ7SUFDMUQsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZ0JBQWdCLEVBQUU7UUFDNUQsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNYLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDcEI7S0FDRjtTQUFNO1FBQ0wsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNYLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRTtZQUNiLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDbkI7S0FDRjtJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pCLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7Z0JBQzlDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDaEU7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUM1QjtTQUNGO0tBQ0Y7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQSJ9