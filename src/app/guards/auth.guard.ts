import { Injectable } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(["/auth/login"]);
      return false;
    }
    return true;
  }
}
