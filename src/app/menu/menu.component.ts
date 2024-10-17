import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: any[] = [];
  userId: string | null = null;
  categories: any[] = [];
  newMenu: any = { name: '', price: 0, category: '', imageUrl: '' };
  newCategory: string = '';
  addingNewCategory: boolean = false;
  showModal: boolean = false;
  editModal: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ดึงข้อมูลจากไฟล์ JSON หรือ API
    this.userId = localStorage.getItem('userId');
    this.http.get<any[]>('http://localhost:3000/api/categories/'+this.userId).subscribe(data => {
      this.categories = data;
    })
    this.http.get<any[]>('http://localhost:3000/api/menus/'+this.userId+'').subscribe(data => {
      this.menus = data;
    });
  }

  checkCategory(event: any) {
    // เช็คว่าผู้ใช้เลือก "เพิ่มหมวดหมู่ใหม่" หรือไม่
    if (event.target.value === 'new') {
      this.addingNewCategory = true;
    } else {
      this.addingNewCategory = false;
    }
  }

  addMenu() {
  if (this.addingNewCategory) {
    // เรียก API เพื่อเพิ่มหมวดหมู่ใหม่
    this.http.post<any>('http://localhost:3000/api/categories', { store_id: this.userId, name: this.newCategory }).subscribe(
      (response) => {
        const newCategoryId = response.id; // รับ ID ของหมวดหมู่ที่เพิ่มใหม่
        console.log('New category ID:', newCategoryId);
        // เพิ่มเมนูใหม่พร้อมกับใช้ ID ของหมวดหมู่ที่เพิ่มใหม่
        this.saveMenu(newCategoryId);
        
        // รีเซ็ตหมวดหมู่ใหม่
        this.newCategory = '';
      },
      (error) => {  
        console.error('Error adding new category:', error);
      }
    );
  } else {
    // ใช้หมวดหมู่ที่เลือกจาก dropdown (ไม่ใช่หมวดหมู่ใหม่)
    console.log('Selected category:', this.newMenu.category.category_id);
    const categoryId = this.newMenu.category.category_id;
    this.saveMenu(this.newMenu.category.category_id);
    // if (selectedCategory) {
      
    //   console.log('Selected category:', selectedCategory);
    // }
    // else {
    //   alert('กรุณาเลือกหมวดหมู่ที่ถูกต้อง');
    // }
  }
}
  saveMenu(categoryId: string) {
  // ตรวจสอบ categoryId
  console.log("Category ID: in saveMenu", categoryId); // ตรวจสอบว่าถูกต้องหรือไม่

  // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
  if (this.newMenu.name && this.newMenu.price) {
    const menuData = {
      category_id: categoryId,
      store_id: this.userId, 
      name: this.newMenu.name,
      price: this.newMenu.price,
      item_image: this.newMenu.imageUrl
    };

    console.log("Menu Data:", menuData); // ตรวจสอบข้อมูลที่กำลังจะส่งไปยัง API

    // เรียก API เพื่อเพิ่มเมนูใหม่
    this.http.post<any>('http://localhost:3000/api/menus', menuData).subscribe(
      (response) => {
        this.menus.push(response); // เพิ่มเมนูใหม่ลงในรายการที่แสดงบนหน้าเว็บ
        this.newMenu = { name: '', price: 0, category: '', imageUrl: '' }; // รีเซ็ตฟอร์ม
        this.newCategory = ''; // รีเซ็ตหมวดหมู่ใหม่
        this.addingNewCategory = false; // ปิดการเพิ่มหมวดหมู่ใหม่
        this.showModal = false; // ปิด modal
        location.reload()
      },
      (error) => {
        console.error('Error adding new menu:', error);
      }
    );
  } else {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
  }
  }

  DeleteMenu(id: string) { 
    confirm('คุณต้องการลบหรือไม่?')
    this.http.delete<any>(`http://localhost:3000/api/menus/${id}`).subscribe(
      (response) => {
        
        const index = this.menus.findIndex((menu) => menu.id === id);
        if (index !== -1) {
          this.menus.splice(index, 1);
        }
        location.reload()
      },
      (error) => {
        console.error('Error deleting menu:', error);
      }
    );
  }
  editMenu(menu: any) {
    this.newMenu = { 
        id: menu.item_id,
        name: menu.item_name, 
        price: menu.price, 
        category: menu.category, // ตั้งค่า category ที่ถูกเลือก 
        imageUrl: menu.item_image 
      }; // คัดลอกข้อมูลเมนูที่เลือกเพื่อให้สามารถแก้ไขได้
      this.editModal = true; // เปิด modal
      this.addingNewCategory = false; // รีเซ็ตการเพิ่มหมวดหมู่ใหม่
      console.log("Edit Menu:", this.newMenu);
  }


  editcategory() {
  if (this.addingNewCategory) {
    // เรียก API เพื่อเพิ่มหมวดหมู่ใหม่
    this.http.post<any>('http://localhost:3000/api/categories', { store_id: this.userId, name: this.newCategory }).subscribe(
      (response) => {
        const newCategoryId = response.id; // รับ ID ของหมวดหมู่ที่เพิ่มใหม่
        console.log('New category ID:', newCategoryId);
        // เพิ่มเมนูใหม่พร้อมกับใช้ ID ของหมวดหมู่ที่เพิ่มใหม่
        this.updateMenu(newCategoryId);
        
        // รีเซ็ตหมวดหมู่ใหม่
        this.newCategory = '';
      },
      (error) => {  
        console.error('Error adding new category:', error);
      }
    );
  } else {
    // ใช้หมวดหมู่ที่เลือกจาก dropdown (ไม่ใช่หมวดหมู่ใหม่)
    console.log('Selected category:', this.newMenu.category.category_id);
    const categoryId = this.newMenu.category.category_id;
    this.updateMenu(this.newMenu.category.category_id);
    // if (selectedCategory) {
      
    //   console.log('Selected category:', selectedCategory);
    // }
    // else {
    //   alert('กรุณาเลือกหมวดหมู่ที่ถูกต้อง');
    // }
  }
}


  updateMenu(id: string) {
  // สร้างข้อมูลสำหรับอัปเดตเมนู
  const menuData = {
    category_id: id, // หรือ newMenu.category_id ถ้าตั้งค่าตรงนั้น
    store_id: this.userId, // หรือ store_id ของร้านค้าที่เกี่ยวข้อง
    name: this.newMenu.name,
    price: this.newMenu.price,
    item_image: this.newMenu.imageUrl,
  };

  // เรียก API เพื่ออัปเดตเมนู
  this.http.put<any>(`http://localhost:3000/api/menus/${this.newMenu.id}`, menuData).subscribe(
    (response) => {
      // จัดการกับการตอบกลับเมื่ออัปเดตสำเร็จ
      console.log('Menu updated successfully:', response);
      this.editModal = false; // ปิด modal
      location.reload();
    },
    (error) => {
      console.error('Error updating menu:', error);
      // คุณสามารถเพิ่มโค้ดเพื่อแสดงข้อความผิดพลาดได้ที่นี่
      console.error('Error updating menu:', error);
    }
  );
}

  clearMenu() {
    this.newMenu = { name: '', price: 0, category: '', imageUrl: '' };
    this.editModal = false
    this.showModal = false;
  }
  
  onFileChange(event: any) {
    // จัดการอัปโหลดไฟล์ที่ผู้ใช้เลือก
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newMenu.imageUrl = reader.result as string; // เก็บ URL ของรูปภาพในรูปแบบ base64
      };
      reader.readAsDataURL(file);
    }
  }
}