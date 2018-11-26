import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: "root"
})
export class SubirArchivoService {
  constructor() {}

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append("imagen", archivo, archivo.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("imagen subida");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("fallo la subida");
            reject(xhr.response);
          }
        }
      };

      let url = URL_SERVICIOS + "/" + tipo + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }

  crearBoton(archivo: File, text: string, id:any) {
    if(id === null){
      id = "5bd9b5033822e60015a8771e"  
    }
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append("route_image", archivo, archivo.name);
      formData.append("text", text);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("boton subido");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("boton fallido");
            reject(xhr.response);
          }
        }
      };

      const url =
        URL_SERVICIOS + "/" + "button" + "/" + id;

      xhr.open("POST", url, true);
      xhr.send(formData);
    });
  }
  crearPPT(ppt: File, imagen: File, id) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append("route_slide", ppt, ppt.name);
      formData.append("route_image", imagen, imagen.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("PPT subido");
            resolve(JSON.parse(xhr.response));
          } else {
            console.log("PPT fallido");
            reject(xhr.response);
          }
        }
      };

      const url =
        URL_SERVICIOS + "/" + "slide" + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}
