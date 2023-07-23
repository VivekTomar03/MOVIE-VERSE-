import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowManagementComponent } from './show-management.component';

describe('ShowManagementComponent', () => {
  let component: ShowManagementComponent;
  let fixture: ComponentFixture<ShowManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowManagementComponent]
    });
    fixture = TestBed.createComponent(ShowManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
