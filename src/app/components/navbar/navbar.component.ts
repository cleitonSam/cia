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
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() positionFound = new EventEmitter<GeolocationPosition>();

  constructor(private router: Router) {}

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    localStorage.removeItem('savedEmail');
    this.router.navigate(['/login']);
  }

  onPositionFound(position: GeolocationPosition): void {
    this.positionFound.emit(position);
    console.log(position)
  }
}
