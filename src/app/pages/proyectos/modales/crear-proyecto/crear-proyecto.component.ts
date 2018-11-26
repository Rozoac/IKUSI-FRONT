import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import swal from 'sweetalert2';
import { Boton } from '../../../../../models/boton.model';
import { BotonService } from '../../../../services/boton/boton.service';

@Component({
  selector: "app-crear-proyecto",
  templateUrl: "./crear-proyecto.component.html",
  styleUrls: ["./crear-proyecto.component.css"]
})
export class CrearProyectoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CrearProyectoComponent>,
    public _botonService: BotonService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  boton: Boton;
  imagenSubir: File;
  imagenActual;
  cargar = true;

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(true);
  }

  guardar(data:any) {
    this._botonService.crearBoton(data.text, this.imagenSubir, null).then( res => {
      this.save();
    });
    }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if (archivo.type.indexOf("image") < 0) {
      swal("Solo imagenes", "El archivo debe ser una imagen", "error");
      this.imagenSubir = null;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => (this.imagenActual = reader.result);
  }

  ngOnInit() {}
}
