import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent  {
  email: string = '';
  password: string = '';

  constructor(private router: Router,private http: HttpClient) {}
  ngOnInit() {
    if(localStorage.getItem("admin")){
      this.router.navigate(['/admin-dashboard']);
    }
  }
  login() {
    // Send the login request
    const loginData = { email: this.email, password: this.password };
    console.log("login obj",loginData)
    this.http.post('https://movie-verse-l2o2.onrender.com/admin/login', loginData).subscribe((response: any) => {
      if (response.message === 'Admin login successful') {
        // Admin login success
        // Show a toast message or perform any other action
        // Redirect to the admin dashboard
        Swal.fire(
          'Helllo Admin',
          'Welcome Back To Admin Dashboard!!!!',
          'success'
        )
        localStorage.setItem("admin", "Admin")
        localStorage.setItem('token', response.token);
        this.router.navigate(['/admin-dashboard']);
      } else {
        // Admin login failed
        // Show a toast message or handle the error case
        alert(response.message);
      }
    });
  }
}
