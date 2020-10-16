import format from 'date-fns/format';
import { sv } from 'date-fns/locale';

// export function convertNamedDay(day: string): string {
//   switch (day) {
//     case 'Mon':
//       return 'Måndag';
//     case 'Tue':
//       return 'Tisdag';
//     case 'Wed':
//       return 'Onsdag';
//     case 'Thu':
//       return 'Torsdag';
//     case 'Fri':
//       return 'Fredag';
//     case 'Sat':
//       return 'Lördag';
//     case 'Sun':
//       return 'Söndag';
//   }
//   return '';
// }

export function stripLastDigits(time: string): string {
  const timeArray = time.split(':');
  timeArray.pop();
  return timeArray!.join(':');
}

export function getScheduleAsAnArray(time: object): Array<string> {
  const schedule = format(
    new Date(time.toString()),
    'yyyy-MMMM-dd-iiii-HH:mm',
    {
      locale: sv,
    }
  );
  return schedule.split('-');
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
