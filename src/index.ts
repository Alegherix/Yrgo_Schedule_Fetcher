import { YrgoSchedule } from './interfaces';
import { getScheduleAsAnArray } from './utils';
import {
  getRemainingLessonsInMonth,
  getYrgoSchedule,
  printSchedule,
} from './YrgoSchedule';

const mySchedule = getYrgoSchedule();
printSchedule(getRemainingLessonsInMonth(mySchedule));

// export async function testNew(schedule: Promise<YrgoSchedule>) {
//   const testEntry = (await schedule).forEach((lesson) => {
//     // console.log(JSON.stringify(lesson));
//     const {
//       unformatedTimes: [arrayOfUnformated],
//     } = lesson;
//     // console.log(arrayOfUnformated['start']);

//     getScheduleAsAnArray(arrayOfUnformated['start']);
//   });
// }

// testNew(mySchedule);
