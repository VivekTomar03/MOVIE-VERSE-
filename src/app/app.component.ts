import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  getAdminLinkText(): string {
    const isAdminLoggedIn = localStorage.getItem('admin');
    return isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login';
  }
  logout() {
    localStorage.removeItem('usertoken');
  }
  getlout() {
    const isAdminLoggedIn = localStorage.getItem('usertoken');
    return isAdminLoggedIn ? 'Logout' : 'Login';
  }
  logoutuser() {
    localStorage.removeItem('usertoken');
  }
  username() {
    const isAdminLoggedIn = localStorage.getItem('usertoken');
    return isAdminLoggedIn ? isAdminLoggedIn : 'Signup';
  }
}
