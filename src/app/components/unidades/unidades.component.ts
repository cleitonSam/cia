import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { UnidadeService } from '../../services/unidade.service';
import { UnitCardComponent } from '../unit-card/unit-card.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GeolocationService } from '../../services/geolocation.service';


@Component({
  selector: 'app-unidades',
  standalone: true,
  imports: [UnitCardComponent, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './unidades.component.html',
  styleUrl: './unidades.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [UnidadeService],
})
export class UnidadesComponent implements OnInit {
  userPosition: GeolocationPosition | null = null;
  unidades: any[] = [];
  unidadesFiltradas: any[] = [];
  modalidadesDisponiveis: string[] = [];
  modalidadeSelecionada: string = '';
  loading = true;
  error: string | null = null;
  termoBusca = '';

  constructor(
    private unidadeService: UnidadeService,
    private geolocationService: GeolocationService
  ) {}

  ngOnInit(): void {
    this.carregarUnidades();
  }

  carregarUnidades(): void {
    this.unidadeService.getUnidades().subscribe({
      next: (unidades) => {
        this.unidades = unidades;
        this.unidadesFiltradas = [...this.unidades];
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
    // Extrai todas as modalidades únicas das unidades
    const todasModalidades = this.unidades
      .map(u => u.modalidade.split(', ')) // Divide strings como "Dança, zumba" em array
      .flat() // Achata o array de arrays
      .map(m => m.trim()) // Remove espaços em branco
      .filter(m => m.length > 0); // Remove strings vazias

    // Remove duplicatas e ordena
    this.modalidadesDisponiveis = [...new Set(todasModalidades)].sort();
  }

  updateUserPosition(position: GeolocationPosition): void {
    this.userPosition = position;
    this.filtrarUnidades(); // Reaplica o filtro e ordena por proximidade
  }

  ordenarPorProximidade(): void {
    if (!this.userPosition || this.unidadesFiltradas.length === 0) return;

    const userLat = this.userPosition.coords.latitude;
    const userLng = this.userPosition.coords.longitude;

    this.unidadesFiltradas = this.unidadesFiltradas.map(unidade => {
      const distance = this.calcularDistancia(
        userLat,
        userLng,
        unidade.latitude,
        unidade.longitude
      );
      return { ...unidade, distance };
    }).sort((a, b) => a.distance - b.distance);
  }

  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // Distância em metros
  }

  filtrarUnidades(): void {
    let unidadesFiltradas = [...this.unidades];

    // Filtro por modalidade
    if (this.modalidadeSelecionada) {
      unidadesFiltradas = unidadesFiltradas.filter(unidade =>
        unidade.modalidade.includes(this.modalidadeSelecionada)
      );
    }

    // Filtro por termo de busca
    if (this.termoBusca) {
      const termoNormalizado = this.normalizarTexto(this.termoBusca.toLowerCase());
      unidadesFiltradas = unidadesFiltradas.filter(unidade =>
        this.normalizarTexto(unidade.name.toLowerCase()).includes(termoNormalizado) ||
        this.normalizarTexto(unidade.address.toLowerCase()).includes(termoNormalizado) ||
        this.normalizarTexto(unidade.district.toLowerCase()).includes(termoNormalizado)
      );
    }

    this.unidadesFiltradas = unidadesFiltradas;

    if (this.userPosition) {
      this.ordenarPorProximidade();
    }
  }

  normalizarTexto(texto: string): string {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
           .replace(/[^a-zA-Z0-9]/g, '');
  }

  handleViewDetails(unit: any) {
    console.log('Ver detalhes:', unit);
  }

  handleSubscribe(unit: any) {
    console.log('Assinar agora:', unit);
  }
}