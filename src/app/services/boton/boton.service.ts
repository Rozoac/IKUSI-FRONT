import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import swal from "sweetalert2";
import { Observable } from "rxjs";
import { Url } from "../../../models/url.model";

@Injectable({
  providedIn: "root"
})
export class BotonService {
  public cargar = false;

  constructor(
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService
  ) {}

  cargarBotones() {
    const url = `${URL_SERVICIOS}/principal`;

    return this.http.get(url);
  }

  async crearPPT(ppt: File, imagen: File, id: any) {
    this.cargar = true;
    await this._subirArchivoService
      .crearPPT(ppt, imagen, id._id)
      .then((resp: any) => {
        this.cargar = false;
        swal("PPT ", `creado`, "success");
      })
      .catch(resp => {
        console.log(resp);
      });
    return true;
  }

  async crearBoton(text: string, file: File, id: any) {
    this.cargar = true;
    await this._subirArchivoService
      .crearBoton(file, text, id)
      .then((resp: any) => {
        this.cargar = false;
        swal("Proyecto ", `${text} creado`, "success");
      })
      .catch(resp => {
        console.log(resp);
        // return false;
      });
    return true;
  }
  crearWeb(autenticacion, url, id) {
    // let objeto = [{autenticacion}, {direccion: url} ];
    const objeto = new Url(autenticacion, url);
    console.log(objeto);

    this.cargar = true;
    const url2 = `${URL_SERVICIOS}/url/${id._id}`;
    return this.http.put(url2, objeto);
  }

  crearSubMenu(menu, id) {

    this.cargar = true;
    const url = `${URL_SERVICIOS}/menu/${id._id}`;
    return this.http.put(url, menu);
  }
}
