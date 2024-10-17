import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders=[
  {
    "tableNumber": 1,
    "items": [
      {
        "name": "ชุดปาร์ตี้หมูรวมทะเล",
        "quantity": 1,
        "price": 499,
        "imageUrl": "assets/no-photos.png"
      },
      {
        "name": "น้ำเปล่า",
        "quantity": 2,
        "price": 20,
        "imageUrl": "assets/no-photos.png"
      }
    ],
    "totalPrice": 519
  },
  {
    "tableNumber": 2,
    "items": [
      {
        "name": "ข้าวผัด",
        "quantity": 2,
        "price": 150,
        "imageUrl": "assets/no-photos.png"
      }
    ],
    "totalPrice": 300
  }
] ;

  ngOnInit(): void {
    this.fetchOrders();
  } 

  fetchOrders(): void {
    // this.orderService.getOrders().subscribe(
    //   (data) => {
    //     this.orders = data; // Assign API data to the orders array
    //   },
    //   (error) => {
    //     console.error('Error fetching orders', error);
    //   }
    // );
  }
}
