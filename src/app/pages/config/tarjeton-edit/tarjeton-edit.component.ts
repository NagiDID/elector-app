import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tarjeton } from '../../../models/tags.model';

@Component({
  selector: 'app-tarjeton-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeton-edit.component.html',
  styleUrl: './tarjeton-edit.component.scss'
})
export class TarjetonEditComponent {

  tarjetones = signal<tarjeton[]>([])

  addName(event: Event) {
    let nameinputed = event.target as HTMLInputElement;
    this.newName.set(nameinputed.value);
  }

  newName = signal<string>('Default');

  addTarjeton(event: Event) {
    const newTarjeton = {
      name: this.newName(),
    }
    this.tarjetones.update((tarjetones) => [...tarjetones, newTarjeton]);
    const inputInQuestion = document.getElementById('nameInput') as HTMLInputElement;
    inputInQuestion.value = ''
  }

  deleteTarjeton(index: number) {
    this.tarjetones.update((tarjetones) => tarjetones.filter((tarjetones, position) => position !== index))
  }
}
