import { DegreeSubject } from "@src/app/modules/monitoring/entities/degree-subject";
import { Time } from "@src/app/modules/monitoring/types/times.type";
import { WeekDay } from "@src/app/modules/monitoring/types/weekdays.type";

export type MonitoringSubmitted = {
  title: string;
  description: string;
  maxAvailablePlaces: number;
  subject: DegreeSubject;
  weekDay: WeekDay;
  startTime: Time;
  endTime: Time;
};
