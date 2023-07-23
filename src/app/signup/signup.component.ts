import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent {
  newUser = {
    username: '',
    bio: '',
    date_of_birth: '',
    gender: '',
    membership_type: '',
    user_status: false,
    password: '',
  };
  showPaymentModal = false;
  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  };

  constructor(private router: Router, private http: HttpClient) {}

  submitUser() {
    if (
      this.newUser.membership_type === 'Premium' ||
      this.newUser.membership_type === 'VIP'
    ) {
      this.showPaymentModal = true;
    } else {
      this.createUser();
    }
  }

  createUser() {
    this.http
      .post<any>('https://movie-verse-l2o2.onrender.com/users', this.newUser)
      .subscribe(
        (response) => {
          console.log('User created successfully:', response);
          Swal.fire('Good job!', 'Signup sucessfull', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
  }

  pay() {
    console.log('Payment Details:', this.paymentDetails);
    Swal.fire({
      title:
        'Payment Sucessful with card number   ' +
        this.paymentDetails.cardNumber,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
    this.closePaymentModal();

    this.createUser();
  }

  closePaymentModal() {
    this.paymentDetails = {
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    };
    this.showPaymentModal = false;
  }
}
