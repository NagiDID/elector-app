import { Component, input, signal, ɵPendingTasks} from '@angular/core';
import { CommonModule } from '@angular/common';
import { candidate } from '../../../models/tags.model';
import { elementAt, findIndex } from 'rxjs';

@Component({
  selector: 'app-edit-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-info.component.html',
  styleUrl: './edit-info.component.scss'
})
export class EditInfoComponent {

  displayType = signal<string>('display: none');

  candidatos = signal<candidate[]>([
  ]);

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
  
  popUpEditModule(event:Event, index:number) {
    const stateOn = 'display: flex;';
    this.displayType.set (stateOn);
    this.indexReceived.set (index);
    this.currentName.set(String(this.candidatos().at(index)?.name))
    this.currentNumber.set(Number(this.candidatos().at(index)?.number))
  }

  closePopUp(event:Event) {
    const stateOff = 'display: none;'
    this.displayType.set (stateOff);
  }

  currentName =signal<string>('Default')
  currentNumber =signal<number>(0)
  indexReceived = signal<number>(0)

  changeName (event:Event) {
    const inputName = event.target as HTMLInputElement;
    this.newName.set(inputName.value);
  }

  changeNumber (event:Event) {
    const inputNumber = event.target as HTMLInputElement;
    this.newNumber.set(parseInt(inputNumber.value));
  }

  newName = signal<string>('default');
  newNumber = signal<number>(1);

  editCandidateinfo (event:Event) {
    const stateOff = 'display: none;'
    this.displayType.set (stateOff);
    this.candidatos.update((candidatos) => {
      return  candidatos.map((candidato, position) => {
        if (position === this.indexReceived()) {
          return {
            ...candidato,
            number: this.newNumber(),
            name: this.newName(),
          }
        }
        return candidato;
      })
    }
    )
  }

  // alertSign(event:Event) {
  //   const currentName = this.candidatos().at(this.indexReceived())?.name;
  //   alert(currentName);
  // }
}