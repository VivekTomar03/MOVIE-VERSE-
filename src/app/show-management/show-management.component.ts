import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-management',
  templateUrl: './show-management.component.html',
  styleUrls: ['./show-management.component.css']
})
export class ShowManagementComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any = null;
  isViewModalOpen: boolean = false;
  constructor(private http: HttpClient) { }
 

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<any[]>('https://movie-verse-l2o2.onrender.com/movies')
      .subscribe((movies) => {
        this.movies = movies;
      });
  }

  viewShow(movie: any) {
    this.selectedMovie = movie;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
    this.isViewModalOpen = false;
  }
  
  addShow(movie:any) {
   const id = movie.id
   const newshow = {
       title:movie.title,
       poster:movie.poster,
       language:movie.language,
       description:movie.description,
      
   }

   this.http.post(`https://movie-verse-l2o2.onrender.com/movies/${movie.id}/shows`,  newshow)
      .subscribe(
        (response) => {
          // Show added successfully, update the movie object to reflect the changes
         console.log(response)
         
         Swal.fire(
          'Good job!',
          'show added with time',
          'success'
        )
        },
        (error) => {
          // Handle the error here (display an error message, etc.)
          console.error('Error adding show:', error);
        }
      );
  }

  closeAddModal() {
   
  }

  submitAddShowForm() {
   
  }

  editShow(movie: any) {
    // Implement the logic to handle the "Edit Show" button click
    // Open a modal with a form pre-filled with the selected movie's details
    // Allow the user to edit the movie's details and submit the form to update the movie
    // Use a PUT request to `/movies/<movie_id>` to update the movie
  }

  deleteShow(movieId: string) {
    // Implement the logic to handle the "Delete Show" button click
    // Send a DELETE request to `/movies/<movie_id>` to remove the movie
  }
}
