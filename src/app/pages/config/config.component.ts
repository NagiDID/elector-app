import { Component, input, OnInit, signal, ɵPendingTasks } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { votantes, tarjeton, candidate, displayMode } from '../../models/tags.model';
import * as XLSX from 'xlsx'

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss'
})
export class ConfigComponent implements OnInit {

  private lists: { [key: string]: candidate[] } = {};

  ngOnInit() {
    const storedData = localStorage.getItem('listaVotantes');
    if (storedData) {
      const votantesData = JSON.parse(storedData);
      this.votantes.set(votantesData);
    }

    // Cargar tarjetones desde localStorage
    const storedTarjetones = localStorage.getItem('tarjetones');
    if (storedTarjetones) {
      this.tarjeton.set(JSON.parse(storedTarjetones));
    }

    const storedDisplaySettings = localStorage.getItem('displaySettings');
    if (storedDisplaySettings) {
      this.displaySettings = JSON.parse(storedDisplaySettings);
    }

    // //DOC
    // const storedDocValue = localStorage.getItem('estadoDoc');
    // if (storedDocValue) {
    //   console.log(storedDocValue);
    //   this.docLabelStatus.set(JSON.parse(storedDocValue));

    //   console.log(this.docLabelStatus())
    // }

    // const storedDocCheckValue = JSON.parse(localStorage.getItem('estadoDocCheck') || '{}')
    // if (storedDocCheckValue) {
    //   this.docCheckedOrNot.update(() => JSON.parse(storedDocCheckValue));


    //   console.log(this.docCheckedOrNot());
    // }
    // //DOC END

    // //Name
    // const storedNameValue = localStorage.getItem('estadoName');
    // if (storedNameValue) {
    //   console.log(storedNameValue);
    //   this.nameLabelStatus.set(JSON.parse(storedNameValue));

    //   console.log(this.nameLabelStatus())
    // }

    // const storedNameCheckValue = JSON.parse(localStorage.getItem('estadoNameCheck') || '{}')
    // if (storedNameCheckValue) {
    //   this.nameCheckedOrNot.update(() => JSON.parse(storedDocCheckValue));


    //   console.log(this.nameCheckedOrNot());
    // }
    // // Name END

    // //CODE
    // const storedCodeValue = localStorage.getItem('estadoCode');
    // if (storedCodeValue) {
    //   console.log(storedCodeValue);
    //   this.codeLabelStatus.set(JSON.parse(storedCodeValue));

    //   console.log(this.codeLabelStatus())
    // }

    // const storedCodeCheckValue = JSON.parse(localStorage.getItem('estadoCodeCheck') || '{}')
    // if (storedCodeCheckValue) {
    //   this.codeCheckedOrNot.update(() => JSON.parse(storedCodeCheckValue));


    //   console.log(this.codeCheckedOrNot());
    // }
    // //CODE END

    // //GROUP
    // const storedGroupValue = localStorage.getItem('estadoGroup');
    // if (storedGroupValue) {
    //   console.log(storedGroupValue);
    //   this.groupLabelStatus.set(JSON.parse(storedGroupValue));

    //   console.log(this.groupLabelStatus())
    // }

    // const storedGroupCheckValue = JSON.parse(localStorage.getItem('estadoGroupCheck') || '{}')
    // if (storedGroupCheckValue) {
    //   this.groupCheckedOrNot.update(() => JSON.parse(storedGroupCheckValue));


    //   console.log(this.groupCheckedOrNot());
    // }
    // //GROUP END
  }

