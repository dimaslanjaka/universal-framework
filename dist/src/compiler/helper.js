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
    var packageStringMatcher = new RegExp("((" + packageScopeMatcher.source + ")?/?" + ("(" + packageNameMatcher.source + "))(@") + ("(" + packageVersionMatcher.source + "))?"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbGlicy9zcmMvY29tcGlsZXIvaGVscGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7QUFFSDs7Ozs7R0FLRztBQUNILFNBQVMsa0JBQWtCLENBQUMsYUFBYTtJQUNyQywrQ0FBK0M7SUFDL0Msb0RBQW9EO0lBQ3BELHNEQUFzRDtJQUN0RCxJQUFNLG1CQUFtQixHQUFHLHFCQUFxQixDQUFDO0lBQ2xELElBQU0sa0JBQWtCLEdBQUcsb0JBQW9CLENBQUM7SUFDaEQsaUVBQWlFO0lBQ2pFLDBFQUEwRTtJQUMxRSxvQ0FBb0M7SUFDcEMsMERBQTBEO0lBQzFELElBQU0scUJBQXFCLEdBQUcsK0JBQStCLENBQUM7SUFDOUQsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FDbkMsT0FBSyxtQkFBbUIsQ0FBQyxNQUFNLFNBQU0sSUFBRyxNQUFJLGtCQUFrQixDQUFDLE1BQU0sU0FBTSxDQUFBLElBQUcsTUFBSSxxQkFBcUIsQ0FBQyxNQUFNLFFBQUssQ0FBQSxDQUN0SCxDQUFDO0lBQ0YsSUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBRXpELHFEQUFxRDtJQUNyRCxpQ0FBaUM7SUFDakMsSUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvQixJQUFJLGNBQWMsS0FBSyxXQUFXLEVBQUU7UUFDaEMsY0FBYyxHQUFHLFFBQVEsQ0FBQztLQUM3QjtJQUVELE9BQU87UUFDSCxXQUFXLGFBQUE7UUFDWCxjQUFjLGdCQUFBO0tBQ2pCLENBQUM7QUFDTixDQUFDO0FBR08sZ0RBQWtCIn0=