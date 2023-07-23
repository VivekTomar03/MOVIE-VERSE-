import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Movie {
  title: string;
  language: string;
  poster: string;
  description: string;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie: any = null;
  selectedMovie1: any = null;
  showBookingConfirmationModal: boolean = false;
  selectedSeat: string = '';
  paymentDetails: any = {
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  };
  dataLoaded:boolean=false
  isPaymentDetailsFilled: boolean = false;
  isViewModalOpen:boolean= true
  seatLayout: any = {
    rows: ['A', 'B', 'C', 'D'],
    columns: ['1', '2', '3', '4', '5', '6', '7', '8'],
    availableSeats: ['A1', 'B5', 'C3'],
    bookedSeats: ['A2', 'B3', 'D4'],
    selectedSeats: [] // To store the user-selected seats
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Make the HTTP GET request to fetch movies
    this.dataLoaded = false;
    this.http.get<Movie[]>('https://movie-verse-l2o2.onrender.com/movies').subscribe(
      (data) => {
       
        this.movies = data;
        this.dataLoaded= true
      },
      (error) => {
        console.error('Error fetching movies:', error);
        // Handle any error messages or display a toast/notification here
      }
    );
   
    
  }

  onSelectMovie(movie: any) {
    this.selectedMovie = movie;
  }

  // Function to handle the booking process
  bookMovie() {
     if(localStorage.getItem('usertoken')){
       // Check if a movie is selected
    if (!this.selectedMovie) {
      return;
    }

    // If a movie is selected and it's not a Regular membership, show the payment modal
    if (this.selectedMovie.membership_type !== 'Regular') {
      const paymentModal = document.getElementById('payment-modal');
      if (paymentModal) {
        paymentModal.classList.add('active');
      }
    } else {
      // If it's a Regular membership, directly book the movie without payment
      this.performBooking();
    }
     }
     else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You Are Not Login!!! Please Login First',
        footer: '<a href="/login">Please click here to login!!!</a>'
      })
     }
  }

  // Function to handle the payment process
  pay() {
    const selectedSeat = 'A1';
    // Perform payment logic here (you can show a success message using Swal.fire() after the payment process is completed)
    Swal.fire(
      'Booking Confirmation  uuuuuu',
      `You have selected seat ${selectedSeat} for movie ${this.selectedMovie.title}.`,
      'success'
    );
    // Hide the modal after payment is successful
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
      paymentModal.classList.remove('active');
    }
  }

  // Function to close the modal
  closeModal() {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
      paymentModal.classList.remove('active');
    }
  }

  // Function to perform the booking process
  performBooking() {
    // Implement seat selection logic here
    // For now, let's use a dummy seat "A1"
    const selectedSeat = 'A1';

    // Show the booking confirmation message using Swal.fire()
    Swal.fire(
      'Booking Confirmation',
      `You have selected seat ${selectedSeat} for movie ${this.selectedMovie.title}.`,
      'success'
    );
    

    // Clear the selected movie after booking
    this.selectedMovie = null;
  }

  closeSeatsModal() {
    // Hide the seat layout modal
    const seatsModal = document.getElementById('seats-modal');
    if (seatsModal) {
      seatsModal.classList.remove('active');
    }
  }

  viewSeats() {
    // Check if cardNumber and cvv are filled
    if (this.paymentDetails.cardNumber.trim() !== '' && this.paymentDetails.cvv.trim() !== '') {
      // Show the seat layout modal
      const seatsModal = document.getElementById('seats-modal');
      if (seatsModal) {
        seatsModal.classList.add('active');
      }
      this.isPaymentDetailsFilled = true;
    } else {
      this.isPaymentDetailsFilled = false;
    }
  }

  // Function to handle seat selection
  toggleSeatSelection(seat: string) {
    const index = this.seatLayout.selectedSeats.indexOf(seat);
    if (index === -1) {
      // Seat is not selected, so add it to selectedSeats array
      this.seatLayout.selectedSeats.push(seat);
    } else {
      // Seat is already selected, so remove it from selectedSeats array
      this.seatLayout.selectedSeats.splice(index, 1);
    }
  }

  viewShow(movie: any) {
    this.selectedMovie1 = movie;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
    this.isViewModalOpen = false;
  }

}
