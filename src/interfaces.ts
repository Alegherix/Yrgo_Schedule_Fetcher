export interface SchedueleInfo {
  start: object;
  end: object;
  summary: string;
}

export type YrgoSchedule = YrgoLesson[];

export interface YrgoLesson {
  day: string;
  year: string;
  month: string;
  date: string;
  startTime: string;
  endTime: string;
  teacher: string;
  lesson: string;
  unformatedTimes: Array<Object>;
  // unformatedTimes: UnformatedTimes;
  // unformatedTimes: UnformatedTimes;
}

export interface UnformatedTimes {
  unformatedTimes: Object;
}
