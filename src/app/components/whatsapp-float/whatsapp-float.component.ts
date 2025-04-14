import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-float',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-float.component.html',
  styleUrl: './whatsapp-float.component.css'
})
export class WhatsappFloatComponent {
  openWhatsApp() {
    const phoneNumber = '5511999999999'; // Substitua pelo número da academia
    const message = 'Olá CIA MEGA FITNESS, gostaria de mais informações!';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
}
