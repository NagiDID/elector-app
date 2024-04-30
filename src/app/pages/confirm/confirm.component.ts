import { Component, signal } from '@angular/core';
import { candidate, tarjeton } from '../../models/tags.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirm',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {

 
  indexReceived = signal<number>(0);
  tarjetones= signal<tarjeton[]>([]);
  tarjetonActual = signal<string>('')
  candidates = signal<candidate[]>([]);
  indexOfCandidate = signal<number>(0)


  ngOnInit(): void {

    this.loadTarjetones();

    const storedIndex = localStorage.getItem('lastClickedIndex');
    if (storedIndex) {
      console.log(storedIndex)
      this.showList(JSON.parse(storedIndex))
    }

    const valores = localStorage.getItem(`selection-${this.tarjetonActual()}`);
    if (valores) {
      const valuesReceived = JSON.parse(valores)
      this.indexOfCandidate.set(valuesReceived.index)

      console.log(this.indexOfCandidate())
    }
  }

  loadTarjetones() {
    const tarjetonesString = localStorage.getItem('tarjetones');
    if (tarjetonesString) {
      this.tarjetones.set(JSON.parse(tarjetonesString));
    }
  }

  showList (index:number) {

    this.indexReceived.set(index);
    this.tarjetonActual.set(JSON.stringify(this.tarjetones().at(index)?.name))

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

  saveCandidateVoted() {
    const candidateVoted = this.indexOfCandidate();
    console.log(candidateVoted);
    localStorage.setItem('candidateVoted', candidateVoted.toString());
  }
}
