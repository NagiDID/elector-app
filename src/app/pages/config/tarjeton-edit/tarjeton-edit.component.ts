import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tarjeton } from '../../../models/tags.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarjeton-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeton-edit.component.html',
  styleUrl: './tarjeton-edit.component.scss'
})
export class TarjetonEditComponent {

  constructor(private location: Location) { }

  tarjetones = signal<tarjeton[]>([])

  ngOnInit(): void {
    // Cargar tarjetones de localStorage al iniciar
    const storedTarjetones = localStorage.getItem('tarjetones');
    if (storedTarjetones) {
      this.tarjetones.set(JSON.parse(storedTarjetones));
    }
  }

  addName(event: Event) {
    let nameinputed = event.target as HTMLInputElement;
    this.newName.set(nameinputed.value);
  }

  newName = signal<string>('Default');

  addTarjeton(event: Event) {
    const newTarjeton = {
      name: this.newName(),
      amountCandidates:0,
    };
    this.tarjetones.update((tarjetones) => {
      const updatedTarjetones = [...tarjetones, newTarjeton];
      // Guardar en localStorage
      localStorage.setItem('tarjetones', JSON.stringify(updatedTarjetones));
      return updatedTarjetones;
    });
    const inputInQuestion = document.getElementById('nameInput') as HTMLInputElement;
    inputInQuestion.value = ''
  }

  deleteTarjeton(index: number) {
    this.tarjetones.update((tarjetones) => {
      const updatedTarjetones = tarjetones.filter((_, position) => position !== index);
      // Actualizar localStorage
      localStorage.setItem('tarjetones', JSON.stringify(updatedTarjetones));
      return updatedTarjetones;
    });
  }

  goBack(): void {
    this.location.back();
  }
}