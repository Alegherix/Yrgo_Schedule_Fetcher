"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatDate = exports.capitalizeFirstLetter = exports.getScheduleAsAnArray = exports.stripLastDigits = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
function stripLastDigits(time) {
    const timeArray = time.split(':');
    timeArray.pop();
    return timeArray.join(':');
}
exports.stripLastDigits = stripLastDigits;
function getScheduleAsAnArray(time) {
    const schedule = date_fns_1.format(new Date(time.toString()), 'yyyy-MMMM-dd-iiii-HH:mm', {
        locale: locale_1.sv,
    });
    return schedule.split('-');
}
exports.getScheduleAsAnArray = getScheduleAsAnArray;
function capitalizeFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function concatDate(startTime, ...args) {
    return args.join('-').concat(startTime);
}
exports.concatDate = concatDate;
//# sourceMappingURL=utils.js.map