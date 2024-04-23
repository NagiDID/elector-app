import { Routes } from '@angular/router';
import { ConfigComponent } from './pages/config/config.component';
import { TarjetonEditComponent } from './pages/config/tarjeton-edit/tarjeton-edit.component';
import { ElectionResultsComponent } from './pages/election-results/election-results.component';

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
        path: 'resultadosElecciones',
        component: ElectionResultsComponent
    }
];