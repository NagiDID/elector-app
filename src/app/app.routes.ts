import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CandidatosComponent } from './pages/candidatos/candidatos.component';
import { LabsComponent } from './pages/Zlabs/labs.component';
import { ChildComponent } from './pages/Zlabs/child/child.component';
import { EditInfoComponent } from './pages/candidatos/edit-info/edit-info.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path:'candidatos',
        component: CandidatosComponent
    },
    {
        path:'labs',
        component: LabsComponent,
    },
    {
        path:'child',
        component: ChildComponent,
    },
    {
        path:'edit',
        component: EditInfoComponent,
    }
];