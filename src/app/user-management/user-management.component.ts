import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent {
  users: any[] = []; // Array to store user data
  selectedUser: any;
  showAddUserModal = false;
  newUser: any = {};
  editUserObj: any = {};
  showEditUserModal = false;
  constructor(private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addUser() {
    this.showAddUserModal = true;
    this.newUser = {
      username: '',
      bio: '',
      date_of_birth: '',
      gender: 'Male',
      membership_type: '',
      user_status: false,
      password: '',
    };
  }
  submitUser() {
    console.log('New User:', this.newUser);

    this.http
      .post('https://movie-verse-l2o2.onrender.com/users', this.newUser)
      .subscribe(
        (response) => {
          console.log('User added successfully:', response);
          Swal.fire('Good job!', 'User added successfully', 'success');

          this.newUser = {};
          this.userService.getUsers().subscribe(
            (data) => {
              this.users = data;
            },
            (error) => {
              console.error('Error fetching users:', error);
            }
          );
          this.closeAddUserModal();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          });
          console.error('Error adding user:', error);
        }
      );
  }

  closeAddUserModal() {
    this.showAddUserModal = false;
  }

  viewUserDetails(user: any) {
    this.selectedUser = user;
  }

  closeModal() {
    this.selectedUser = null;
  }

  editUser(user: any) {
    console.log(user);
    this.editUserObj = { ...user };
    this.showEditUserModal = true;
    console.log('Updated User:', this.editUserObj.id);
  }

  updateUser() {
    console.log('Updated User:', this.editUserObj.id);

    this.http
      .put(
        `https://movie-verse-l2o2.onrender.com/users/${this.editUserObj.id}`,
        this.editUserObj
      )
      .subscribe(
        (response) => {
          console.log('User updated successfully:', response);

          Swal.fire('Good job!', 'User updated successfully:', 'success');

          this.userService.getUsers().subscribe(
            (data) => {
              this.users = data;
            },
            (error) => {
              console.error('Error fetching users:', error);
            }
          );
          this.closeEditUserModal();
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
  }

  closeEditUserModal() {
    this.showEditUserModal = false;
  }

  deleteUser(userId: number) {
    this.http
      .delete(`https://movie-verse-l2o2.onrender.com/users/${userId}`)
      .subscribe(
        (response) => {
          console.log('User deleted successfully:', response);
          Swal.fire('Good job!', 'User deleted successfully', 'success');
          this.userService.getUsers().subscribe(
            (data) => {
              this.users = data;
            },
            (error) => {
              console.error('Error fetching users:', error);
            }
          );
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong, ',
            footer: '<a href="">Why do I have this issue?</a>',
          });
          console.error('User deletion error:', error);
        }
      );
  }
}
