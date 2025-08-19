import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-card.component.html',
  styleUrls: ['./unit-card.component.css']
})
export class UnitCardComponent {
  @Input() unit: any;
  @Input() distance: number | null = null;
  @Output() onViewDetails = new EventEmitter<any>();

  viewDetails(): void {
    this.onViewDetails.emit(this.unit);
  }

  subscribeNow(): void {
    if (this.unit.link) {
      window.open(this.unit.link, '_blank');
    }
  }

  formatDistance(): string {
    if (this.distance === null) return '';
    return this.distance >= 1000 
      ? `${(this.distance / 1000).toFixed(1)} km` 
      : `${Math.round(this.distance)} m`;
  }
}