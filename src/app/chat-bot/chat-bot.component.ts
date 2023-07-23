import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface Movie {
  description: string;
  id: string;
  language: string;
  poster: string;
  title: string;
}
interface ChatMessage {
  text: string;
  isBotResponse: boolean;
}

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent {
  chatMessages: ChatMessage[] = [];
  userInput: string = '';
  showModal: boolean = false;
  topRecommendedMovies: Movie[] = [];
  constructor(private http: HttpClient) {}

  sendMessage() {
    if (this.userInput.trim() === '') return;

    // Save user message to chat messages
    this.chatMessages.push({ text: this.userInput, isBotResponse: false });

    // Make POST request to the chat endpoint
    this.http.post<any>('https://movie-verse-l2o2.onrender.com/chat', { message: this.userInput }).subscribe(
      (response) => {
        // Save bot response to chat messages
        this.chatMessages.push({ text: response.response, isBotResponse: true });

        // Clear the user input
        this.userInput = '';
      },
      (error) => {
        console.error('Error fetching bot response:', error);
        // Handle any error messages or display a toast/notification here
      }
    );
  }

  openModal() {
    const data = [
      {
        "description": "A thief who enters the dreams of others to steal their secrets !!!!",
        "id": "64b8f0a1f2375d61072fe65c",
        "language": "English",
        "poster": "https://i.etsystatic.com/25433423/r/il/dfc97f/2692744791/il_570xN.2692744791_o45d.jpg",
        "title": "Inception  2"
      },
      {
        "description": "An alien on Earth loses the only device he can use to communicate with his spaceship. His innocent nature and child-like questions force the country to evaluate the impact of there religious views on there people.",
        "id": "64b93f9dcfd3a807165053b7",
        "language": "Hindi",
        "poster": "https://im.rediff.com/movies/2014/sep/17pk-poll1.jpg",
        "title": "PK"
      },
      {
        "description": "A young man and woman fall in love during a trip to Europe, but face challenges from their traditional families.",
        "id": "64bbddc6944f37376e207ecb",
        "language": "Hindi",
        "poster": "https://i.pinimg.com/474x/c6/de/94/c6de9410f1c5c689555e840e13b88041.jpg",
        "title": "Dilwale Dulhania Le Jayenge"
      }
    ]
          this.topRecommendedMovies = data;
          this.showModal = true;
       
  }

  // Function to close the modal
  closeModal() {
    this.showModal = false;
  }
}

