import { Component, inject } from '@angular/core';
import { NavbarComponent } from "@src/app/modules/common/components/navbar/navbar.component";
import { FooterComponent } from "@src/app/modules/common/components/footer/footer.component";
import { Monitoring } from '@src/app/modules/monitoring/entities/monitoring';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@src/app/modules/common/services/user.service';
import { MonitoringSchedulesService } from '@src/app/modules/monitoring/services/monitoring-schedules/monitoring-schedules.service';
import { MonitoringSchedule } from '@src/app/modules/monitoring/entities/monitoring-schedule';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonitoringService } from '@src/app/modules/monitoring/services/monitoring/monitoring.service';
import { MonitoringAgendasService } from '@src/app/modules/monitoring/services/monitoring-agendas/monitoring-agendas.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private userService = inject(UserService);
  public monitoringService = inject(MonitoringService);
  public monitoringSchedules = inject(MonitoringSchedulesService)
  public http = inject(HttpClient)
  public monitoringAgendasService = inject(MonitoringAgendasService);

  public monitoring: Monitoring[] = [];
  public countMonitoring: number = 0;
  public countMymonitoring: number = 0;
  public mySchedules: number = 0;

  public ngOnInit(): void {
    this.userService
    //*console.warn(this.userService.userId);
    this.allMonitoring();
    this.Mymonitorings();
    this.mySchedulesMonitorings(); 


  }

  public get userName(): string {
    const { firstName, lastName } = this.userService.user!.profile;
    return `${firstName} ${lastName}`;
  }

  public allMonitoring(): void{
    this.monitoringService.findAll().subscribe(data => {
      this.monitoring = data;
      this.countMonitoring = data.length;
    })
  }

  public Mymonitorings(): void {
    this.monitoringSchedules.findAll({userId: this.userService.userId}).subscribe(data => {
      this.countMymonitoring = data.length;
    })
  }

  public mySchedulesMonitorings():void {
    this.monitoringAgendasService
    .findCreated({createdById: this.userService.userId})
    .subscribe(data => {
      this.mySchedules = data.length;
    })
  }

}
