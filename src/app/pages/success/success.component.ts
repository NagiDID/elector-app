import { Component, signal } from '@angular/core';
import { candidate, tarjeton, VotingResult } from '../../models/tags.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent {

  indexReceived = signal<number>(0);
  tarjetones= signal<tarjeton[]>([]);
  tarjetonActual = signal<string>('')
  candidates = signal<candidate[]>([]);
  indexOfCandidate = signal<number>(0)
  disabledIndicesAtComponent = signal <number>(0)
  disabledIndicesToClear: Set<number> = new Set([]);
  isDisplayed = signal<string>('display: flex;')


  ngOnInit(): void {

    this.loadDisabledIndices();
    this.loadTarjetones();
    this.compareValuesAndUpdateDisplay();

    const storedIndex = localStorage.getItem('lastClickedIndex');
    if (storedIndex) {
      this.showList(JSON.parse(storedIndex))
    }

    const valores = localStorage.getItem(`selection-${this.tarjetonActual()}`);
    if (valores) {
      const valuesReceived = JSON.parse(valores)
      this.indexOfCandidate.set(valuesReceived.index)
    }
  }

  loadDisabledIndices() {
    const storedIndices = localStorage.getItem('disabledIndices');
    if (storedIndices) {
      this.disabledIndicesAtComponent.set(JSON.parse(storedIndices).length);
    }
  }

  loadTarjetones() {
    const tarjetonesString = localStorage.getItem('tarjetones');
    if (tarjetonesString) {
      this.tarjetones.set(JSON.parse(tarjetonesString));
      console.log(this.tarjetones().length);
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

  saveToResults() {
    const candidateVoted = this.candidates().at(this.indexOfCandidate())?.name;
    const tarjetonWhereVoted = this.indexReceived();

    const existingEntries = localStorage.getItem(`votedCandidates_${tarjetonWhereVoted}`)
    let votedCandidates = existingEntries ? JSON.parse(existingEntries) : [];
    votedCandidates.push(candidateVoted);
    localStorage.setItem(`votedCandidates_${tarjetonWhereVoted}`, JSON.stringify(votedCandidates));
  }

  compareValuesAndUpdateDisplay() {
    if (this.tarjetones().length === this.disabledIndicesAtComponent()) {
      this.isDisplayed.set('display: none;');
    } else {
      this.isDisplayed.set('display: flex;');
    }
  }

  clearDisabledIndices(): void {
    localStorage.setItem('disabledIndices', JSON.stringify(Array.from(this.disabledIndicesToClear)));
  }
}
