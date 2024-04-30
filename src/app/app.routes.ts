import { Routes } from '@angular/router';
import { ConfigComponent } from './pages/config/config.component';
import { TarjetonEditComponent } from './pages/config/tarjeton-edit/tarjeton-edit.component';
import { AdminScreenComponent } from './pages/admin-screen/admin-screen.component';
import { RegisterComponent } from './pages/register/register.component';
import { ElectionResultsComponent } from './pages/election-results/election-results.component';
import { TarjetonesComponent } from './pages/tarjetones/tarjetones.component';
import { CandidatosComponent } from './pages/candidatos/candidatos.component';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { SuccessComponent } from './pages/success/success.component';

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
        component: RegisterComponent,
    },
    {
        path: 'resultadosElecciones',
        component: ElectionResultsComponent,
    },
    {
        path: 'tarjetones',
        component: TarjetonesComponent,
    },
    {
        path: 'candidatos',
        component: CandidatosComponent,
    },
    {
        path: 'confirm',
        component: ConfirmComponent,
    },
    {
        path: 'success',
        component: SuccessComponent,
    }
];