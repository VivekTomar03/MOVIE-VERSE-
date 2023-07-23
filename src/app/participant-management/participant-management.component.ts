import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-participant-management',
  templateUrl: './participant-management.component.html',
  styleUrls: ['./participant-management.component.css'],
})
export class ParticipantManagementComponent implements OnInit {
  participants: any[] = [];
  selectedParticipant: any = null;
  isShowModalOpen: boolean = false;
  selectedParticipant1: any = {};
  participantid: any = '';
  isShowModalOpen1: boolean = false;
  deleteEmail: string = '';
  deleteParticipantId: string = '';
  isDeleteModalOpen: boolean = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchParticipants();
  }

  fetchParticipants() {
    this.http
      .get<any[]>('https://movie-verse-l2o2.onrender.com/events')
      .subscribe((participants) => {
        this.participants = participants;
      });
  }

  showParticipant(participant: any) {
    const eventId = participant.id;
    this.http
      .get<any[]>(
        `https://movie-verse-l2o2.onrender.com/events/${eventId}/participants`
      )
      .subscribe((participants) => {
        console.log(participants);
        this.selectedParticipant = participants;
        this.isShowModalOpen = true;
      });
  }

  closeShowModal() {
    this.isShowModalOpen = false;
  }
  addParticipant(participant: any) {
    this.participantid = participant.id;
    this.selectedParticipant1 = {
      email: '',
      name: '',
    };
    this.isShowModalOpen1 = true;
  }

  saveParticipant() {
    const eventId = this.participantid;
    const participantData = {
      email: this.selectedParticipant1.email,
      name: this.selectedParticipant1.name,
    };

    this.http
      .post(
        `https://movie-verse-l2o2.onrender.com/events/${eventId}/participants`,
        participantData
      )
      .subscribe(
        (response) => {
          console.log('Participant added successfully:', response);
          Swal.fire('Good job!', 'Participant added successfully:', 'success');
          this.isShowModalOpen1 = false;
        },
        (error) => {
          console.error('Error adding participant:', error);
        }
      );
  }

  deleteParticipant(participantId: string) {
    this.deleteParticipantId = participantId;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.deleteEmail = '';
  }

  deleteParticipant1() {
    const eventId = this.deleteParticipantId;
    const participantData = {
      email: this.deleteEmail,
    };

    this.http
      .delete(
        `https://movie-verse-l2o2.onrender.com/events/${eventId}/participants`,
        { body: participantData }
      )
      .subscribe(
        (response) => {
          console.log('Participant deleted successfully:', response);
          Swal.fire('Good job!', 'Participant deleted successfully', 'success');
          this.isDeleteModalOpen = false;
        },
        (error) => {
          console.error('Error deleting participant:', error);
        }
      );
  }
}
