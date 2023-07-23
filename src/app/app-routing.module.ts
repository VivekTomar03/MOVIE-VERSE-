import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'user-management', component: UserManagementComponent },
  { path: 'movie-management', component: MovieManagementComponent },
  { path: 'show-management', component: ShowManagementComponent },
  { path: 'event-management', component:EventManagementComponent },
  { path: 'participant-management', component:ParticipantManagementComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'event', component: EventComponent },
  { path: 'bot', component: ChatBotComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
