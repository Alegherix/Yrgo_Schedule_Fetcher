// import { YrgoSchedule } from './interfaces';
// import { getScheduleAsAnArray } from './utils';
// import {
//   getRemainingLessonsInMonth,
//   getYrgoSchedule,
//   printSchedule,
// } from './YrgoSchedule';
// import { sv } from 'date-fns/locale';
// import { addDays, format, parse, startOfTomorrow } from 'date-fns';

// // const mySchedule = getYrgoSchedule();
// // printSchedule(getRemainingLessonsInMonth(mySchedule));

// // export async function testNew(schedule: Promise<YrgoSchedule>) {
// //   const testEntry = (await schedule).forEach((lesson) => {
// //     // console.log(JSON.stringify(lesson));
// //     const {
// //       unformatedTimes: [arrayOfUnformated],
// //     } = lesson;
// //     // console.log(arrayOfUnformated['start']);

// //     getScheduleAsAnArray(arrayOfUnformated['start']);
// //   });
// // }

// // testNew(mySchedule);

// // const testStr = '2020'
// //   .concat('-')
// //   .concat('November')
// //   .concat('-')
// //   .concat('15')
// //   .concat('-')
// //   .concat('09:30');

// // const testStr = concatDate('09:30', '2020', 'November', '15', '');

// // const currentDate = parse(testStr, 'yyyy-MMMM-dd-HH:mm', new Date(), {
// //   locale: sv,
// // });
// // console.log(currentDate);

// // function concatDate(startTime: string, ...args: Array<string>) {
// //   return args.join('-').concat(startTime);
// // }

// const today = new Date();
// const tomorrow = startOfTomorrow();
// console.log(today);
// console.log(tomorrow);
