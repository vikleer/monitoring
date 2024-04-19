export type CreateMonitoringDto = {
  title: string;
  description: string;
  maxAvailablePlaces: number;
  subjectId: string;
  availabilities: AvailabilityDto[];
};

export type AvailabilityDto = {
  type: string;
  recurrence: RecurrenceDto;
};

export type RecurrenceDto = {
  type: string;
  weekDays: WeekDayDto[];
};

export type WeekDayDto = {
  day: number;
  time: TimeDto;
};

export type TimeDto = {
  start: string;
  end: string;
};
