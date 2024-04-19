export interface MonitoringAgenda {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  startDate: string;
  endDate: string;
  placesTaken: number;
  monitoring: Monitoring;
}

export interface Monitoring {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  title: string;
  description: string;
  maxAvailablePlaces: number;
  subject: Subject;
  createdBy: CreatedBy;
  availabilities: Availability[];
}

export interface Availability {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  type: string;
  recurrence: Recurrence;
}

export interface Recurrence {
  type: string;
  weekDays: WeekDay[];
}

export interface WeekDay {
  day: number;
  time: Time;
}

export interface Time {
  start: string;
  end: string;
}

export interface CreatedBy {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  email: string;
  password: string;
}

export interface Subject {
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  id: string;
  name: string;
}
