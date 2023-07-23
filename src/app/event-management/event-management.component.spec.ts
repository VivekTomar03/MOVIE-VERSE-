import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagementComponent } from './event-management.component';

describe('EventManagementComponent', () => {
  let component: EventManagementComponent;
  let fixture: ComponentFixture<EventManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventManagementComponent]
    });
    fixture = TestBed.createComponent(EventManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
