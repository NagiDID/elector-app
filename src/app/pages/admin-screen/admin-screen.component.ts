import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-screen',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-screen.component.html',
  styleUrl: './admin-screen.component.scss'
})
export class AdminScreenComponent {

}
