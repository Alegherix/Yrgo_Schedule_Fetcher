// const moment = require('moment');
const moment = require('moment-timezone');
import { startOfWeek, endOfWeek } from 'date-fns';

export function convertNamedDay(day: string): string {
  switch (day) {
    case 'Mon':
      return 'Måndag';
    case 'Tue':
      return 'Tisdag';
    case 'Wed':
      return 'Onsdag';
    case 'Thu':
      return 'Torsdag';
    case 'Fri':
      return 'Fredag';
    case 'Sat':
      return 'Lördag';
    case 'Sun':
      return 'Söndag';
  }
  return '';
}

export function stripLastDigits(time: string): string {
  const timeArray = time.split(':');
  timeArray.pop();
  return timeArray!.join(':');
}

export function getScheduleAsArray(time: object): Array<string> {
  const schedule = moment.tz(time, 'Europe/Stockholm').toString();
  return schedule.split(' ');
}

export function getScheduleAsArrayFromString(time: string): Array<string> {
  const schedule = moment
    .tz(time, 'Europe/Stockholm')
    .format('YYYY-MM-DD-HH:mm')
    .toString();
  console.log(schedule);

  return schedule.split(' ');
}

export function getLessonsOfWeek(unmodifiedDate: string) {
  const start = startOfWeek(new Date(unmodifiedDate), { weekStartsOn: 1 });
}
