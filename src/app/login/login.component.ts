import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string | null = null;

  private apiUrl = 'http://localhost:3000/api/login'; // URL ของ API ที่คุณใช้

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    const loginData = { email: this.email, password: this.password };

    this.http.post(this.apiUrl, loginData).subscribe(
      (response: any) => {
        // Handle successful login here
        console.log('Login successful:', response);
        this.router.navigate(['/show']); // เปลี่ยนเส้นทางหลังจากล็อกอินสำเร็จ
      },
      (error) => {
        // Handle login error here
        console.error('Login error:', error);
        this.loginError = 'Invalid credentials. Please try again.';
      }
    );
  }
}