  tarjeton = signal<tarjeton[]>([
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


  increaseTableNumber(event: Event) {
    let newValue = this.numeroMesa() + 1;
    this.numeroMesa.set(Number(newValue));
  }

  decreaseTableNumber(event: Event) {
    let newValue = this.numeroMesa() - 1;
    this.numeroMesa.set(Number(newValue));
  }

  displayType = signal<string>('display: none');
  displayTypeEditModule = signal<string>('display: none');

  popUpEditModule(event: Event) {
    const stateOn = 'display: flex;';
    this.displayTypeEditModule.set(stateOn);
  }

  popUpAddModule(event: Event, index:number) {
    const stateOn = 'display: flex;';
    this.displayType.set(stateOn);

    this.listIndex.set(index);
  }

  avatarCandidato = signal<string>("data:image/jpeg;base64,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")
  numeroCandidato = signal<number>(1);
  nombreCandidato = signal<string>('Default')

  addCandidateNumber(event: Event) {
    const inputNumber = event.target as HTMLInputElement;
    this.numeroCandidato.set(parseInt(inputNumber.value));
  }

  addCandidateName(event: Event) {
    const inputName = event.target as HTMLInputElement;
    this.nombreCandidato.set(inputName.value)
  }

  candidatesA = signal<candidate[]>([
  ]);

  candidatesB = signal<candidate[]>([
  ]);

  candidatesC = signal<candidate[]>([
  ]);

  candidatesD = signal<candidate[]>([
  ]);

  candidatesE = signal<candidate[]>([
  ]);

  candidates = signal<candidate[]>([
  ]);

  thisList = signal <string> ('candidates');
  listIndex = signal<number>(0);

  showList (cardName:string, index:number) {
    const nameOfList = cardName;
    this.listName.set (nameOfList.valueOf())
    this.whatList(index);

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


  whatList(index:number) {
    const indexOfCard = index;
    this.listIndex.set (indexOfCard.valueOf())
  }

  addCandidate(event: Event) {

    const newCandidate = {
      avatar: this.avatarCandidato(),
      number: this.numeroCandidato(),
      name: this.nombreCandidato(),
    }
    if (this.listIndex() == 0) {
      const dataAtLocalStorage = JSON.parse(localStorage.getItem('votantesPrimeraLista') || '{}');
      this.candidatesA.update(() => [...dataAtLocalStorage, newCandidate]);
      localStorage.setItem('votantesPrimeraLista', JSON.stringify(this.candidatesA()));
      this.candidates.set(this.candidatesA());
    }
    else if (this.listIndex() == 1) {
      const dataAtLocalStorage = JSON.parse(localStorage.getItem('votantesSegundaLista') || '{}');
      this.candidatesB.update((c) => [...dataAtLocalStorage, newCandidate]);
      localStorage.setItem('votantesSegundaLista', JSON.stringify(this.candidatesB()));
      this.candidates.set(this.candidatesB());
    }
    else if (this.listIndex() == 2) {
      const dataAtLocalStorage = JSON.parse(localStorage.getItem('votantesTerceraLista') || '{}');
      this.candidatesC.update(() => [...dataAtLocalStorage, newCandidate]);
      localStorage.setItem('votantesTerceraLista', JSON.stringify(this.candidatesC()));
      this.candidates.set(this.candidatesC());
    }
    else if (this.listIndex() == 3) {
      const dataAtLocalStorage = JSON.parse(localStorage.getItem('votantesCuartaLista') || '{}');
      this.candidatesD.update(() => [...dataAtLocalStorage, newCandidate]);
      localStorage.setItem('votantesCuartaLista', JSON.stringify(this.candidatesD()));
      this.candidates.set(this.candidatesD());
    }
    else if (this.listIndex() == 4) {
      const dataAtLocalStorage = JSON.parse(localStorage.getItem('votantesQuintaLista') || '{}');
      this.candidatesE.update(() => [...dataAtLocalStorage, newCandidate]);
      localStorage.setItem('votantesQuintaLista', JSON.stringify(this.candidatesE()));
      this.candidates.set(this.candidatesE());
    }

    const stateOff = 'display: none;'
    this.displayType.set(stateOff);
    const inputInQuestion = document.getElementById('nameInput') as HTMLInputElement;
    inputInQuestion.value = ''
    const scndInputInQuestion = document.getElementById('numberInput') as HTMLInputElement;
    scndInputInQuestion.value = ''
  }


  deleteCandidate(index: number) {
    if (this.listIndex() == 0) {

      this.candidatesA.set(JSON.parse(localStorage.getItem('votantesPrimeraLista') || '{}'));

      this.candidatesA.update((candidatesA) => candidatesA.filter((candidatesA, position) => position !== index))
      localStorage.setItem('votantesPrimeraLista', JSON.stringify(this.candidatesA()));
      this.candidates.set(this.candidatesA());
    
    }
    else if (this.listIndex() == 1) {

      this.candidatesB.set(JSON.parse(localStorage.getItem('votantesSegundaLista') || '{}'));

      this.candidatesB.update((candidatesB) => candidatesB.filter((candidatesB, position) => position !== index))
      localStorage.setItem('votantesSegundaLista', JSON.stringify(this.candidatesB()));
      this.candidates.set(this.candidatesB());

    }
    else if (this.listIndex() == 2) {

      this.candidatesC.set(JSON.parse(localStorage.getItem('votantesTerceraLista') || '{}'));

      this.candidatesC.update((candidatesC) => candidatesC.filter((candidatesC, position) => position !== index))
      localStorage.setItem('votantesTerceraLista', JSON.stringify(this.candidatesC()));
      this.candidates.set(this.candidatesC());

    }
    else if (this.listIndex() == 3) {

      this.candidatesD.set(JSON.parse(localStorage.getItem('votantesCuartaLista') || '{}'));

      this.candidatesD.update((candidatesD) => candidatesD.filter((candidatesD, position) => position !== index))
      localStorage.setItem('votantesCuartaLista', JSON.stringify(this.candidatesD()));
      this.candidates.set(this.candidatesD());

    }
    else if (this.listIndex() == 4) {

      this.candidatesE.set(JSON.parse(localStorage.getItem('votantesQuintaLista') || '{}'));

      this.candidatesE.update((candidatesE) => candidatesE.filter((candidatesE, position) => position !== index))
      localStorage.setItem('votantesQuintaLista', JSON.stringify(this.candidatesE()));
      this.candidates.set(this.candidatesE());

    }
  }

  currentName = signal<string>('Default')
  currentNumber = signal<number>(0)
  indexReceived = signal<number>(0)

  editCandidate(event: Event, index: number) {
    if (this.listIndex() == 0){

      const dataAtLocalStorage = signal<candidate[]>([ JSON.parse(localStorage.getItem('votantesPrimeraLista') || '{}') ])

      this.indexReceived.set(index);
      this.currentName.set(String(dataAtLocalStorage().at(index)?.name))
      this.currentNumber.set(Number(dataAtLocalStorage().at(index)?.number))
    }

    else if (this.listIndex() == 1){

      const dataAtLocalStorage = signal<candidate[]>([ JSON.parse(localStorage.getItem('votantesSegundaLista') || '{}') ])

      this.indexReceived.set(index);
      this.currentName.set(String(dataAtLocalStorage().at(index)?.name))
      this.currentNumber.set(Number(dataAtLocalStorage().at(index)?.number))
    }
    
    else if (this.listIndex() == 2){

      const dataAtLocalStorage = signal<candidate[]>([ JSON.parse(localStorage.getItem('votantesTerceraLista') || '{}') ])

      this.indexReceived.set(index);
      this.currentName.set(String(dataAtLocalStorage().at(index)?.name))
      this.currentNumber.set(Number(dataAtLocalStorage().at(index)?.number))
    }

    else if (this.listIndex() == 3){

      const dataAtLocalStorage = signal<candidate[]>([ JSON.parse(localStorage.getItem('votantesCuartaLista') || '{}') ])

      this.indexReceived.set(index);
      this.currentName.set(String(dataAtLocalStorage().at(index)?.name))
      this.currentNumber.set(Number(dataAtLocalStorage().at(index)?.number))
    }

    else if (this.listIndex() == 3){

      const dataAtLocalStorage = signal<candidate[]>([ JSON.parse(localStorage.getItem('votantesQuintaLista') || '{}') ])

      this.indexReceived.set(index);
      this.currentName.set(String(dataAtLocalStorage().at(index)?.name))
      this.currentNumber.set(Number(dataAtLocalStorage().at(index)?.number))
    }
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

      if (this.listIndex() == 0) {

        const storedCandidates = signal<candidate[]>([])
        const storedData = JSON.parse(localStorage.getItem('votantesPrimeraLista') || '{}');

        storedCandidates.set(storedData)
        console.log (storedCandidates())

        storedCandidates.update((storedCandidates) => {

          return storedCandidates.map((candidate, position) => {
            if (position === this.indexReceived()) {
              return {
                ...candidate,
                number: this.newNumber(),
                name: this.newName(),
              }
            }
            return candidate;
          })
        })

        console.log(storedCandidates())
        this.candidatesA.set(storedCandidates())
      
        localStorage.setItem('votantesPrimeraLista', JSON.stringify(this.candidatesA()));
        this.candidates.set(this.candidatesA());

      }


        else if (this.listIndex() == 1) {

          const storedCandidates = signal<candidate[]>([])
          const storedData = JSON.parse(localStorage.getItem('votantesSegundaLista') || '{}');
          
          storedCandidates.set(storedData)
          console.log (storedCandidates())

          storedCandidates.update((storedCandidates) => {

            return storedCandidates.map((candidate, position) => {
              if (position === this.indexReceived()) {
                return {
                  ...candidate,
                  number: this.newNumber(),
                  name: this.newName(),
                }
              }
              return candidate;
            })
          })

          console.log(storedCandidates())
          this.candidatesB.set(storedCandidates())
      
          localStorage.setItem('votantesSegundaLista', JSON.stringify(this.candidatesB()));
          this.candidates.set(this.candidatesB());

      }

        else if (this.listIndex() == 2) {

          const storedCandidates = signal<candidate[]>([])
          const storedData = JSON.parse(localStorage.getItem('votantesTerceraLista') || '{}');

          storedCandidates.set(storedData)
          console.log (storedCandidates())

          storedCandidates.update((storedCandidates) => {

            return storedCandidates.map((candidate, position) => {
              if (position === this.indexReceived()) {
                return {
                  ...candidate,
                  number: this.newNumber(),
                  name: this.newName(),
                }
              }
              return candidate;
            })
          })

          console.log(storedCandidates())
          this.candidatesC.set(storedCandidates())
      
          localStorage.setItem('votantesTerceraLista', JSON.stringify(this.candidatesC()));
          this.candidates.set(this.candidatesC());

      }

        else if (this.listIndex() == 3) {

          const storedCandidates = signal<candidate[]>([])
          const storedData = JSON.parse(localStorage.getItem('votantesCuartaLista') || '{}');

          storedCandidates.set(storedData)
          console.log (storedCandidates())

          storedCandidates.update((storedCandidates) => {

            return storedCandidates.map((candidate, position) => {
              if (position === this.indexReceived()) {
                return {
                  ...candidate,
                  number: this.newNumber(),
                  name: this.newName(),
                }
              }
              return candidate;
            })
          })

          console.log(storedCandidates())
          this.candidatesD.set(storedCandidates())
      
          localStorage.setItem('votantesCuartaLista', JSON.stringify(this.candidatesD()));
          this.candidates.set(this.candidatesD());

      }

        else if (this.listIndex() == 4) {

          const storedCandidates = signal<candidate[]>([])
          const storedData = JSON.parse(localStorage.getItem('votantesQuintaLista') || '{}');

          storedCandidates.set(storedData)
          console.log (storedCandidates())

          storedCandidates.update((storedCandidates) => {

            return storedCandidates.map((candidate, position) => {
              if (position === this.indexReceived()) {
                return {
                  ...candidate,
                  number: this.newNumber(),
                  name: this.newName(),
                }
              }
              return candidate;
            })
          })

          console.log(storedCandidates())
          this.candidatesE.set(storedCandidates())
      
          localStorage.setItem('votantesQuintaLista', JSON.stringify(this.candidatesE()));
          this.candidates.set(this.candidatesE());

      }


    const inputInQuestion = document.getElementById('editNameInput') as HTMLInputElement;
    inputInQuestion.value = ''
    const scndInputInQuestion = document.getElementById('editNumberInput') as HTMLInputElement;
    scndInputInQuestion.value = ''
  }

  votantes = signal<votantes[]>([]);

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
      
      this.votantes.set(excelData)

      let currentData = JSON.parse(localStorage.getItem('listaVotantes') || '{}');
      currentData = this.votantes(); 
      localStorage.setItem('listaVotantes', JSON.stringify(currentData))

      // this.votantes.set(currentData)
      console.log (currentData)

      // // Obtener el objeto actual de votantes por mesa
      // currentData[this.numeroMesa()] = excelData; 


      // // Guardar el objeto modificado en Local Storage
      // localStorage.setItem('votantesPorMesa', JSON.stringify(currentData));
    }
  }

  listName = signal<string>('')

  dataFieldDisplay(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const listItem = inputElement.closest('.list-item');
  
    if (listItem) {
      const orderedList = listItem.parentElement;
      if (orderedList) {
        const listItems = Array.from(orderedList.children);
        const index = listItems.indexOf(listItem);
        
        const settingKeys = ['group', 'document', 'name', 'code'];
        if (settingKeys[index]) {
          this.displaySettings[settingKeys[index]] = inputElement.checked;
        }
  
        // Actualiza y guarda el estado en el localStorage
        this.updateAndSaveDisplaySettings();
        console.log(this.displaySettings);
      } else {
        alert('No se pudo encontrar el elemento de lista ordenada.');
      }
    } else {
      alert('Elemento no encontrado en la lista.');
    }
  }
  
  updateAndSaveDisplaySettings() {
    localStorage.setItem('displaySettings', JSON.stringify(this.displaySettings));
  }
  
  // Opcional: Si necesitas cargar los ajustes del localStorage cuando inicia la aplicación
  loadDisplaySettings() {
    const settings = localStorage.getItem('displaySettings');
    if (settings) {
      this.displaySettings = JSON.parse(settings);
      console.log(this.displaySettings)
    }
  }

// Ejemplo de estructura para displaySettings en la clase del componente
  displaySettings: displayMode = {
    group: true,
    document: false,
    name: false,
    code: false
  };


}


