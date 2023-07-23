import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  constructor(private router: Router,private http: HttpClient) {}

  submitLogin() {
    // Make the HTTP POST request
    this.http.post<any>('https://movie-verse-l2o2.onrender.com/login', this.user).subscribe(
      (response) => {
        // Handle the success response
        console.log('User login:', response);
          localStorage.setItem("usertoken", response.username)
        // Display SweetAlert on success
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome back, ' + response.username + '!',
          confirmButtonText: 'Continue'
        });
        this.router.navigate(['/']);
        // You can perform redirection or other actions after successful login if needed
      },
      (error) => {
        console.error('Error logging in:', error);
        // Handle any error messages or display a toast/notification here on error
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid credentials. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
