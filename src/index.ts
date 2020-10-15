const ical = require('node-ical');
const fs = require('fs');
const moment = require('moment');

// Används för att wgeta uppdaterade versioner
const fileUrl =
  'https://calendar.google.com/calendar/ical/7hg90k4hmcqveiatt6sgu5ji1c@group.calendar.google.com/public/basic.ics';

interface SchedueleInfo {
  start: object;
  end: object;
  summary: string;
}

// use the sync function parseFile() to parse this ics file
const events = ical.sync.parseFile('./src/basic.ics');
const firstEvent: any = Object.values(events)[0];
const { start, end, summary }: SchedueleInfo = firstEvent;
