import { InferSubjects } from "@casl/ability";
import { UserSession } from "@src/modules/auth/entities/user-session.entity";
import { MonitoringAvailability } from "@src/modules/monitoring/entities/monitoring-availability.entity";
import { MonitoringSchedule } from "@src/modules/monitoring/entities/monitoring-schedule.entity";
import { Monitoring } from "@src/modules/monitoring/entities/monitoring.entity";
import { User } from "@src/modules/users/entities/user.entity";

export type Subjects =
  | InferSubjects<
      | "User"
      | "UserSession"
      | "Monitoring"
      | "MonitoringSchedule"
      | "MonitoringAvailability"
      | typeof User
      | typeof UserSession
      | typeof Monitoring
      | typeof MonitoringSchedule
      | typeof MonitoringAvailability
    >
  | "all";
