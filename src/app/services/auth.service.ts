// src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/users"; // JSON Server Users endpoint

  constructor(private http: HttpClient) {}

  // Check if email exists
  checkEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  // Register - Create new user
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, email, password });
  }

  // Login - Authenticate user and store token
  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem("token", user.email); // Simple token for this example
            return user;
          }
          throw new Error("Invalid credentials");
        })
      );
  }

  // Logout - Clear the token
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  }

  // Check login status
  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}
