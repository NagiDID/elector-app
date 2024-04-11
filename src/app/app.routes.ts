import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ConfigComponent } from './pages/config/config.component';
import { TarjetonEditComponent } from './pages/config/tarjeton-edit/tarjeton-edit.component';

export const routes: Routes = [
    {
        path:'config',
        component: ConfigComponent,
    },
    {
        path:'editTarjetones',
        component: TarjetonEditComponent,
    }
];