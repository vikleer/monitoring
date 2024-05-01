import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class UserService {
  public isAuthenticated = false;
  public accessToken = localStorage.getItem('accessToken') || "";
  public userID = localStorage.getItem('UserID')|| "";
}

// AuthGuard -> Deja pasar si estoy autenticado
// AuthRedirect -> No deja pasar a login y register si está autenticado
