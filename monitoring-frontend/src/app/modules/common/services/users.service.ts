import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { User } from "@src/app/modules/common/types/user.type";
import { environment } from "@src/environments/environment";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UsersService {
  private httpClient = inject(HttpClient);

  public findOne(id: string): Observable<User> {
    const endpoint = `${environment.API_URL}/users/${id}`;

    return this.httpClient.get<User>(endpoint);
  }
}
