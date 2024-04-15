export type DegreeSubject = {
  id: string;
  name: string;
};

export type Monitoring = {
  id: string;
  title: string;
  description: string;
  subject: DegreeSubject;
};
