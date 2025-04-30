import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {
  registerForm: FormGroup;

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
    const { email, password } = this.registerForm.value;
    this.authService.checkEmail(email).subscribe((users) => {
      if (users.length > 0) {
        this.snackBar.open("User already registered!", "Close", {
          duration: 3000,
        });
      } else {
        this.authService.register(email, password).subscribe(() => {
          this.snackBar.open(
            "Registered successfully! Redirecting to login...",
            "Close",
            {
              duration: 3000,
            }
          );
          this.router.navigate(["/auth/login"]);
        });
      }
    });
  }
}
