
export enum ScheduleRouteName {
    Http = 'http',
    Status = 'status',
    Log = 'log',
}

export interface ScheduleRoute {
    Http: string[];
    Status: string[];
    Log: string[];
}
