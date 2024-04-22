import { FormControl } from "@angular/forms";
import { DegreeSubject } from "@src/app/modules/monitoring/entities/degree-subject";
import { Time } from "@src/app/modules/monitoring/types/times.type";
import { WeekDay } from "@src/app/modules/monitoring/types/weekdays.type";

export type MonitoringFormGroup = {
  title: FormControl<string>;
  description: FormControl<string>;
  maxAvailablePlaces: FormControl<number>;
  subject: FormControl<DegreeSubject | null>;
  weekDay: FormControl<WeekDay | null>;
  startTime: FormControl<Time>;
  endTime: FormControl<Time>;
};
