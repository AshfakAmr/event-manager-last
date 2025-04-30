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
  isLoading = false; // Loading state
  errorMessage: string | null = null; // For error messages

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
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
        this.eventService.getEventById(id).subscribe(
          (event) => {
            this.eventForm.patchValue({
              title: event.title,
              description: event.description,
              date: event.date,
            });
          },
          (error) => {
            this.errorMessage = "Error fetching event details.";
          }
        );
      }
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid) return;

    const formValue = this.eventForm.value;
    this.isLoading = true; // Show loading state

    if (this.isEditMode) {
      this.eventService.updateEvent(this.eventId, formValue).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(["/events"]);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = "Error updating event.";
        }
      );
    } else {
      const newEvent: Event = {
        ...formValue,
        id: crypto.randomUUID(), // Optional: your backend may generate this
        userId: "1", // TEMP: Replace with real user ID once auth is set
      };

      this.eventService.createEvent(newEvent).subscribe(
        () => {
          this.isLoading = false;
          this.router.navigate(["/events"]);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = "Error creating event.";
        }
      );
    }
  }

  goBackToList(): void {
    this.router.navigate(["/events"]);
  }
}
