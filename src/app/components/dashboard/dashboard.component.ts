import { Component } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DistanceService } from '../../services/distance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  position: GeolocationPosition | null = null;
  nearestUnits: { name: string; distance: number }[] = [];

  constructor(private geolocationService: GeolocationService,  private distanceService: DistanceService) {}

  findNearest(): void {
    const units = [
      { name: 'Unidade Vila Ema', latitude: -23.5962868, longitude: -46.5277673 },
      { name: 'Unidade Centro', latitude: -23.55052, longitude: -46.633308 },
      { name: 'Unidade Moema', latitude: -23.60881, longitude: -46.67144 },
    ];

    this.geolocationService.getCurrentPosition().then(
      (position) => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        this.nearestUnits = this.distanceService.findNearestUnits(userLocation, units);
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  }

  getLocation(): void {
    this.geolocationService.getCurrentPosition().then(
      (position) => {
        if (position && position.coords) {
          this.position = position;
         
        } else {
          console.error('A posição ou coordenadas são inválidas.');
        }
      },
      (error) => {
        console.error('Erro ao obter localização:', error);
      }
    );
  }
}

