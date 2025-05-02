import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from "rxjs";

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
  private baseUrl = "https://event-mockdata.onrender.com/events";

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
    return this.http.put<Event>(`${this.baseUrl}/${id}`, updated).pipe(
      tap((updatedEvent) => {
        const currentEvents = this.eventsSubject.getValue();
        const updatedEvents = currentEvents.map((e) =>
          e.id === id ? { ...e, ...updatedEvent } : e
        );
        this.eventsSubject.next(updatedEvents);
      })
    );
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const currentEvents = this.eventsSubject.getValue();
        const updatedEvents = currentEvents.filter((e) => e.id !== id);
        this.eventsSubject.next(updatedEvents);
      })
    );
  }

  getUserEvents(userEmail: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}?userId=${userEmail}`);
  }
}
