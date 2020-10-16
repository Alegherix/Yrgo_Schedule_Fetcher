import {
  getLessonsInWeek,
  getYrgoSchedule,
  printSchedule,
} from './YrgoSchedule';

const mySchedule = getYrgoSchedule();

printSchedule(getLessonsInWeek(mySchedule));
