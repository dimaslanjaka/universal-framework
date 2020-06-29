"use strict";
/**
 * @typdef {Object} PackageInfo
 * @property {string} packageName - the name of the package
 * @property {string} packageVersion - the version of the package
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePackageString = void 0;
/**
 * Parses the given package string into a package name and version
 * @param {string} packageString - a string representing a package name
 *                                 and version (e.g. package@1.0.0)
 * @returns {PackageInfo} - an object containing the package name and package version
 */
function parsePackageString(packageString) {
    // Package scope and package name both can have
    // letters, numbers, dots, hyphens, and underscores.
    // However, they cannot start with dots or underscores
    var packageScopeMatcher = /@[\w\d-]+[\w\d._-]*/;
    var packageNameMatcher = /[\w\d-]+[\w\d._-]*/;
    // The version number may start with a comparator (^, ~, etc) and
    // can contain digits, letters, dots, or dashes (e.g. bootstrap@4.0.0-beta
    // contains all of those characters)
    // Alternatively, it may be a dist tag (e.g. latest, next)
    var packageVersionMatcher = /([\^~v><=]|(>=|<=))?[\d\w.-]+/;
    var packageStringMatcher = new RegExp("((" + packageScopeMatcher.source + ")?/?" +
        ("(" + packageNameMatcher.source + "))(@") +
        ("(" + packageVersionMatcher.source + "))?"));
    var parsed = packageString.match(packageStringMatcher);
    // According to regexper, name is the first capturing
    // group and version is the fifth
    var packageName = parsed[1];
    var packageVersion = parsed[5];
    if (packageVersion === "undefined") {
        packageVersion = "latest";
    }
    return {
        packageName: packageName,
        packageVersion: packageVersion,
    };
}
exports.parsePackageString = parsePackageString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbXBpbGVyL2hlbHBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7O0FBRUg7Ozs7O0dBS0c7QUFDSCxTQUFTLGtCQUFrQixDQUFDLGFBQWE7SUFDdkMsK0NBQStDO0lBQy9DLG9EQUFvRDtJQUNwRCxzREFBc0Q7SUFDdEQsSUFBTSxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FBQztJQUNsRCxJQUFNLGtCQUFrQixHQUFHLG9CQUFvQixDQUFDO0lBQ2hELGlFQUFpRTtJQUNqRSwwRUFBMEU7SUFDMUUsb0NBQW9DO0lBQ3BDLDBEQUEwRDtJQUMxRCxJQUFNLHFCQUFxQixHQUFHLCtCQUErQixDQUFDO0lBQzlELElBQU0sb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQ3JDLE9BQUssbUJBQW1CLENBQUMsTUFBTSxTQUFNO1NBQ25DLE1BQUksa0JBQWtCLENBQUMsTUFBTSxTQUFNLENBQUE7U0FDbkMsTUFBSSxxQkFBcUIsQ0FBQyxNQUFNLFFBQUssQ0FBQSxDQUN4QyxDQUFDO0lBQ0YsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRXpELHFEQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvQixJQUFJLGNBQWMsS0FBSyxXQUFXLEVBQUU7UUFDbEMsY0FBYyxHQUFHLFFBQVEsQ0FBQztLQUMzQjtJQUVELE9BQU87UUFDTCxXQUFXLGFBQUE7UUFDWCxjQUFjLGdCQUFBO0tBQ2YsQ0FBQztBQUNKLENBQUM7QUFHUSxnREFBa0IifQ==