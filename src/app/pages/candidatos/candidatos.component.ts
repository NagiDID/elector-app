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
      avatar: 'Image.jpg',
      numero: 0o1,
      nombre: 'Leonardo Claro',
    },
    {
      avatar: 'Image.jpg',
      numero: 0o2,
      nombre: 'Edinsson Melo',
    },
    {
      avatar: 'Image.jpg',
      numero: 0o3,
      nombre: 'Yosman Ovallos',
    }
  ];
}

