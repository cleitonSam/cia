import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationToggleComponent } from '../location-toggle/location-toggle.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, LocationToggleComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Atualizado para aceitar null
  @Output() positionFound = new EventEmitter<GeolocationPosition | null>();

  constructor(private router: Router) {}

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('savedEmail');
    this.router.navigate(['/login']);
  }

  // Atualizado para aceitar null
  onPositionFound(position: GeolocationPosition | null): void {
    this.positionFound.emit(position);
    console.log(position);
  }
}