// unidade.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Unidade {
  name: string;
  address: string;
  district: string;
  city: string;
  image: string;
  badgeText?: string; // Opcional
  latitude: number;
  longitude: number;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  private apiUrl = 'https://api.sheety.co/129fd1f83f6798ca5c4ea7b7cf138bed/cpAlimentos/unidades';

  constructor(private http: HttpClient) { }

  getUnidades(): Observable<Unidade[]> {
    return this.http.get<{ unidades: Unidade[] }>(this.apiUrl).pipe(
      map(response => response.unidades)
    );
  }

  getUnidadesProximas(lat: number, lng: number, raioKm: number = 10): Observable<any[]> {
    return this.getUnidades().pipe(
      map(unidades => {
        return unidades.filter(unidade => {
          const distancia = this.calcularDistancia(
            lat, 
            lng, 
            unidade.latitude, 
            unidade.longitude
          );
          return distancia <= raioKm;
        });
      })
    );
  }

  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distância em km
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}