<img src="https://media.giphy.com/media/7yTqXVALy7Fwk/giphy.gif" width="100%">

# Scheduele Parser for YRGO

Används för att parsea Schemat för WU20 och göra det till ett mer lättarbetat JSON format.
Bör även även gå att parsea andra klassers schema som använder sig av RFC5545 formatet.

## Installation

```js
npm install YrgoSchedueleFetcher
```

alternativt,

```js
yarn add YrgoSchedueleFetcher
```

### API

YrgoScheduleFetcher baseras på Asynkrona operationer vilket innebär att varje operation returnerar ett

```js
Promise<YrgoSchedule>
```

Därav måste ni använda async/await eller then() när ni anropar en av metoderna.

### Json

YrgoSchedule är inget mer än en Array av JSON objekt, exempel:

```js
{
  "day": "Torsdag",
  "date": "15",
  "month": "Oktober",
  "year": "2020",
  "startTime": "13:00",
  "endTime": "16:00",
  "teacher": "Vincent Klaiber",
  "lesson": "SQL / Datakällor "
}
```

### ExempelAnvändning:

```js
const {
  getYrgoSchedule,
  getLessonsThisWeek,
  filterBy,
  printSchedule,
} = require('yrgo-schedule-fetcher');

async function main() {
  // Hämtar WU20 Schemat by default
  const mySchedule = getYrgoSchedule();

  // Hämtar lektioner för månaden
  const monthlySchedule = getLessonsThisMonth(mySchedule);

  // Filtrera ut alla lektioner som har Vincent som lärare
  const vincentLessons = filterBy(
    monthlySchedule,
    'teacher',
    'Vincent Klaiber'
  );

  // Pretty printar ut schemat
  printSchedule(vincentLessons);
}

main();
```

## Funktioner

Funktioner som stöjds är:

```js
getYrgoSchedule(scheduleID: string) => Returnerar ett Promise<YrgoSchedule>

getLessonsToday(scheduele: Promise<YrgoSchedule>) -> Returnerar dagens lektioner som ett Promise<YrgoSchedule>

getLessonsThisWeek(scheduele: Promise<YrgoSchedule>) -> Returnerar alla lektioner för denna veckan som ett Promise<YrgoSchedule>

getRemainingLessonsInWeek(scheduele: Promise<YrgoSchedule>) -> Returnerar alla återstående lektioner för veckan som ett Promise<YrgoSchedule>

getLessonsThisMonth(scheduele: Promise<YrgoSchedule>) -> Returnerar alla lektioner för denna månaden som ett Promise<YrgoSchedule>

getRemainingLessonsInMonth(scheduele:Promise<YrgoSchedule>) -> Returnerar alla återstående lektioner för månaden som ett Promise<YrgoSchedule>

getLessonInX(scheduele: Promise<YrgoSchedule>, startDate: Date, endDate: Date) -> Returnerar alla lektioner mellan 2 Dates som ett Promise<YrgoSchedule>

filterBy(scheduele: Promise<YrgoSchedule>, property: string, value: string) -> Returnerar ett Promise<YrgoSchedule> baserat på property, samt värdet man vill filtrera med.

printSchedule(schedule: Promise<YrgoSchedule>) -> Printar ut Schemat i terminalen.
```

### Andra Klassers Scheman

Vill man använda andra klassers Scheman t.ex. WU19, så behöver man bara passera ett Kalender ID för detta schemat, Hänvisning till hur man detta finns här: [Hitta Calendar ID för andra klasser](https://care.pushpay.com/s/knowledge/How-do-I-get-an-iCal-feed-from-Google-Calendar)
