import { endOfWeek, format, startOfWeek } from 'date-fns';
import { YrgoSchedule } from './interfaces';
import { getScheduleAsArray, getScheduleAsArrayFromString } from './utils';
// import { getLessonsOfWeek } from './utils';
import { getYrgoSchedule } from './YrgoSchedule';
const moment = require('moment');

const mySchedule = getYrgoSchedule();

export function getLessonsOfWeek(unmodifiedDate: string) {
  const start = startOfWeek(new Date(unmodifiedDate), { weekStartsOn: 1 });
  console.log(start);
}

mySchedule.then((lesson) => {
  const testObject = lesson[0];
  console.log(JSON.stringify(testObject));
  // const {
  //   unformatedTimes: [unformatedObject],
  // } = testObject;
  // const {start} = unformatedObject;
  // console.log(unformatedObject);

  // console.log(start);
  // console.log(end);

  // const [start, end] = lesson[0]['unformatedTimes'];
});

// const testString = '2021-05-12T07:00:00.000Z';

// const myDate = format(new Date(), "'Today is a' iiii");
// const today = new Date();
// const startDateOfWeek = startOfWeek(today);
// const endDateOfWeek = endOfWeek(today);

// console.log(today);
// console.log(startDateOfWeek);
// console.log(endDateOfWeek);

//
// function getLessonsInWeek(
//   scheduele: Promise<YrgoSchedule>
// ): Promise<YrgoSchedule> {
//   const today = new Date();
//   const startDateOfWeek = startOfWeek(today, { weekStartsOn: 1 });
//   const endDateOfWeek = endOfWeek(today, { weekStartsOn: 1 });

//   scheduele.then((lesson) => {});
// }

// getScheduleAsArrayFromString(testString);

// const scheduele = moment.tz(testString, 'Europe/Stockholm').toString();
