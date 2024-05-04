import { Component, signal } from '@angular/core';
import { candidate, tarjeton } from '../../models/tags.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidatos',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './candidatos.component.html',
  styleUrl: './candidatos.component.scss'
})
export class CandidatosComponent {

  candidates = signal<candidate[]>([]);
  tarjetones= signal<tarjeton[]>([]);
  indexReceived = signal<number>(0);
  tarjetonActual = signal<string>('')

  ngOnInit(): void {

    const storedIndex = localStorage.getItem('lastClickedIndex');
    if (storedIndex) {
      this.showList(JSON.parse(storedIndex))
    }

    this.loadTarjetones();

    const valores = localStorage.getItem(`selection-${this.tarjetonActual()}`);
    if (valores) {
      console.log(valores)
    }

  }

  showList (index:number) {

    this.indexReceived.set(index);

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

  loadTarjetones() {
    const tarjetonesString = localStorage.getItem('tarjetones');
    if (tarjetonesString) {
      this.tarjetones.set(JSON.parse(tarjetonesString));
      this.tarjetonActual.set(JSON.stringify(this.tarjetones().at(this.indexReceived())?.name))
    }
  }

  selectCandidate(index: number, name: string): void {
    const key = `selection-${this.tarjetonActual()}`;
    const selection = { index, name };
    localStorage.setItem(key, JSON.stringify(selection));
  }
}