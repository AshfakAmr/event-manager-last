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
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"; // ✅ Import

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
    MatSnackBarModule, // ✅ Add MatSnackBarModule
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
    private authService: AuthService,
    private snackBar: MatSnackBar // ✅ Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/auth/login"]);
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
      const existingEvent = this.eventService["eventsSubject"].value.find(
        (event) => event.id === this.eventId
      );

      if (!existingEvent) {
        this.showError("Event not found.");
        return;
      }

      this.eventService
        .updateEvent(this.eventId, {
          ...formValue,
          userId: existingEvent.userId,
        })
        .subscribe({
          next: () => this.redirectToList(),
          error: () => this.showError("Error updating event."),
        });
    } else {
      const email = localStorage.getItem("email");
      if (!email) {
        this.showError("User not logged in.");
        return;
      }

      const newEvent: Event = {
        id: crypto.randomUUID(),
        userId: email,
        ...formValue,
      };

      this.eventService.createEvent(newEvent).subscribe({
        next: () => {
          this.snackBar.open("Event created successfully!", "Close", {
            duration: 3000,
          }); // ✅ Toast after creation
          this.redirectToList();
        },
        error: () => this.showError("Error creating event."),
      });
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