  // docLabelStatus = signal<number>(0);
  // nameLabelStatus = signal<number>(0);
  // codeLabelStatus = signal<number>(0);
  // groupLabelStatus = signal<number>(0);

  // docCheckedOrNot = signal<string>('')
  // nameCheckedOrNot = signal<string>('')
  // codeCheckedOrNot = signal<string>('')
  // groupCheckedOrNot = signal<string>('')

  // activeOrNotDoc (event:Event) {

  //   if (this.docLabelStatus() === 0){
  //     this.docLabelStatus.set(1)
  //     this.docCheckedOrNot.set('true')
  //   }
  //   else if (this.docLabelStatus() === 1){
  //     this.docLabelStatus.set(0)
  //     this.docCheckedOrNot.set('false')
  //   }

  //   console.log(this.docLabelStatus(), this.docCheckedOrNot())
  //   localStorage.setItem('estadoDoc', JSON.stringify(this.docLabelStatus()))
  //   localStorage.setItem('estadoDocCheck', JSON.stringify(this.docCheckedOrNot()))
  // }

  // activeOrNotName (event:Event) {

  //   if (this.nameLabelStatus() === 0){
  //     this.nameLabelStatus.set(1)
  //     this.nameCheckedOrNot.set('true')
  //   }
  //   else if (this.nameLabelStatus() === 1){
  //     this.nameLabelStatus.set(0)
  //     this.nameCheckedOrNot.set('false')
  //   }

