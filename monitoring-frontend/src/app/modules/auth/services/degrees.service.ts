import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Degree } from "@src/app/modules/auth/types/degree";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DegreesService {
  private endpointDregrees = `${environment.API_URL}/degrees`;

  public constructor(private httpClient: HttpClient) {}

  /**
   * Obtains data from degree
   * @returns {Observable<Degree[]>}
   */
  public getDregrees(): Observable<Degree[]> {
    return this.httpClient.get<Degree[]>(this.endpointDregrees);
  }
}
