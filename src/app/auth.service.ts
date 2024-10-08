import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // นำเข้า HttpClient
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://pjserver.onrender.com/api/register';

  constructor(private http: HttpClient) { } // ใช้ HttpClient

  register(user: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
