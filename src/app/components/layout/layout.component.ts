import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { PaymentPartnersComponent } from '../payment-partners/payment-partners.component';
import { WhatsappFloatComponent } from '../whatsapp-float/whatsapp-float.component';
import { UnidadesComponent } from '../unidades/unidades.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    NavbarComponent, 
    CommonModule, 
    PaymentPartnersComponent, 
    WhatsappFloatComponent
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isLoggedIn = !!localStorage.getItem('savedEmail');

  @ViewChild(UnidadesComponent) unidadesComponent!: UnidadesComponent;

  // Atualizado para aceitar null
  onPositionFound(position: GeolocationPosition | null): void {
    if (position && this.unidadesComponent) {
      this.unidadesComponent.updateUserPosition(position);
    } else if (this.unidadesComponent) {
      // Tratamento para quando a geolocalização é desativada (position = null)
      this.unidadesComponent.updateUserPosition(null);
    }
  }

  findNearbyGyms(latitude: number, longitude: number) {
    // Implementação existente
  }

  handleLocation(position: any) {
    if (position?.coords) {
      this.findNearbyGyms(position.coords.latitude, position.coords.longitude);
    }
  }
}