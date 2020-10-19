import {
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  parse,
  startOfMonth,
  startOfTomorrow,
  startOfWeek,
} from 'date-fns';
import { sv } from 'date-fns/locale';
import {
  SchedueleInfo,
  YrgoLesson,
  YrgoLessonProperty,
  YrgoSchedule,
} from './interfaces';
import {
  capitalizeFirstLetter,
  concatDate,
  getScheduleAsAnArray,
} from './utils';

const ical = require('node-ical');

// Converts starting time to JSON with multiple entries of scheduele
function convertStartingInfo(start: object) {
  const [year, month, date, dayName, time] = getScheduleAsAnArray(start);
  const convertedDayName = capitalizeFirstLetter(dayName);
  const convertedMonthName = capitalizeFirstLetter(month);

  return {
    day: convertedDayName,
    date,
    month: convertedMonthName,
    year,
    startTime: time,
  };
}

// Convert and returns ending time of a lesson to JSON
function convertEndingInfo(end: object) {
  // 4th value is the actual time
  const endTime = getScheduleAsAnArray(end)[4];
  return { endTime };
}

// Converts and returns summary as info and teacher as JSON
function convertSummaryInfo(summary: string) {
  let [lesson, teacher] = summary.split('(');
  const [subject, course] = lesson.split('/').map((s) => s.trim());

  if (!teacher) {
    return { teacher, subject, course };
  }
  //Replaces trailing ) from teacher
  teacher = teacher.substr(0, teacher.length - 1);

  return { teacher, subject, course };
}

function getLesson(scheduleInfo: SchedueleInfo): YrgoLesson {
  const { start, end, summary } = scheduleInfo;

  const startObj = convertStartingInfo(start);
  const endingObj = convertEndingInfo(end);
  const summaryObj = convertSummaryInfo(summary);

  return {
    ...startObj,
    ...endingObj,
    ...summaryObj,
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
export async function printSchedule(
  schedule: Promise<YrgoSchedule>
): Promise<void> {
  (await schedule).sort((a, b) => (a.date > b.date ? 1 : -1));
  (await schedule).forEach((lesson) =>
    console.log(JSON.stringify(lesson, null, 2))
  );
}

export async function getLessonsToday(
  scheduele: Promise<YrgoSchedule>
): Promise<YrgoSchedule> {
  const today = new Date();
  const tomorrow = startOfTomorrow();
  return getLessonInX(scheduele, today, tomorrow);
}

export async function getLessonsThisWeek(
  scheduele: Promise<YrgoSchedule>
): Promise<YrgoSchedule> {
  const today = new Date();
  const startDateOfWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endDateOfWeek = endOfWeek(today, { weekStartsOn: 1 });
  return getLessonInX(scheduele, startDateOfWeek, endDateOfWeek);
}

export async function getLessonsThisMonth(
  scheduele: Promise<YrgoSchedule>
): Promise<YrgoSchedule> {
  const today = new Date();
  const startDateOfMonth = startOfMonth(today);
  const endDateOfMonth = endOfMonth(today);
  return getLessonInX(scheduele, startDateOfMonth, endDateOfMonth);
}

export async function getRemainingLessonsInWeek(
  scheduele: Promise<YrgoSchedule>
): Promise<YrgoSchedule> {
  const today = new Date();
  const endDateOfWeek = endOfWeek(today);
  return getLessonInX(scheduele, today, endDateOfWeek);
}

export async function getRemainingLessonsInMonth(
  scheduele: Promise<YrgoSchedule>
): Promise<YrgoSchedule> {
  const today = new Date();
  const endDateOfMonth = endOfMonth(today);
  return getLessonInX(scheduele, today, endDateOfMonth);
}

export async function getLessonInX(
  scheduele: Promise<YrgoSchedule>,
  startDate: Date,
  endDate: Date
): Promise<YrgoSchedule> {
  const lessons: YrgoSchedule = [];

  (await scheduele).forEach((lesson) => {
    const { year, month, date, startTime } = lesson;
    const dateString = concatDate(startTime, year, month, date, '');
    const dateOfLesson = parse(dateString, 'yyyy-MMMM-dd-HH:mm', new Date(), {
      locale: sv,
    });
    if (isBefore(dateOfLesson, endDate) && isAfter(dateOfLesson, startDate)) {
      lessons.push(lesson);
    }
  });
  return lessons;
}

export async function filterBy(
  scheduele: Promise<YrgoSchedule>,
  property: YrgoLessonProperty,
  value: string
): Promise<YrgoSchedule> {
  const mySchedule = await scheduele;
  return mySchedule.filter((scheduele) => scheduele[property] === value);
}
