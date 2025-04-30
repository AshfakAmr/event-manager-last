import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule, // ✅ Add this
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false; // ✅ New loading variable

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  register() {
    this.loading = true; // Start loading when clicked

    const { email, password } = this.registerForm.value;
    this.authService.checkEmail(email).subscribe(
      (users) => {
        if (users.length > 0) {
          this.snackBar.open("User already registered!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.loading = false; // ✅ Stop loading
        } else {
          this.authService.register(email, password).subscribe(
            () => {
              this.snackBar.open(
                "Registered successfully! Redirecting to login...",
                "Close",
                {
                  duration: 3000,
                  horizontalPosition: "right",
                  verticalPosition: "top",
                }
              );
              this.router.navigate(["/auth/login"]);
              this.loading = false; // ✅ Stop loading
            },
            () => {
              this.loading = false; // Error case stop loading
            }
          );
        }
      },
      () => {
        this.loading = false; // Error case stop loading
      }
    );
  }
}
