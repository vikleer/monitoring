import { Injectable } from "@angular/core";
import { User } from "@src/app/modules/common/types/user.type";

@Injectable({ providedIn: "root" })
export class UserService {
  public isAuthenticated = !!localStorage.getItem("accessToken") || false;
  public accessToken = localStorage.getItem("accessToken") || "";
  public user: User | null = JSON.parse(localStorage.getItem("user") || "{}");
  public userId = localStorage.getItem("userId") || "";

  public login(accessToken: string, userId: string): void {
    this.isAuthenticated = true;
    this.accessToken = accessToken;
    this.userId = userId;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userId", userId);
  }

  public logout(): void {
    this.isAuthenticated = false;
    this.accessToken = "";
    this.user = null;
    this.userId = "";

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  }

  public setUser(user: User): void {
    this.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  }
}
