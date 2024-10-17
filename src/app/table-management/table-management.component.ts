import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.css'
})
export class TableManagementComponent implements OnInit {
  tables: any[] = [];
   userId: string | null = null;
  constructor(private https: HttpClient, private router: Router) { }
  ngOnInit(): void {
  this.userId = localStorage.getItem('userId');
    this.https.get < any[]>('http://localhost:3000/api/tables/'+this.userId).subscribe(data => {
      this.tables = data;
      console.log('Tables:', this.tables);
    });
  }
  removeTable(tableId: number) {
    this.https.delete('http://localhost:3000/api/tables/' +   this.tables[tableId].id).subscribe(() => {
      this.tables = this.tables.filter(table => table.id !== tableId);
    });
  }

  
    
}