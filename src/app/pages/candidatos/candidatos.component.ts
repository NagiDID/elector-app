import { Component, signal } from '@angular/core';
import { candidate } from '../../models/tags.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-candidatos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './candidatos.component.html',
  styleUrl: './candidatos.component.scss'
})
export class CandidatosComponent {

  ngOnInit(): void {

    const storedIndex = localStorage.getItem('lastClickedIndex');
    if (storedIndex) {
      this.showList(JSON.parse(storedIndex))
    }
  }

  showList (index:number) {

    if (index == 0) {
      const currentData = JSON.parse(localStorage.getItem('votantesPrimeraLista') || '{}');
      this.candidates.update(() => currentData)
    }
    else if (index == 1) {
      const currentData = JSON.parse(localStorage.getItem('votantesSegundaLista') || '{}');
      this.candidates.update(() => currentData)
    }
    else if (index == 2) {
      const currentData = JSON.parse(localStorage.getItem('votantesTerceraLista') || '{}');
      this.candidates.update(() => currentData)
    }
    else if (index == 3) {
      const currentData = JSON.parse(localStorage.getItem('votantesCuartaLista') || '{}');
      this.candidates.update(() => currentData)
    }
    else if (index == 4) {
      const currentData = JSON.parse(localStorage.getItem('votantesQuintaLista') || '{}');
      this.candidates.update(() => currentData)
    }
  }

  candidates = signal<candidate[]>([]);

}
