import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidatos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './candidatos.component.html',
  styleUrl: './candidatos.component.scss'
})
export class CandidatosComponent {
  arrayCandidatos = [
    {
      avatar: 'https://i.imgur.com/e91TvsF.png',
      numero: 1,
      nombre: 'Leonardo Claro',
    },
    {
      avatar: 'https://i.imgur.com/WbmaOOO.png',
      numero: 2,
      nombre: 'Edinsson Melo',
    },
    {
      avatar: 'https://i.imgur.com/nvlfW9j.png  ',
      numero: 3,
      nombre: 'Yosman Ovallos',
    }
  ];
}

