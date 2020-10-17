import { YrgoSchedule } from './interfaces';
export declare function getYrgoSchedule(scheduleID?: string): Promise<YrgoSchedule>;
export declare function printSchedule(schedule: Promise<YrgoSchedule>): Promise<void>;
export declare function getLessonsToday(scheduele: Promise<YrgoSchedule>): Promise<YrgoSchedule>;
export declare function getLessonsThisWeek(scheduele: Promise<YrgoSchedule>): Promise<YrgoSchedule>;
export declare function getLessonsThisMonth(scheduele: Promise<YrgoSchedule>): Promise<YrgoSchedule>;
export declare function getRemainingLessonsInWeek(scheduele: Promise<YrgoSchedule>): Promise<YrgoSchedule>;
export declare function getRemainingLessonsInMonth(scheduele: Promise<YrgoSchedule>): Promise<YrgoSchedule>;
export declare function getLessonInX(scheduele: Promise<YrgoSchedule>, startDate: Date, endDate: Date): Promise<YrgoSchedule>;
//# sourceMappingURL=YrgoSchedule.d.ts.map