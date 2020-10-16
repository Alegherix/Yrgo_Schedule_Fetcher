import { endOfWeek, isAfter, isBefore, startOfWeek } from 'date-fns';
import { SchedueleInfo, YrgoLesson, YrgoSchedule } from './interfaces';
import { convertNamedDay, getScheduleAsArray, stripLastDigits } from './utils';
const ical = require('node-ical');

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

  if (!teacher) {
    return { teacher: '', lesson };
  }
  //Replaces trailing ) from teacher
  teacher = teacher.substr(0, teacher.length - 1);
  return { teacher, lesson };
}

function getLesson(scheduleInfo: SchedueleInfo): YrgoLesson {
  const { start, end, summary } = scheduleInfo;

  const startObj = convertStartingInfo(start);
  const endingObj = convertEndingInfo(end);
  const summaryObj = convertSummaryInfo(summary);
  const unformatedTimes = { unformatedTimes: [{ start, end }] };

  return {
    ...startObj,
    ...endingObj,
    ...summaryObj,
    ...unformatedTimes,
  };
}

// Returns entire YRGO schedule as JSON with WU20 set as Default.
export async function getYrgoSchedule(
  scheduleID: string = '7hg90k4hmcqveiatt6sgu5ji1c@group.calendar.google.com'
): Promise<YrgoSchedule> {
  const scheduleURL = `https://calendar.google.com/calendar/ical/${scheduleID}/public/basic.ics`;
  const res = await ical.async.fromURL(scheduleURL);

  return Object.values(res).map((lesson) => {
    const { start, end, summary }: SchedueleInfo = lesson as SchedueleInfo;
    return getLesson({ start, end, summary });
  });
}

// Used for printing the scheduele in Ascending Order
export async function printSchedule(schedule: Promise<YrgoSchedule>) {
  (await schedule).sort((a, b) => (a.date > b.date ? 1 : -1));
  (await schedule).forEach((lesson) =>
    console.log(JSON.stringify(lesson, null, 2))
  );
}

export async function getLessonsInWeek(
  scheduele: Promise<YrgoSchedule>
): Promise<YrgoSchedule> {
  const today = new Date();
  const startDateOfWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endDateOfWeek = endOfWeek(today, { weekStartsOn: 1 });
  const lessons: YrgoSchedule = [];

  (await scheduele).forEach((lesson) => {
    const {
      unformatedTimes: [unformatedTimesArray],
    } = lesson;
    const dateOfLesson = unformatedTimesArray['start'];
    if (
      isBefore(dateOfLesson, endDateOfWeek) &&
      isAfter(dateOfLesson, startDateOfWeek)
    ) {
      lessons.push(lesson);
    }
  });
  return lessons;
}
