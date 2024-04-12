import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Asegura que este import apunta a tu archivo de rutas

@NgModule({
    declarations: [
        AppComponent,
        // otros componentes declarados aquí
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes) // Configura el RouterModule aquí
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
