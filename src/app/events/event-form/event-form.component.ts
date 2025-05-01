// src/app/components/event-form/event-form.component.ts
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EventService, Event } from "../../services/event.service";
import { AuthService } from "../../services/auth.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  standalone: true,
  selector: "app-event-form",
  templateUrl: "./event-form.component.html",
  styleUrls: ["./event-form.component.scss"],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode = false;
  eventId!: string;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/auth/login"]); // Redirect to login if not authenticated
      return;
    }

    this.eventForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      date: ["", Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.isEditMode = true;
        this.eventId = id;
        this.loadEvent(id);
      }
    });
  }

  private loadEvent(id: string): void {
    this.isLoading = true;
    this.eventService.getEventById(id).subscribe(
      (event) => {
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          date: event.date,
        });
        this.isLoading = false;
      },
      () => {
        this.errorMessage = "Error fetching event details.";
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.eventForm.invalid) return;

    this.isLoading = true;

    const formValue = this.eventForm.value;

    if (this.isEditMode) {
      this.eventService.updateEvent(this.eventId, formValue).subscribe(
        () => this.redirectToList(),
        () => this.showError("Error updating event.")
      );
    } else {
      const email = localStorage.getItem("email");
      const userEmail = localStorage.getItem("token");
      if (!userEmail) {
        this.showError("User not logged in.");
        return;
      }

      const newEvent: Event = {
        id: crypto.randomUUID(),
        userId: email,
        ...formValue,
      };

      this.eventService.createEvent(newEvent).subscribe(
        () => this.redirectToList(),
        () => this.showError("Error creating event.")
      );
    }
  }

  goBackToList(): void {
    this.router.navigate(["/events"]);
  }

  private redirectToList(): void {
    this.isLoading = false;
    this.router.navigate(["/events"]);
  }

  private showError(message: string): void {
    this.isLoading = false;
    this.errorMessage = message;
  }
}
