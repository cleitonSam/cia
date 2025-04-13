import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  // Método para obter a posição atual
  getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalização não suportada pelo navegador.');
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    });
  }

  // Método para monitorar a posição continuamente
  watchPosition(
    successCallback: (position: GeolocationPosition) => void,
    errorCallback?: (error: GeolocationPositionError) => void
  ): number | undefined {
    if (!navigator.geolocation) {
      console.error('Geolocalização não suportada pelo navegador.');
      return;
    }
    return navigator.geolocation.watchPosition(successCallback, errorCallback);
  }

  // Método para parar o monitoramento
  clearWatch(watchId: number): void {
    navigator.geolocation.clearWatch(watchId);
  }
}