import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const token = localStorage.getItem("token");

  if (!token) {
    snackBar.open("Please login to continue", "Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["auth-toast"],
    });
    router.navigate(["/auth/login"]);
    return false;
  }

  return true;
};
