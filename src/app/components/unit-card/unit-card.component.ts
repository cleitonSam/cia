import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unit-card',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './unit-card.component.html',
  styleUrl: './unit-card.component.css'
})
export class UnitCardComponent {
  @Input() unit: any;
  @Input() distance: number | any = null;
  @Output() onViewDetails = new EventEmitter<any>();
  @Output() onSubscribe = new EventEmitter<any>();

  viewDetails() {
    this.onViewDetails.emit(this.unit);
  }

  subscribeNow() {
    this.onSubscribe.emit(this.unit);
  }
}
