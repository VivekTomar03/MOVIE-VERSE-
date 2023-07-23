import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie-management',
  templateUrl: './movie-management.component.html',
  styleUrls: ['./movie-management.component.css']
})
export class MovieManagementComponent implements OnInit {
  movies: any[] = [];
  isModalOpen: boolean = false;
  isModalOpen1: boolean = false;
  selectedMovie: any = null;
  selectedMovie1: any = null;
  newMovie: any = {
    title: '',
    description: '',
    language: '',
    poster: ''
  };
  isEditModalOpen: boolean = false;
  editedMovie: any = {
    title: '',
    description: '',
    language: '',
    poster: ''
  };

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

  addMovie() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  submitMovieForm() {
    // Send a POST request to add the new movie
    this.http.post('https://movie-verse-l2o2.onrender.com/movies', this.newMovie)
      .subscribe(
        (response) => {
          // The response object contains the data sent by the server
          console.log('Response:', response);
            // alert("Movide Added Successfully")
            Swal.fire(
              'Good job!',
              'Movide Added Successfully',
              'success'
            )
          // Movie added successfully, close the modal and refresh the movie list
          this.closeModal();
          this.fetchMovies();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          // Handle the error here (display an error message, etc.)
          console.error('Error adding movie:', error);
        }
      );
  }

  editMovie(movie: any) {
    this.editedMovie = { ...movie };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  submitEditMovieForm() {
    // Send a PUT request to update the movie's details
    const movieId = this.editedMovie.id;
    this.http.put(`https://movie-verse-l2o2.onrender.com/movies/${movieId}`, this.editedMovie)
      .subscribe(
        (response) => {
          // The response object contains the data sent by the server
          console.log('Response:', response);
          // alert("Movie Updated Successfully");
          Swal.fire(
            'Good job!',
            'Movie Updated Successfully"',
            'success'
          )
          // Movie updated successfully, close the modal and refresh the movie list
          this.closeEditModal();
          this.fetchMovies();
        },
        (error) => {
          // Handle the error here (display an error message, etc.)
          console.error('Error updating movie:', error);
        }
      );
  }

  deleteMovie(movieId: string) {
    // Send a DELETE request to remove the movie from the server
    this.http.delete(`https://movie-verse-l2o2.onrender.com/movies/${movieId}`)
      .subscribe(
        () => {
          // Movie deleted successfully, refresh the movie list
          Swal.fire({
            title: 'Movie Deleted From Database',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
          
          this.fetchMovies();
        },
        (error) => {
          // Handle the error here (display an error message, etc.)
          console.error('Error deleting movie:', error);
        }
      );
  }
  viewUserDetails(movie: any) {
    // Set the selected movie
    this.selectedMovie1= movie;
    // Open the modal only if a movie is selected
    if (this.selectedMovie1) {
      this.isModalOpen1 = true;
    }
  }
  closeModal1() {
    this.isModalOpen1 = false;
  }
}
