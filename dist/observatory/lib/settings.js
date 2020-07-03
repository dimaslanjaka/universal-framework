'use strict';
var constants = require('./constants');
var _ = require('lodash');
var settings = {};
function setSettings(options) {
    if (!options) {
        return _.merge(constants.defaultSettings, {});
    }
    return _.merge(settings, options);
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
    formatStatus: formatStatus
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9vYnNlcnZhdG9yeS9saWIvc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDO0FBRWIsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUxQixJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFFbEIsU0FBUyxXQUFXLENBQUMsT0FBTztJQUV4QixJQUFJLENBQUMsT0FBTyxFQUFFO1FBQ1YsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDakQ7SUFFRCxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxTQUFTLEtBQUs7SUFDVixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUM7QUFDMUIsQ0FBQztBQUVELFNBQVMsTUFBTTtJQUNYLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUMzQixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsSUFBSTtJQUNmLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUUsV0FBVyxFQUFFLEtBQUs7SUFDckMsT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBR0QsUUFBUSxHQUFHLFdBQVcsRUFBRSxDQUFDO0FBRXpCLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDYixXQUFXLEVBQUUsV0FBVztJQUN4QixLQUFLLEVBQUUsS0FBSztJQUNaLE1BQU0sRUFBRSxNQUFNO0lBQ2QsS0FBSyxFQUFFLEtBQUs7SUFDWixZQUFZLEVBQUUsWUFBWTtDQUM3QixDQUFDIn0=