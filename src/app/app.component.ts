import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LabsComponent } from './pages/Zlabs/labs.component';
import { ChildComponent } from './pages/Zlabs/child/child.component';
import { ConfigComponent } from './pages/config/config.component';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LabsComponent, ChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'elector-app';
}