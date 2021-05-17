"use strict";
var tslib_1 = require("tslib");
var constants_1 = tslib_1.__importDefault(require("./constants"));
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var settings = constants_1.default.defaultSettings;
function setSettings(options) {
    if (!options) {
        return lodash_1.default.merge(constants_1.default.defaultSettings, {});
    }
    return lodash_1.default.merge(settings, options);
}
function width() {
    return settings.width;
}
function prefix() {
    return settings.prefix;
}
function write(text) {
    return settings.write(text);
}
function formatStatus(statusLabel, state) {
    return settings.formatStatus(statusLabel, state);
}
settings = setSettings();
module.exports = {
    setSettings: setSettings,
    width: width,
    prefix: prefix,
    write: write,
    formatStatus: formatStatus,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9saWJzL3NyYy9vYnNlcnZhdG9yeS90cy9zZXR0aW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7O0FBRWIsa0VBQW9DO0FBQ3BDLDBEQUF1QjtBQUV2QixJQUFJLFFBQVEsR0FBRyxtQkFBUyxDQUFDLGVBQWUsQ0FBQztBQUV6QyxTQUFTLFdBQVcsQ0FBQyxPQUFhO0lBQ2hDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDWixPQUFPLGdCQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFTLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQy9DO0lBRUQsT0FBTyxnQkFBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUVELFNBQVMsS0FBSztJQUNaLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxNQUFNO0lBQ2IsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQ3pCLENBQUM7QUFFRCxTQUFTLEtBQUssQ0FBQyxJQUFJO0lBQ2pCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUs7SUFDdEMsT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBRUQsUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFDO0FBRXpCLGlCQUFTO0lBQ1AsV0FBVyxFQUFFLFdBQVc7SUFDeEIsS0FBSyxFQUFFLEtBQUs7SUFDWixNQUFNLEVBQUUsTUFBTTtJQUNkLEtBQUssRUFBRSxLQUFLO0lBQ1osWUFBWSxFQUFFLFlBQVk7Q0FDM0IsQ0FBQyJ9