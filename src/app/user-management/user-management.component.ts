import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: any[] = []; // Array to store user data
  selectedUser: any;
  showAddUserModal = false;
  newUser: any = {};
  editUserObj:any={}
  showEditUserModal= false
  constructor(private userService: UserService,private http: HttpClient) {}

  ngOnInit() {
    // Fetch user data from the service
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
    this.showAddUserModal = true; // Show the add user modal
    this.newUser = {  // Initialize the new user object
      username: '',
      bio: '',
      date_of_birth: '',
      gender: 'Male',
      membership_type: '',
      user_status: false,
      password:""
    };
  }
  submitUser() {
    // Implement logic to submit the new user data
    console.log('New User:', this.newUser);

    // Perform the HTTP POST request to add the user
    this.http.post('https://movie-verse-l2o2.onrender.com/users', this.newUser).subscribe(
      (response) => {
        console.log('User added successfully:', response);
        Swal.fire(
          'Good job!',
          'User added successfully',
          'success'
        )


        // Clear the form and close the modal
        this.newUser = {}; // Reset the newUser object
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
          footer: '<a href="">Why do I have this issue?</a>'
        })
        console.error('Error adding user:', error);
        // Handle the error and display an error message
      }
    );
  }

  
  closeAddUserModal() {
    this.showAddUserModal = false; // Hide the add user modal
  }

  viewUserDetails(user: any) {
    this.selectedUser = user;
  }

  closeModal() {
    this.selectedUser = null;
  }

  editUser(user: any) {
    console.log(user)
    this.editUserObj = { ...user };
    this.showEditUserModal = true; // Show the edit user modal
    console.log('Updated User:', this.editUserObj.id);
  }

  updateUser() {
    console.log('Updated User:', this.editUserObj.id);
    
    // Perform the HTTP PUT request to update the user
    this.http.put(`https://movie-verse-l2o2.onrender.com/users/${this.editUserObj.id}`  , this.editUserObj).subscribe(
      (response) => {
        console.log('User updated successfully:', response);
        // Close the modal
        Swal.fire(
          'Good job!',
          'User updated successfully:',
          'success'
        )

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
    this.showEditUserModal = false; // Hide the edit user modal
  }

  deleteUser(userId: number) {
    // Send the delete request
  this.http.delete(`https://movie-verse-l2o2.onrender.com/users/${userId}`).subscribe(
    (response) => {
      // Handle the successful deletion
      console.log('User deleted successfully:', response);
      // Update the users list or perform additional actions
      Swal.fire(
        'Good job!',
        'User deleted successfully',
        'success'
      )
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
      // Handle the deletion error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, ',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      console.error('User deletion error:', error);
      // Display an error message or perform additional error handling
    }
  );
  }
}
