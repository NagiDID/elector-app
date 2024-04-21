import { Component, input, OnInit, signal, ɵPendingTasks } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { votantes, tarjeton, candidate } from '../../models/tags.model';
import * as XLSX from 'xlsx'


import { elementAt, findIndex } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {

  ngOnInit() {
    const storedData = localStorage.getItem('votantesData');
    if (storedData) {
      const votantesData = JSON.parse(storedData);
      this.votantes.set(votantesData);
    }

    // Cargar tarjetones desde localStorage
    const storedTarjetones = localStorage.getItem('tarjetones');
    if (storedTarjetones) {
      this.tarjeton.set(JSON.parse(storedTarjetones));
    }
  }

  tarjeton = signal<tarjeton[]>([
  ]);

  candidates = signal<candidate[]>([
  ]);

  

  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
  
    // Verificar si hay archivos seleccionados
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
  
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        this.avatarCandidato.set(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  }

  

  numeroMesa = signal<number>(1);
  numeroTarjetón = signal<number>(0);

  loadVotantesPorMesa() { 
    const currentData = JSON.parse(localStorage.getItem('votantesPorMesa') || '{}');
    if (currentData[this.numeroMesa()]) {
      this.votantes.set(currentData[this.numeroMesa()]);
    } else {
      this.votantes.set([]); // O cualquier estado inicial deseado
    }
  }

  increaseTableNumber(event: Event) {
    let newValue = this.numeroMesa() + 1;
    this.numeroMesa.set(Number(newValue));
    this.loadVotantesPorMesa(); // Cargar votantes para la nueva mesa
  }

  decreaseTableNumber(event: Event) {
    let newValue = this.numeroMesa() - 1;
    this.numeroMesa.set(Number(newValue));
    this.loadVotantesPorMesa(); // Cargar votantes para la nueva mesa
  }

  displayType = signal<string>('display: none');
  displayTypeEditModule = signal<string>('display: none');

  popUpAddEditModule(event: Event) {
    const stateOn = 'display: flex;';
    this.displayTypeEditModule.set(stateOn);
  }

  popUpAddModule(event: Event) {
    const stateOn = 'display: flex;';
    this.displayType.set(stateOn);
  }

  avatarCandidato = signal<string>("")
  numeroCandidato = signal<number>(1);
  nombreCandidato = signal<string>('Default')

  addCandidateNumber(event: Event) {
    const inputNumber = event.target as HTMLInputElement;
    this.numeroCandidato.set(parseInt(inputNumber.value));
  }

  inputValue = signal<string>('')

  addCandidateName(event: Event) {
    const inputName = event.target as HTMLInputElement;
    this.nombreCandidato.set(inputName.value)
  }

  addCandidate(event: Event) {
    const newCandidate = {
      avatar: this.avatarCandidato(),
      number: this.numeroCandidato(),
      name: this.nombreCandidato(),
    }
    this.candidates.update((candidates) => [...candidates, newCandidate]);
    const stateOff = 'display: none;'
    this.displayType.set(stateOff);
    const inputInQuestion = document.getElementById('nameInput') as HTMLInputElement;
    inputInQuestion.value = ''
    const scndInputInQuestion = document.getElementById('numberInput') as HTMLInputElement;
    scndInputInQuestion.value = ''
  }

  deleteCandidate(index: number) {
    this.candidates.update((candidates) => candidates.filter((candidates, position) => position !== index))
  }

  currentName = signal<string>('Default')
  currentNumber = signal<number>(0)
  indexReceived = signal<number>(0)

  editCandidate(event: Event, index: number) {
    this.indexReceived.set(index);
    this.currentName.set(String(this.candidates().at(index)?.name))
    this.currentNumber.set(Number(this.candidates().at(index)?.number))
  }

  changeName(event: Event): void {
    const inputName = event.target as HTMLInputElement;
    this.newName.set(inputName.value);
  }

  inputNameFromHtml = signal<string>('');

  changeNumber(event: Event) {
    const inputNumber = event.target as HTMLInputElement;
    this.newNumber.set(parseInt(inputNumber.value));
  }

  newName = signal<string>('default');
  newNumber = signal<number>(1);

  editCandidateinfo(event: Event) {
    const stateOff = 'display: none;'
    this.displayTypeEditModule.set(stateOff);
    this.candidates.update((candidates) => {
      return candidates.map((candidate, position) => {
        if (position === this.indexReceived()) {
          return {
            ...candidate,
            number: this.newNumber(),
            name: this.newName(),
          }
        }
        return candidate;
      })
    }
    )
    const inputInQuestion = document.getElementById('editNameInput') as HTMLInputElement;
    inputInQuestion.value = ''
    const scndInputInQuestion = document.getElementById('editNumberInput') as HTMLInputElement;
    scndInputInQuestion.value = ''
  }

  votantes = signal<votantes[]>([
  ]);

  readExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      const data = new Uint8Array(fileReader.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const headers = ['name', 'group', 'id', 'code'];
      const excelData: votantes[] = XLSX.utils.sheet_to_json(worksheet, { header: headers });

      // Obtener el objeto actual de votantes por mesa
      const currentData = JSON.parse(localStorage.getItem('votantesPorMesa') || '{}');
      currentData[this.numeroMesa()] = excelData; // Actualizar con la nueva lista de votantes para la mesa actual

      // Guardar el objeto modificado en Local Storage
      localStorage.setItem('votantesPorMesa', JSON.stringify(currentData));
      this.votantes.set(excelData); // Establecer la lista de votantes actual en el estado
    }
  }
}   
