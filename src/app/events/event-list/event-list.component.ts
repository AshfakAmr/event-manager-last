import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { EventService, Event } from "../../services/event.service";
import { AuthService } from "../../services/auth.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";

@Component({
  standalone: true,
  selector: "app-event-list",
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  userEmail: string = "";
  userName: string = "";
  searchQuery: string = "";
  selectedFilter: string = "all";
  selectedSort: string = "dateAsc";
  private eventSubscription!: Subscription;

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/auth/login"]);
      return;
    }

    this.userEmail = localStorage.getItem("email") || "";
    this.userName = localStorage.getItem("name") || "";

    if (this.userEmail) {
      this.eventService
        .getUserEvents(this.userEmail)
        .subscribe((userEvents) => {
          this.eventService["eventsSubject"].next(userEvents);
        });

      this.eventSubscription = this.eventService.events$.subscribe((data) => {
        this.events = data;
        this.filterEvents();
      });
    } else {
      this.snackBar.open("User not authenticated", "Close", {
        duration: 3000,
      });
    }
  }

  filterEvents() {
    let filtered = [...this.events];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }

    const now = new Date();
    if (this.selectedFilter === "past") {
      filtered = filtered.filter((event) => new Date(event.date) < now);
    } else if (this.selectedFilter === "upcoming") {
      filtered = filtered.filter((event) => new Date(event.date) > now);
    }

    switch (this.selectedSort) {
      case "dateAsc":
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "dateDesc":
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "titleAsc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "titleDesc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    this.filteredEvents = filtered;
  }

  deleteEvent(id: string): void {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.snackBar.open("Event deleted", "Close", { duration: 2000 });
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(["/auth/login"]);
    this.snackBar.open("Logged out successfully", "Close", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ["logout-toast"],
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
  }
}
