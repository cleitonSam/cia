import { Component, OnInit, OnDestroy } from '@angular/core';
import { UnidadeService } from '../../services/unidade.service';
import { UnitCardComponent } from '../unit-card/unit-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeolocationService } from '../../services/geolocation.service';
import { LocationToggleComponent } from '../location-toggle/location-toggle.component';

@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [UnitCardComponent, FormsModule, CommonModule, LocationToggleComponent],
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css']
})
export class UnidadesComponent implements OnInit, OnDestroy {
  unidades: any[] = [];
  unidadesFiltradas: any[] = [];
  modalidadesDisponiveis: string[] = [];
  modalidadeSelecionada: string = '';
  loading = true;
  error: string | null = null;
  termoBusca = '';
  locationError: string | null = null;
  private watchId: number | null = null;

  constructor(
    private unidadeService: UnidadeService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(): void {
    this.carregarUnidades();
    this.startWatchingPosition();
  }

  ngOnDestroy(): void {
    this.stopWatchingPosition();
  }

  carregarUnidades(): void {
    this.unidadeService.getUnidades().subscribe({
      next: (unidades) => {
        this.unidades = unidades;
        this.unidadesFiltradas = [...unidades];
        this.carregarModalidades();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar unidades. Tente novamente mais tarde.';
        this.loading = false;
        console.error('Erro ao carregar unidades:', err);
      }
    });
  }

  carregarModalidades(): void {
    const todasModalidades = this.unidades
      .flatMap(u => u.modalidade?.split(', ') || [])
      .map(m => m.trim())
      .filter(m => m.length > 0);

    this.modalidadesDisponiveis = [...new Set(todasModalidades)].sort();
  }

  startWatchingPosition(): void {
    this.watchId = this.geolocationService.watchPosition(
      position => this.updateUserPosition(position),
      error => {
        this.locationError = error;
        this.unidadesFiltradas = [...this.unidadesFiltradas];
      }
    );
  }

  stopWatchingPosition(): void {
    if (this.watchId !== null) {
      this.geolocationService.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  updateUserPosition(position: GeolocationPosition | null): void {
    this.locationError = null;
    
    if (!position) {
      this.unidadesFiltradas.forEach(u => delete u.distance);
      return;
    }

    try {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      
      this.unidadesFiltradas = this.unidadesFiltradas.map(unidade => {
        const distance = this.calcularDistancia(
          userLat,
          userLng,
          unidade.latitude,
          unidade.longitude
        );
        return { ...unidade, distance };
      }).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    } catch (error) {
      this.locationError = 'Erro ao calcular distâncias';
      console.error(error);
    }
  }


  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c);
  }

  filtrarUnidades(): void {
    let resultados = [...this.unidades];

    // Filtro por modalidade
    if (this.modalidadeSelecionada) {
      resultados = resultados.filter(u => 
        u.modalidade?.includes(this.modalidadeSelecionada)
      );
    }

    // Filtro por termo de busca
    if (this.termoBusca) {
      const termo = this.normalizarTexto(this.termoBusca.toLowerCase());
      resultados = resultados.filter(u =>
        this.normalizarTexto(u.name?.toLowerCase()).includes(termo) ||
        this.normalizarTexto(u.address?.toLowerCase()).includes(termo) ||
        this.normalizarTexto(u.district?.toLowerCase()).includes(termo)
      );
    }

    this.unidadesFiltradas = resultados;
  }

  normalizarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
           .replace(/[^a-zA-Z0-9]/g, '');
  }

  handleViewDetails(unit: any): void {
    console.log('Detalhes da unidade:', unit);
    // Aqui você pode implementar navegação para detalhes ou abrir um modal
  }
}