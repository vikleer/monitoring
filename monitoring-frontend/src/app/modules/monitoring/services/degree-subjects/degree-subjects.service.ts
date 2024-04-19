import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { DegreeSubject } from "@src/app/modules/monitoring/entities/degree-subject";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DegreeSubjectsService {
  public httpClient = inject(HttpClient);

  public findAll(): Observable<DegreeSubject[]> {
    const endpoint = `${environment.API_URL}/degree-subjects`;

    return this.httpClient.get<DegreeSubject[]>(endpoint);
  }
}
