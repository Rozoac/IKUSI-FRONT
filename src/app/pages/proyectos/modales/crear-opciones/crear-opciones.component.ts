import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Autenticacion } from "../../../../../models/autenticacion.model";
import { BotonService } from "src/app/services/service.index";
import swal from "sweetalert2";
import { Menu } from '../../../../../models/menu.model';

@Component({
  selector: "app-crear-opciones",
  templateUrl: "./crear-opciones.component.html",
  styleUrls: ["./crear-opciones.component.css"]
})
export class CrearOpcionesComponent implements OnInit {
  tipo: string;
  autenticacion: Autenticacion;
  imagenSubir: File;
  pptSubir: File;
  imagenActual;
  menu: Menu;

  constructor(
    public _botonService: BotonService,
    public dialogRef: MatDialogRef<CrearOpcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit() {}

  save() {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  seleccionImagen(archivo: File) {
    console.log(archivo);
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
  seleccionPpt(archivo: File) {
    console.log(archivo);
    if (!archivo) {
      this.pptSubir = null;
      return;
    }
    if (archivo.type !== "application/vnd.ms-powerpoint") {
      swal(
        "Solo PPT",
        "El archivo debe ser una presentación de power point",
        "error"
      );
      this.pptSubir = null;
    }

    this.pptSubir = archivo;
  }


  guardar(form, tipo) {
    if (tipo === "web") {
      this.autenticacion = new Autenticacion(form.password, form.username);
      this._botonService
        .crearWeb(this.autenticacion, form.direccion, this.data)
        .subscribe((resp: any) => {
          console.log(resp);
          swal("Web ", `${resp.url.direccion} creada`, "success");

          this.save();
        });
    }
    if (tipo === "ppt") {
      this._botonService
        .crearPPT(this.pptSubir, this.imagenSubir, this.data)
        .then(res => {
          this.save();
        });
    }
    if (tipo === 'sub-proyecto') {
      this.menu = new Menu(form.title);
      this._botonService.crearSubMenu(this.menu, this.data).subscribe((resp:any) => {

        swal("Sub-Proyecto", `${this.menu.title} creado`, "success");
        this.save();

      });
    }
  }

  crear(tipo) {
    console.log(tipo);
  }
}
