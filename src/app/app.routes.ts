import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LabsComponent } from './pages/Zlabs/labs.component';
import { ChildComponent } from './pages/Zlabs/child/child.component';
import { ConfigComponent } from './pages/config/config.component';
import { TarjetonEditComponent } from './pages/config/tarjeton-edit/tarjeton-edit.component';

export const routes: Routes = [
    {
        path:'labs',
        component: LabsComponent,
    },
    {
        path:'child',
        component: ChildComponent,
    },
    {
        path:'config',
        component: ConfigComponent,
    },
    {
        path:'editTarjetones',
        component: TarjetonEditComponent,
    }
];