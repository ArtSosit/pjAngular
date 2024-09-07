import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isRegistered = false; 
  user = {
    userID:'',
    username: '',
    email: '',
    password: '',
    storeImage: '',
    storeName: '',
    storeDetails: '',
    contactInfo: '',
    promptpay: '',
    promptpayimage: '',
    openTime: '',
    closeTime: ''
  };
  storeImage: File | null = null;
  promptpayImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  
  constructor(private authService: AuthService,private http: HttpClient,private router: Router) { }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.user.storeImage = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  onRegister() {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful!', response);
        this.user.userID = response.userID;
        this.isRegistered = true;
      },
      error => {
        console.error('Error registering user', error);
      }
    );
// this.isRegistered = true;
  }
    onSubmitAdditionalInfo() {
    const formData = new FormData();

      // Append form fields
    formData.append('userID', this.user.userID);
    formData.append('storeName', this.user.storeName);
    formData.append('storeDetails', this.user.storeDetails);
    formData.append('contactInfo', this.user.contactInfo);
    formData.append('promptpay', this.user.promptpay);
      formData.append('openTime', this.user.openTime);
      formData.append('closeTime', this.user.closeTime);
      
    console.log('Form fields:');
    // console.log('userID:', this.user.userID);
    // console.log('storeName:', this.user.storeName);
    // console.log('storeDetails:', this.user.storeDetails);
    console.log('contactInfo:', this.user.contactInfo);
      console.log('promptpay:', this.user.promptpay);
      console.log('close', this.user.closeTime)
    // Append files
    if (this.storeImage) {
      formData.append('storeImage', this.storeImage, this.storeImage.name);
    }
    if (this.promptpayImage) {
      formData.append('promptpayimage', this.promptpayImage, this.promptpayImage.name);
    }

    // Send the request
    this.http.post('https://pjserver.onrender.com/api/additional-info', formData).subscribe(
      (response: any) => {
        console.log('Data added successfully:', response);
        // Handle successful response
        this.router.navigate(['/main']);
      },
      (error: any) => {
        console.error('Error adding data:', error);
        // Handle error response
      }
      );
      // this.router.navigate(['/main']);
  }

  // Handler for file input change
  onFileChange(event: any, fileType: 'storeImage' | 'promptpayImage') {
    const file = event.target.files[0];
    if (fileType === 'storeImage') {
      this.storeImage = file;
    } else if (fileType === 'promptpayImage') {
      this.promptpayImage = file;
    }
  }
}
