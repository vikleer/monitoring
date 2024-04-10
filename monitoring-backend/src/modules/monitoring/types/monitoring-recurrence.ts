import { DateTime, DayTime } from "@src/modules/monitoring/types/dates";

type MonitoringUniqueRecurrence = {
  type: "unique";
  dates: DateTime[];
};

type MonitoringWeeklyRecurrence = {
  type: "weekly";
  weekDays: DayTime[];
};

type MonitoringMonthlyRecurrence = {
  type: "monthly";
  monthDays: DayTime[];
};

type MonitoringAnnuallyRecurrence = {
  type: "annually";
  dates: DateTime[];
};

export type MonitoringRecurrence =
  | MonitoringUniqueRecurrence
  | MonitoringWeeklyRecurrence
  | MonitoringMonthlyRecurrence
  | MonitoringAnnuallyRecurrence;
