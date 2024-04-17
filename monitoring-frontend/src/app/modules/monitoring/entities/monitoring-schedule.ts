export interface MonitoringSchedule {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  agenda: Agenda;
  user: User;
}

export interface Agenda {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  startDate: Date;
  endDate: Date;
  placesTaken: number;
  monitoring: Monitoring;
}

export interface Monitoring {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  title: string;
  description: string;
  maxAvailablePlaces: number;
  subject: Subject;
}

export interface Subject {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  name: string;
}

export interface User {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  email: string;
  password: string;
}
