import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventService, Event } from "../../services/event.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-event-list",
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: "./event-list.component.html",
  styleUrls: ["./event-list.component.scss"],
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((data) => {
      this.events = data;
    });
  }

  deleteEvent(id: string): void {
    if (confirm("Are you sure you want to delete this event?")) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.events = this.events.filter((event) => event.id !== id);
      });
    }
  }
}
