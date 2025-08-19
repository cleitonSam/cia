import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Geolocalização não suportada pelo navegador.');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(this.getPositionError(error)),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
          ...options
        }
      );
    });
  }

  watchPosition(
    successCallback: (position: GeolocationPosition) => void,
    errorCallback?: (error: string) => void,
    options?: PositionOptions
  ): number {
    if (!navigator.geolocation) {
      errorCallback?.('Geolocalização não suportada pelo navegador.');
      return -1;
    }

    return navigator.geolocation.watchPosition(
      (position) => successCallback(position),
      (error) => errorCallback?.(this.getPositionError(error)),
      {
        enableHighAccuracy: true,
        ...options
      }
    );
  }

  clearWatch(watchId: number): void {
    navigator.geolocation.clearWatch(watchId);
  }

  private getPositionError(error: GeolocationPositionError): string {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return 'Permissão de localização negada. Por favor, habilite a localização nas configurações do seu navegador.';
      case error.POSITION_UNAVAILABLE:
        return 'Informações de localização indisponíveis.';
      case error.TIMEOUT:
        return 'Tempo limite para obter localização excedido.';
      default:
        return 'Erro desconhecido ao obter localização.';
    }
  }
}