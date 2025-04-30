import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/users"; // JSON Server Users endpoint

  constructor(private http: HttpClient) {}

  // Login - Search user by email and check password
  // login(email: string, password: string): Observable<any> {
  //   return this.http.get<any[]>(
  //     `${this.apiUrl}?email=${email}&password=${password}`
  //   );
  //   // GET /users?email=someone@example.com&password=123
  // }

  // Check if email exists
  checkEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
    // GET /users?email=someone@example.com
  }

  // Register - Create new user
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }
}
