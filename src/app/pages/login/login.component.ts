import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  person = {
    name: "Leonardo Claro",
    id: 1004997592,
  }

  clickHandler(event:Event) {
    alert(event + "Hola");
  }
}