const moment = require('moment');

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
  const scheduele = moment.tz(time, 'Europe/Stockholm').toString();
  return scheduele.split(' ');
}
