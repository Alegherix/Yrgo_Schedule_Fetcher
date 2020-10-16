import { SchedueleInfo, YrgoLesson } from './interfaces';
import { convertNamedDay, getScheduleAsArray, stripLastDigits } from './utils';
const ical = require('node-ical');
const fs = require('fs');

// Används för att wgeta uppdaterade versioner
const fileUrl =
  'https://calendar.google.com/calendar/ical/7hg90k4hmcqveiatt6sgu5ji1c@group.calendar.google.com/public/basic.ics';

// use the sync function parseFile() to parse this ics file
const events = ical.sync.parseFile('./assets/basic.ics');

const firstEvent: any = Object.values(events)[0];
const { start, end, summary }: SchedueleInfo = firstEvent;

// Converts starting time to JSON with multiple entries of scheduele
function convertStartingInfo(start: object) {
  const [dayName, month, date, year, time] = getScheduleAsArray(start);
  const convertedDayName = convertNamedDay(dayName);
  const convertedTime = stripLastDigits(time);

  return { day: convertedDayName, year, month, date, startTime: convertedTime };
}

// Convert and returns ending time of a lesson to JSON
function convertEndingInfo(end: object) {
  // 4th value is the actual time
  const endTime = stripLastDigits(getScheduleAsArray(end)[4]);

  return { endTime };
}

// Converts and returns summary as info and teacher as JSON
function convertSummaryInfo(summary: string) {
  let [lesson, teacher] = summary.split('(');
  teacher = teacher.substr(0, teacher.length - 1);

  return { teacher, lesson };
}

function getSchedule(start: object, end: object, summary: string): YrgoLesson {
  const startObj = convertStartingInfo(start);
  const endingObj = convertEndingInfo(end);
  const summaryObj = convertSummaryInfo(summary);

  const returnObj = {
    ...startObj,
    ...endingObj,
    ...summaryObj,
  };

  return returnObj;
}

console.log(JSON.stringify(getSchedule(start, end, summary)));
