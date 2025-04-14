import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationToggleComponent } from './location-toggle.component';

describe('LocationToggleComponent', () => {
  let component: LocationToggleComponent;
  let fixture: ComponentFixture<LocationToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationToggleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
