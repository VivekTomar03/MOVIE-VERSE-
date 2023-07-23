import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  constructor(private router: Router,private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/admin-login']);
    }
  }


  logout() {
   
    // Remove the token key from local storage
    Swal.fire({
     
      icon: 'success',
      title: 'You have beed logout successfully',
      showConfirmButton: false,
      timer: 1500
    })
    localStorage.removeItem('token');
    localStorage.removeItem("admin")


    // Redirect to the login page
    this.router.navigate(['/admin-login']);
  }

  navigateToUserManagement() {
    this.router.navigate(['/user-management']);
  }
  navigateToMovieManagement() {
    this.router.navigate(['/movie-management']);
  }
  navigateToShowManagement(){
    this.router.navigate(['/show-management']);
  }
  navigateToEventManagement(){
    this.router.navigate(['/event-management']);
  }
  navigateToParicipantManagement(){
    this.router.navigate(['/participant-management']);
  }
}
