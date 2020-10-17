"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLessonInX = exports.getRemainingLessonsInMonth = exports.getRemainingLessonsInWeek = exports.getLessonsThisMonth = exports.getLessonsThisWeek = exports.getLessonsToday = exports.printSchedule = exports.getYrgoSchedule = void 0;
const date_fns_1 = require("date-fns");
const locale_1 = require("date-fns/locale");
const utils_1 = require("./utils");
const ical = require('node-ical');
function convertStartingInfo(start) {
    const [year, month, date, dayName, time] = utils_1.getScheduleAsAnArray(start);
    const convertedDayName = utils_1.capitalizeFirstLetter(dayName);
    const convertedMonthName = utils_1.capitalizeFirstLetter(month);
    return {
        day: convertedDayName,
        date,
        month: convertedMonthName,
        year,
        startTime: time,
    };
}
function convertEndingInfo(end) {
    const endTime = utils_1.getScheduleAsAnArray(end)[4];
    return { endTime };
}
function convertSummaryInfo(summary) {
    let [lesson, teacher] = summary.split('(');
    if (!teacher) {
        return { teacher: '', lesson };
    }
    teacher = teacher.substr(0, teacher.length - 1);
    return { teacher, lesson };
}
function getLesson(scheduleInfo) {
    const { start, end, summary } = scheduleInfo;
    const startObj = convertStartingInfo(start);
    const endingObj = convertEndingInfo(end);
    const summaryObj = convertSummaryInfo(summary);
    return Object.assign(Object.assign(Object.assign({}, startObj), endingObj), summaryObj);
}
function getYrgoSchedule(scheduleID = '7hg90k4hmcqveiatt6sgu5ji1c@group.calendar.google.com') {
    return __awaiter(this, void 0, void 0, function* () {
        const scheduleURL = `https://calendar.google.com/calendar/ical/${scheduleID}/public/basic.ics`;
        const res = yield ical.async.fromURL(scheduleURL);
        return Object.values(res).map((lesson) => {
            const { start, end, summary } = lesson;
            return getLesson({ start, end, summary });
        });
    });
}
exports.getYrgoSchedule = getYrgoSchedule;
function printSchedule(schedule) {
    return __awaiter(this, void 0, void 0, function* () {
        (yield schedule).sort((a, b) => (a.date > b.date ? 1 : -1));
        (yield schedule).forEach((lesson) => console.log(JSON.stringify(lesson, null, 2)));
    });
}
exports.printSchedule = printSchedule;
function getLessonsToday(scheduele) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const tomorrow = date_fns_1.startOfTomorrow();
        return getLessonInX(scheduele, today, tomorrow);
    });
}
exports.getLessonsToday = getLessonsToday;
function getLessonsThisWeek(scheduele) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const startDateOfWeek = date_fns_1.startOfWeek(today, { weekStartsOn: 1 });
        const endDateOfWeek = date_fns_1.endOfWeek(today, { weekStartsOn: 1 });
        return getLessonInX(scheduele, startDateOfWeek, endDateOfWeek);
    });
}
exports.getLessonsThisWeek = getLessonsThisWeek;
function getLessonsThisMonth(scheduele) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const startDateOfMonth = date_fns_1.startOfMonth(today);
        const endDateOfMonth = date_fns_1.endOfMonth(today);
        return getLessonInX(scheduele, startDateOfMonth, endDateOfMonth);
    });
}
exports.getLessonsThisMonth = getLessonsThisMonth;
function getRemainingLessonsInWeek(scheduele) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const endDateOfWeek = date_fns_1.endOfWeek(today);
        return getLessonInX(scheduele, today, endDateOfWeek);
    });
}
exports.getRemainingLessonsInWeek = getRemainingLessonsInWeek;
function getRemainingLessonsInMonth(scheduele) {
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        const endDateOfMonth = date_fns_1.endOfMonth(today);
        return getLessonInX(scheduele, today, endDateOfMonth);
    });
}
exports.getRemainingLessonsInMonth = getRemainingLessonsInMonth;
function getLessonInX(scheduele, startDate, endDate) {
    return __awaiter(this, void 0, void 0, function* () {
        const lessons = [];
        (yield scheduele).forEach((lesson) => {
            const { year, month, date, startTime } = lesson;
            const dateString = utils_1.concatDate(startTime, year, month, date, '');
            const dateOfLesson = date_fns_1.parse(dateString, 'yyyy-MMMM-dd-HH:mm', new Date(), {
                locale: locale_1.sv,
            });
            if (date_fns_1.isBefore(dateOfLesson, endDate) && date_fns_1.isAfter(dateOfLesson, startDate)) {
                lessons.push(lesson);
            }
        });
        return lessons;
    });
}
exports.getLessonInX = getLessonInX;
//# sourceMappingURL=YrgoSchedule.js.map