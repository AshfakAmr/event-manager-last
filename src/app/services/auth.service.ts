// src/app/services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://event-mockdata.onrender.com/users";
  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            const user = users[0];
            localStorage.setItem("token", user.email);
            return user;
          }
          throw new Error("Invalid credentials");
        })
      );
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }
}
