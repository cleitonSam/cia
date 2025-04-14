import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { LocationToggleComponent } from '../location-toggle/location-toggle.component';
import { PaymentPartnersComponent } from '../payment-partners/payment-partners.component';
import { WhatsappFloatComponent } from '../whatsapp-float/whatsapp-float.component';
import { UnidadesComponent } from '../unidades/unidades.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, LocationToggleComponent, PaymentPartnersComponent, WhatsappFloatComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isLoggedIn = !!localStorage.getItem('savedEmail');


  findNearbyGyms(latitude: number, longitude: number) {

  }
  handleLocation(position: any) {
    if (position?.coords) {
      // Now this will work
      this.findNearbyGyms(position.coords.latitude, position.coords.longitude);
    }
  }

  @ViewChild(UnidadesComponent) unidadesComponent!: UnidadesComponent;

  onPositionFound(position: GeolocationPosition): void {
    if (this.unidadesComponent) {
      this.unidadesComponent.updateUserPosition(position); // Chama o método do componente filho
    }
  }
}
