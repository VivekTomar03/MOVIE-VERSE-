import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-management',
  templateUrl: './show-management.component.html',
  styleUrls: ['./show-management.component.css'],
})
export class ShowManagementComponent implements OnInit {
  movies: any[] = [];
  selectedMovie: any = null;
  isViewModalOpen: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http
      .get<any[]>('https://movie-verse-l2o2.onrender.com/movies')
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

  addShow(movie: any) {
    const id = movie.id;
    const newshow = {
      title: movie.title,
      poster: movie.poster,
      language: movie.language,
      description: movie.description,
    };

    this.http
      .post(
        `https://movie-verse-l2o2.onrender.com/movies/${movie.id}/shows`,
        newshow
      )
      .subscribe(
        (response) => {
          console.log(response);

          Swal.fire('Good job!', 'show added with time', 'success');
        },
        (error) => {
          console.error('Error adding show:', error);
        }
      );
  }

  closeAddModal() {}

  submitAddShowForm() {}

  editShow(movie: any) {}

  deleteShow(movieId: string) {}
}
