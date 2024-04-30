import { Component, signal } from '@angular/core';
import { tarjeton } from '../../models/tags.model';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tarjetones',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './tarjetones.component.html',
  styleUrl: './tarjetones.component.scss'
})
export class TarjetonesComponent {

  tarjeton = signal<tarjeton[]>([]);
  disabledIndices: Set<number> = new Set();
  votanteSeleccionado = signal<string>('')

  ngOnInit(): void {

    this.loadDisabledIndices();

    const storedTarjetones = localStorage.getItem('tarjetones');
    if (storedTarjetones) {
      this.tarjeton.set(JSON.parse(storedTarjetones));
    }

    const storedVotante = localStorage.getItem('votanteSeleccionado');
    if (storedVotante) {
      this.votanteSeleccionado = JSON.parse(storedVotante);
    }
  }

  handleClick(index: number): void {
    if (!this.disabledIndices.has(index)) {
      this.disabledIndices.add(index);
      // Guardar el índice clickeado en localStorage
      localStorage.setItem('lastClickedIndex', JSON.stringify(index));
      console.log(`Tarjetón ${index} clickeado`);
    }
  }

  loadDisabledIndices(): void {
    const storedIndices = localStorage.getItem('disabledIndices');
    if (storedIndices) {
      this.disabledIndices = new Set(JSON.parse(storedIndices));
    }
  }

  isDisabled(index: number): boolean {
    const isDisabled = this.disabledIndices.has(index);
    this.saveDisabledIndices(); // Guarda los cambios cada vez que se verifique el estado
    return isDisabled;
  }
  
  saveDisabledIndices(): void {
    localStorage.setItem('disabledIndices', JSON.stringify(Array.from(this.disabledIndices)));
  }

  restartScreen(event: MouseEvent): void {
    event.preventDefault();  // Opcional, previene cualquier comportamiento predeterminado del botón
    this.disabledIndices.clear();  // Limpia el conjunto de índices deshabilitados
    this.saveDisabledIndices();    // Guarda el conjunto vacío en localStorage
    console.log('Disabled indices have been reset.');  // Mensaje de confirmación en consola
  }
}