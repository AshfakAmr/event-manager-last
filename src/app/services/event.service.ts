import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  userId: string; // This is where the user's email is stored in the event
}

@Injectable({
  providedIn: "root",
})
export class EventService {
  private baseUrl = "http://localhost:3000/events";

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventById(id: string): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, event);
  }

  updateEvent(id: string, event: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, event);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Fetch events for a particular user based on their email (which is stored in 'userId' in events)
  getUserEvents(userEmail: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}?userId=${userEmail}`);
  }
}
