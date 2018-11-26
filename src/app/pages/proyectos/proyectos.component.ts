import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { BotonService } from '../../services/service.index';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { CrearProyectoComponent } from './modales/crear-proyecto/crear-proyecto.component';
import swal from 'sweetalert2';
import { CrearOpcionesComponent } from './modales/crear-opciones/crear-opciones.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  buttons;
  desde = 0;
  totalUsuarios: number;
  cargando = true;

  constructor(public http: HttpClient, public _botonService: BotonService, public dialog: MatDialog) {
    this.cargarBotones();
  }

  ngOnInit() {
    // this.cargarBotones();
  }

  cargarBotones() {
    this.cargando = true;
    this._botonService.cargarBotones().subscribe((resp: any) => {
      console.log(resp.menu[0].button);
      this.buttons = resp.menu[0].button;
      this.cargando = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearProyectoComponent, {
      width: '600px'
      // data: {  }
    });

     dialogRef.afterClosed().subscribe(result => {
       if (result === true) {
     this.cargarBotones();

       }
    });
  }
  openSubDialog(_id: string ): void {
    // console.log(_id);
    const dialogRef = this.dialog.open(CrearProyectoComponent, {
      width: '600px',
       data: { _id }
    });

     dialogRef.afterClosed().subscribe(result => {
       if (result === true) {
     this.cargarBotones();

       }
    });
  }

  
  openDialogOpciones( _id: string ): void {
    const dialogRef = this.dialog.open(CrearOpcionesComponent, {
      width: '800px',
      data: { _id }
    });
     dialogRef.afterClosed().subscribe(result => {
       if (result === true) {
     this.cargarBotones();
       }
    });
  }
}
