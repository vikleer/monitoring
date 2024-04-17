export interface Monitoring {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  title: string;
  description: string;
  maxAvailablePlaces: number;
  createdBy: CreatedBy;
  subject: Subject;
  availabilities: Availability[];
}

export interface Availability {
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  email: string;
  password: string;
  profile: Profile;
}

export interface Profile {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  overview: string;
}

export interface Subject {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  name: string;
}
