import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes'; // Asegura que este import apunta a tu archivo de rutas
import { ElectionResultsComponent } from './pages/election-results/election-results.component';
import { NgApexchartsModule } from "ng-apexcharts";

@NgModule({
    declarations: [
        AppComponent,
        ElectionResultsComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        NgApexchartsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
