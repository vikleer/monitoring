export type DateTime = {
  date: string;
  time: { start: string; end: string };
};

export type DayTime = {
  day: number;
  time: { start: string; end: string };
};

export type DateRange = {
  startDate: Date;
  endDate: Date;
};
