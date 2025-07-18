import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UnidadesComponent } from "../unidades/unidades.component";
import { HttpClientModule } from '@angular/common/http';
import { UnidadeService } from '../../services/unidade.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, UnidadesComponent, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
   providers: [UnidadeService],
})
export class DashboardComponent {
  userPosition: GeolocationPosition | null = null;

  onPositionFound(position: GeolocationPosition): void {
    this.userPosition = position;
  }
}

