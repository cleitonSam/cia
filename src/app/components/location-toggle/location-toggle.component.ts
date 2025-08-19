import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-toggle',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './location-toggle.component.html',
  styleUrls: ['./location-toggle.component.css']
})
export class LocationToggleComponent implements OnDestroy {
  isActive = false;
  error: string | null = null;
  isLoading = false; // Novo estado de carregamento

  @Output() positionFound = new EventEmitter<GeolocationPosition | null>();
  @Output() positionError = new EventEmitter<string>();

  constructor(private geolocationService: GeolocationService) {}

  toggleLocation(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.getLocation();
    } else {
      this.positionFound.emit(null);
    }
  }

  private getLocation(): void {
    this.error = null;
    this.isLoading = true;
    
    this.geolocationService.getCurrentPosition()
      .then(position => {
        this.positionFound.emit(position);
        this.isLoading = false;
      })
      .catch(error => {
        this.error = error;
        this.positionError.emit(error);
        this.isActive = false;
        this.isLoading = false;
        setTimeout(() => this.error = null, 5000);
      });
  }

  ngOnDestroy(): void {
    this.positionFound.emit(null);
  }
}