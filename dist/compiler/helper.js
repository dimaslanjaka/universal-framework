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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvaGVscGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7QUFFSDs7Ozs7R0FLRztBQUNILFNBQVMsa0JBQWtCLENBQUMsYUFBYTtJQUN2QywrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELHNEQUFzRDtJQUN0RCxJQUFNLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ2xELElBQU0sa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDaEQsaUVBQWlFO0lBQ2pFLDBFQUEwRTtJQUMxRSxvQ0FBb0M7SUFDcEMsMERBQTBEO0lBQzFELElBQU0scUJBQXFCLEdBQUcsK0JBQStCLENBQUM7SUFDOUQsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FDckMsT0FBSyxtQkFBbUIsQ0FBQyxNQUFNLFNBQU07U0FDbkMsTUFBSSxrQkFBa0IsQ0FBQyxNQUFNLFNBQU0sQ0FBQTtTQUNuQyxNQUFJLHFCQUFxQixDQUFDLE1BQU0sUUFBSyxDQUFBLENBQ3hDLENBQUM7SUFDRixJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFFekQscURBQXFEO0lBQ3JELGlDQUFpQztJQUNqQyxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsSUFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9CLElBQUksY0FBYyxLQUFLLFdBQVcsRUFBRTtRQUNsQyxjQUFjLEdBQUcsUUFBUSxDQUFDO0tBQzNCO0lBRUQsT0FBTztRQUNMLFdBQVcsYUFBQTtRQUNYLGNBQWMsZ0JBQUE7S0FDZixDQUFDO0FBQ0osQ0FBQztBQUdRLGdEQUFrQiJ9