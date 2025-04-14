import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-partners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-partners.component.html',
  styleUrl: './payment-partners.component.css'
})
export class PaymentPartnersComponent implements OnInit, OnDestroy {
  partners = [
    {
      image: '../assets/Meta_CMO_c310c39eb0.avif',
      alt: 'Aceitamos GymPass',
      title: 'Aceitamos GymPass',
      description: 'Utilize seu benefício corporativo em nossa academia',
      class: 'gympass-img'
    },
    {
      image: '../assets/Captura-de-tela-2024-06-16-161459.webp',
      alt: 'Aceitamos TotalPass',
      title: 'Aceitamos TotalPass',
      description: 'Acesso facilitado com seu plano TotalPass',
      class: 'totalpass-img'
    }
  ];

  currentIndex = 0;
  isRotating = false;
  rotationInterval: any;

  ngOnInit() {
    this.startRotation();
  }

  ngOnDestroy() {
    this.stopRotation();
  }

  startRotation() {
    this.rotationInterval = setInterval(() => {
      this.nextPartner();
    }, 5000);
  }

  stopRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }

  nextPartner() {
    this.isRotating = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.partners.length;
      this.isRotating = false;
    }, 300);
  }

  prevPartner() {
    this.isRotating = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.partners.length) % this.partners.length;
      this.isRotating = false;
    }, 300);
  }

  goToPartner(index: number) {
    this.isRotating = true;
    setTimeout(() => {
      this.currentIndex = index;
      this.isRotating = false;
    }, 300);
  }
}