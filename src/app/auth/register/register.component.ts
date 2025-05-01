import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";

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
    MatProgressSpinnerModule,
    MatIconModule,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;
  passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]], // Changed from 6 to 8
    });
  }

  register() {
    this.loading = true;
    const { name, email, password } = this.registerForm.value;

    this.authService.checkEmail(email).subscribe(
      (users) => {
        if (users.length > 0) {
          this.snackBar.open("User already registered!", "Close", {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top",
          });
          this.loading = false;
        } else {
          this.authService.register(name, email, password).subscribe(
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
              this.loading = false;
            },
            () => {
              this.loading = false;
            }
          );
        }
      },
      () => {
        this.loading = false;
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
}
