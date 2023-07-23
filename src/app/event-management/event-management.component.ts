import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.css']
})
export class EventManagementComponent implements OnInit {
  events: any[] = [];
  selectedEvent: any = null;
  isViewModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isAddModalOpen: boolean = false; // New property for showing the add event modal
  editedEvent: any = {};
  newEvent: any = {}; 

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.http.get<any[]>('https://movie-verse-l2o2.onrender.com/events')
      .subscribe((events) => {
        
        this.events = events;
      });
  }

  addEvent() {
    // Open the modal for adding a new event
    this.isAddModalOpen = true;
    // Clear the new event data from any previous values
    this.newEvent = {
      title: '',
      description: '',
      date: '',
      time: '',
      poster:""
    };
  }

  closeAddModal() {
    // Close the add event modal
    this.isAddModalOpen = false;
  }

  submitAddEventForm() {
    // Send POST request to add the new event
    this.http.post('https://movie-verse-l2o2.onrender.com/events', this.newEvent)
      .subscribe(() => {
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
        this.fetchEvents(); // Refresh the events list after successful addition
        this.isAddModalOpen = false; // Close the modal after adding
      });
  }

  viewEvent(event: any) {
    this.selectedEvent = event;
    this.isViewModalOpen = true;
  }

  closeViewModal() {
    this.isViewModalOpen = false;
  }

  editEvent(event: any) {
    this.selectedEvent = event;
    // Make a copy of the event data to avoid direct mutation
    this.editedEvent = { ...event };
    this.isEditModalOpen = true; // Open the modal for editing
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }

  saveEditedEvent() {
    // Send PUT request to update the event
    this.http
      .put(`https://movie-verse-l2o2.onrender.com/events/${this.editedEvent.id}`, this.editedEvent)
      .subscribe(() => {
    
        Swal.fire(
          'Good job!',
          'Event edit successfull',
          'success'
        )
        this.fetchEvents(); // Refresh the events list after successful update
        this.isEditModalOpen = false; // Close the modal after saving
      });
  }

  deleteEvent(eventId: string) {
    const confirmation = confirm('Are you sure you want to delete this event?');
    if (confirmation) {
      this.http.delete(`https://movie-verse-l2o2.onrender.com/events/${eventId}`)
        .subscribe(() => {
          Swal.fire(
            'Good job!',
            'Event deleted successfull',
            'success'
          )
          this.fetchEvents(); // Refresh the events list after successful deletion
        });
    }
  }
}
