import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieManagementComponent } from './movie-management.component';

describe('MovieManagementComponent', () => {
  let component: MovieManagementComponent;
  let fixture: ComponentFixture<MovieManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieManagementComponent]
    });
    fixture = TestBed.createComponent(MovieManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
