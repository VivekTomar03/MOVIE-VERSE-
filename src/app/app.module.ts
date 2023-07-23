import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Add this line
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MovieManagementComponent } from './movie-management/movie-management.component';
import { ShowManagementComponent } from './show-management/show-management.component';
import { EventManagementComponent } from './event-management/event-management.component';
import { ParticipantManagementComponent } from './participant-management/participant-management.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MovieComponent } from './movie/movie.component';
import { EventComponent } from './event/event.component';
import { ChatBotComponent } from './chat-bot/chat-bot.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserManagementComponent,
    MovieManagementComponent,
    ShowManagementComponent,
    EventManagementComponent,
    ParticipantManagementComponent,
    SignUpComponent,
    LoginComponent,
    MovieComponent,
    EventComponent,
    ChatBotComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add this line
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

 
}
