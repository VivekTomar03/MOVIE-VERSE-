import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
