import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    // Implement logic to fetch user data from the API
    return this.http.get<any[]>('https://movie-verse-l2o2.onrender.com/users');
  }

  // Implement other methods for adding, updating, and deleting users
}
