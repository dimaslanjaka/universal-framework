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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2JzZXJ2YXRvcnkvbGliL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQztBQUViLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN2QyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFMUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBRWxCLFNBQVMsV0FBVyxDQUFDLE9BQU87SUFFeEIsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNWLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2pEO0lBRUQsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQsU0FBUyxLQUFLO0lBQ1YsT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDO0FBQzFCLENBQUM7QUFFRCxTQUFTLE1BQU07SUFDWCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQVMsS0FBSyxDQUFDLElBQUk7SUFDZixPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUVELFNBQVMsWUFBWSxDQUFFLFdBQVcsRUFBRSxLQUFLO0lBQ3JDLE9BQU8sUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUdELFFBQVEsR0FBRyxXQUFXLEVBQUUsQ0FBQztBQUV6QixNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsV0FBVyxFQUFFLFdBQVc7SUFDeEIsS0FBSyxFQUFFLEtBQUs7SUFDWixNQUFNLEVBQUUsTUFBTTtJQUNkLEtBQUssRUFBRSxLQUFLO0lBQ1osWUFBWSxFQUFFLFlBQVk7Q0FDN0IsQ0FBQyJ9