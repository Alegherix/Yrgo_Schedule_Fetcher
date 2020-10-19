export interface SchedueleInfo {
  start: object;
  end: object;
  summary: string;
}

export interface YrgoLesson {
  day: string;
  year: string;
  month: string;
  date: string;
  startTime: string;
  endTime: string;
  teacher?: string;
  subject?: string;
  course?: string;
}

export type YrgoSchedule = YrgoLesson[];

export type YrgoLessonProperty = keyof YrgoLesson;
