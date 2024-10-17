import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // นำเข้า Router เพื่อทำการรีไดเรกต์

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  store: any = {};
  userId: string | null = null; // เพิ่มตัวแปรสำหรับเก็บ userId
  private apiUrl = 'http://localhost:3000/api/stores/'; // URL ของ API สำหรับดึงข้อมูลร้านค้า

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId'); // ดึง userId จาก localStorage
    if (!this.userId) {
      // ถ้าไม่มี userId ให้รีไดเรกต์ไปยังหน้าล็อกอิน
      this.router.navigate(['/login']);
    } else {
      this.fetchMenus(); // เรียกใช้งานฟังก์ชันเมื่อ component ถูกสร้าง
    }
  }

  logout() { 
    localStorage.removeItem('userId');// ลบ localStorage
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }

  fetchMenus() {
    const apiUrlWithUserId = `${this.apiUrl}${this.userId}`; // สร้าง URL พร้อมส่ง userId
    console.log('User ID:', this.userId); // แสดง userId ใน console
    this.http.get<any[]>(apiUrlWithUserId).subscribe(
      (response) => {
        this.store = response; // เก็บข้อมูลใน main
        console.log('Menus fetched:', this.store); // แสดงข้อมูลใน console
      },
      (error) => {
        console.error('Error fetching menus:', error); // แสดงข้อผิดพลาดใน console
      }
    );
  }
}
