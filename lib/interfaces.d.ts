export interface SchedueleInfo {
    start: object;
    end: object;
    summary: string;
}
export declare type YrgoSchedule = YrgoLesson[];
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
//# sourceMappingURL=interfaces.d.ts.map