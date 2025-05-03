import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, tap } from "rxjs";
import { environment } from "../../environments/environment";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  userId: string;
}

@Injectable({
  providedIn: "root",
})
export class EventService {
  private baseUrl = environment.apiBaseUrlEvents;

  private eventsSubject = new BehaviorSubject<Event[]>([]);
  events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadEvents(): void {
    this.http.get<Event[]>(this.baseUrl).subscribe((events) => {
      this.eventsSubject.next(events);
    });
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, event).pipe(
      tap((newEvent) => {
        const currentEvents = this.eventsSubject.getValue();
        this.eventsSubject.next([...currentEvents, newEvent]);
      })
    );
  }

  updateEvent(id: string, updated: Partial<Event>): Observable<Event> {
    const currentEvents = this.eventsSubject.getValue();
    const existingEvent = currentEvents.find((e) => e.id === id);

    if (!existingEvent) {
      throw new Error("Event not found");
    }

    // Merge existing fields to avoid losing anything
    const mergedUpdate: Event = {
      ...existingEvent,
      ...updated,
    };

    return this.http.put<Event>(`${this.baseUrl}/${id}`, mergedUpdate).pipe(
      tap((updatedEventFromBackend) => {
        const updatedEvents = currentEvents.map((e) =>
          e.id === id ? updatedEventFromBackend : e
        );
        this.eventsSubject.next(updatedEvents);
      })
    );
  }

  deleteEvent(id: string): Observable<void> {
    if (!id) {
      console.warn("Tried to delete an event with no ID!");
      return of(void 0);
    }

    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentEvents = this.eventsSubject.value;
        const updatedEvents = currentEvents.filter((event) => event.id !== id);
        this.eventsSubject.next(updatedEvents);
      })
    );
  }

  getUserEvents(userEmail: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}?userId=${userEmail}`);
  }
}