  //   console.log(this.nameLabelStatus(), this.nameCheckedOrNot())
  //   localStorage.setItem('estadoName', JSON.stringify(this.nameLabelStatus()))
  //   localStorage.setItem('estadoNameCheck', JSON.stringify(this.nameCheckedOrNot()))
  // }
  
  // activeOrNotCode (event:Event) {

  //   if (this.codeLabelStatus() === 0){
  //     this.codeLabelStatus.set(1)
  //     this.codeCheckedOrNot.set('true')
  //   }
  //   else if (this.codeLabelStatus() === 1){
  //     this.codeLabelStatus.set(0)
  //     this.codeCheckedOrNot.set('false')
  //   }

  //   console.log(this.codeLabelStatus(), this.codeCheckedOrNot())
  //   localStorage.setItem('estadoCode', JSON.stringify(this.codeLabelStatus()))
  //   localStorage.setItem('estadoCodeCheck', JSON.stringify(this.codeCheckedOrNot()))
  // }

  // activeOrNotGroup (event:Event) {

  //   if (this.groupLabelStatus() === 0){
  //     this.groupLabelStatus.set(1)
  //     this.groupCheckedOrNot.set('true')
  //   }
  //   else if (this.groupLabelStatus() === 1){
  //     this.groupLabelStatus.set(0)
  //     this.groupCheckedOrNot.set('false')
  //   }

  //   console.log(this.groupLabelStatus(), this.groupCheckedOrNot())
  //   localStorage.setItem('estadoGroup', JSON.stringify(this.groupLabelStatus()))
  //   localStorage.setItem('estadoGroupCheck', JSON.stringify(this.groupCheckedOrNot()))
  // }  