import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CandidatosComponent } from './pages/candidatos/candidatos.component'
import { LabsComponent } from './pages/Zlabs/labs.component';
import { ChildComponent } from './pages/Zlabs/child/child.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginComponent, CandidatosComponent, LabsComponent, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'elector-app';
}