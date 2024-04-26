import { Routes } from '@angular/router';
import { ConfigComponent } from './pages/config/config.component';
import { TarjetonEditComponent } from './pages/config/tarjeton-edit/tarjeton-edit.component';
import { AdminScreenComponent } from './pages/admin-screen/admin-screen.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
    {
        path: 'config',
        component: ConfigComponent,
    },
    {
        path: 'editTarjetones',
        component: TarjetonEditComponent,
    },
    {
        path:'modoAdmin',
        component: AdminScreenComponent,
    },
    {
        path:'registro',
        component: RegistroComponent,
    },
    
];