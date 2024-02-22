import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CandidatosComponent } from './pages/candidatos/candidatos.component';


export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path:'candidatos',
        component: CandidatosComponent
    }
];
