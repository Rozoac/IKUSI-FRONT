import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// MODULOS
import { SharedModule } from '../shared/shared.module';
import {DashboardComponent } from './dashboard/dashboard.component';
import {GraficosComponent } from './graficos/graficos.component';
import {ProgressComponent } from './progress/progress.component';
import {PagesComponent } from './pages.component';
import { PipesModule } from '../pipes/pipes.module';
// RUTAS
import { PAGES_ROUTER } from './pages.routes';
import { ProfileComponent } from './profile/profile.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { CrearProyectoComponent } from './proyectos/modales/crear-proyecto/crear-proyecto.component';
import { MatDialogModule, MatButtonModule } from "@angular/material";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CrearOpcionesComponent } from './proyectos/modales/crear-opciones/crear-opciones.component';
import { UsuariosComponent } from './usuarios/usuarios.component';





@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    GraficosComponent,
    ProfileComponent,
    ProyectosComponent,
    CrearProyectoComponent,
    CrearOpcionesComponent,
    UsuariosComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    GraficosComponent,
    ProyectosComponent
  ],
  entryComponents: [CrearProyectoComponent, CrearOpcionesComponent],
  imports: [
    SharedModule,
    PAGES_ROUTER,
    NgbModule,
    PipesModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class PagesModule {}


