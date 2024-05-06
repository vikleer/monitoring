export interface User {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  email: string;
  password: string;
  profile: Profile;
  authorizations: Authorization[];
}

export interface Authorization {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  role?: Role;
  name?: string;
}

export interface Role {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface Permission {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  id: string;
  action: string;
  subject: string;
  conditions: Conditions | null;
}

export interface Conditions {
  "user.id"?: string;
  id?: string;
  "createdBy.id"?: string;
  "monitoring.createdBy.id"?: string;
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
  degree: Authorization;
}
