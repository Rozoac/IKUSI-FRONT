import { Pipe, PipeTransform } from "@angular/core";
import { URL_SERVICIOS } from "../config/config";

@Pipe({
  name: "imagen"
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = "usuario"): any {
    let url = URL_SERVICIOS;

    if (!img) {
      return url + "/usuarios/pepito";
    }

    switch (tipo) {
      case "usuario":
        url += '/usuarios/' + img;
        break;


      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/asdasdasdasd';

        break;
    }

    return url;
  }
}
