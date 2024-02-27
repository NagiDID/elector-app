import { Component, input, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { candidate } from '../../../models/tags.model';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-edit-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-info.component.html',
  styleUrl: './edit-info.component.scss'
})
export class EditInfoComponent {

  

  candidatos = signal<candidate[]>([

  ]);

  addNewCandidate (event: Event) {
    const newCandidate = {
      avatar: 'https://i.imgur.com/e8buxpa.jpeg',
      number: 2,
      name: 'Jhon Doe',
    }
    this.candidatos.update((candidatos) => [...candidatos, newCandidate]);
  }

  deleteCandidate (index:number) {
    this.candidatos.update ((candidatos) => candidatos.filter((candidatos, position) => position !== index))
  }

  addCandidateNumber(event: Event) {
    const inputNumber = event.target as HTMLInputElement;
    this.numeroCandidato.set (parseInt(inputNumber.value));
  }

  addCandidateName (event: Event) {
    const inputName = event.target as HTMLInputElement;
    this.nombreCandidato.set (inputName.value)
  }

  numeroCandidato = signal<number>(1);
  nombreCandidato = signal<string>('Default')

  addCandidate (event:Event) {
    const newCandidate = {
      avatar: 'https://i.imgur.com/e8buxpa.jpeg',
      number: this.numeroCandidato(),
      name: this.nombreCandidato(),
    }
    this.candidatos.update ((candidatos) => [...candidatos, newCandidate]);
  }
  
}