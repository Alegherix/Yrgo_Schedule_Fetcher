import {
  getLessonsInMonth,
  getLessonsInWeek,
  getRemainingLessonsInMonth,
  getRemainingLessonsInWeek,
  getYrgoSchedule,
  printSchedule,
} from './YrgoSchedule';

const mySchedule = getYrgoSchedule();
printSchedule(getRemainingLessonsInMonth(mySchedule));
