import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { displayMode, votantes } from '../../models/tags.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{

  votantes = signal<votantes[]>([]);
  filteredVotantes = signal<votantes[]>([]);
  uniqueGroups = signal<string[]>([]);
  selectedGroup = signal<string>('');
  eventName = signal<string>('')

  displaySettings: displayMode = {
    group: true,
    document: false,
    name: false,
    code: false
  };

  ngOnInit() {

    const nombreDelEvento = localStorage.getItem("nombreDelEvento");
    if(nombreDelEvento) {
      this.eventName.set(nombreDelEvento)
    }

    const storedDisplaySettings = localStorage.getItem('displaySettings');
    if (storedDisplaySettings) {
      this.displaySettings = JSON.parse(storedDisplaySettings);
    }

    const storedVotantes = localStorage.getItem('listaVotantes');
    if (storedVotantes) {
      const votantesData = JSON.parse(storedVotantes);
      this.votantes.set(votantesData);
      this.extractUniqueGroups(votantesData);
    }

    const remainingVotantes = localStorage.getItem('remainVotantes')
    if (remainingVotantes){
      this.votantes.set(JSON.parse(remainingVotantes))
      console.log(this.votantes())
    }
  }

  extractUniqueGroups(votantesData: votantes[]) {
    const groupsSet = new Set(votantesData.map(votante => votante.group));
    const uniqueGroups = Array.from(groupsSet);
    this.uniqueGroups.set(uniqueGroups);
  }

  onGroupSelected(event: Event) {
    const groupValue = event.target as HTMLInputElement;
    const group = groupValue.value;

    this.selectedGroup.set(group);
    this.filterVotantesByGroup(group);
  }

  filterVotantesByGroup(group: string) {
    const filtered = this.votantes().filter(votante => votante.group === group);
    this.filteredVotantes.set(filtered);
    console.log(this.filteredVotantes())
  }

  guardarVotante(): void {
    const selectElement = document.querySelector('select[name="toggleName"]') as HTMLSelectElement;
    const selectedId = selectElement ? parseInt(selectElement.value, 10) : null;
    console.log(selectElement, selectedId);
    
    if (selectedId !== null) {
      localStorage.setItem('votanteSeleccionado', selectedId.toString());
  
      const remainingVotantes = this.votantes().filter(votante => votante.id !== selectedId);
      this.votantes.set(remainingVotantes);

      const filteredJSON = JSON.stringify(remainingVotantes);
      localStorage.setItem("remainVotantes", filteredJSON);
    }
  }
}