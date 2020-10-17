import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

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

export function concatDate(startTime: string, ...args: Array<string>) {
  return args.join('-').concat(startTime);
}
