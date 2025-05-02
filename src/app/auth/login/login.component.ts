import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon"; // Add this import

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: [
        "",
        [Validators.required, Validators.email], // Email format validation
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  login() {
    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.checkEmail(email).subscribe(
      (users) => {
        if (users.length === 0) {
          this.snackBar.open(
            "User not registered! Redirecting to register...",
            "Close",
            {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
            }
          );
          this.router.navigate(["/auth/register"]);
        } else {
          const user = users[0];
          if (user.password === password) {
            localStorage.setItem("token", "mock-token");
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);
            this.snackBar.open("Logged in successfully!", "Close", {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
            });

            this.router.navigate(["/events"]);
          } else {
            this.snackBar.open("Wrong password!", "Close", {
              duration: 3000,
              horizontalPosition: "right",
              verticalPosition: "top",
            });
          }
        }
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.snackBar.open("Something went wrong!", "Close", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      }
    );
  }
}
