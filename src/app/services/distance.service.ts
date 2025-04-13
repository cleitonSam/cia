import { Injectable } from '@angular/core';
import { getDistance } from 'geolib';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  constructor() {}

  // Calcula a distância entre duas coordenadas
  calculateDistance(
    userLocation: { latitude: number; longitude: number },
    unitLocation: { latitude: number; longitude: number }
  ): number {
    return getDistance(userLocation, unitLocation);
  }

  // Encontra as unidades mais próximas
  findNearestUnits(
    userLocation: { latitude: number; longitude: number },
    units: { name: string; latitude: number; longitude: number }[]
  ): { name: string; distance: number }[] {
    return units
      .map((unit) => ({
        name: unit.name,
        distance: this.calculateDistance(userLocation, {
          latitude: unit.latitude,
          longitude: unit.longitude,
        }),
      }))
      .sort((a, b) => a.distance - b.distance); // Ordena por distância
  }
}