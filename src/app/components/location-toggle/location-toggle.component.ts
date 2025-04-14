import { Component, EventEmitter, Output } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-toggle.component.html',
  styleUrl: './location-toggle.component.css'
})
export class LocationToggleComponent {
  isActive = false;
  error: string | null = null;

  @Output() positionFound = new EventEmitter<GeolocationPosition>();

  constructor(private geolocationService: GeolocationService) {}

  toggleLocation(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.getLocation();
    }
  }

  private getLocation(): void {
    this.error = null;
    
    this.geolocationService.getCurrentPosition()
      .then((position) => {
        this.positionFound.emit(position);
        console.log(position)
      })
      .catch((error) => {
        this.error = error;
        this.isActive = false;
        setTimeout(() => this.error = null, 5000);
      });
  }
}