export interface SchedueleInfo {
  start: object;
  end: object;
  summary: string;
}

export interface YrgoSchedule {
  schedule: Array<YrgoLesson>;
}

export interface YrgoLesson {
  day: string;
  year: string;
  month: string;
  date: string;
  startTime: string;
  endTime: string;
  teacher: string;
  lesson: string;
}

export interface StartInformation {
  day: string;
  month: string;
  date: string;
  year: string;
  time: string;
}
