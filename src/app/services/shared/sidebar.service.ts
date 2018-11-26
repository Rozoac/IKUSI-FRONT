import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class SidebarService {
  menu: any = [
    {
      rol: "admin",
      titulo: "Administración",
      icono: "assets/images/icon/employees.svg",
      url: "/usuarios"
    },
    {
      rol: "admin",
      titulo: "Clave",
      icono: "assets/images/icon/key.svg",
      url: "/perfil"
    }
  ];
  menu2: any = [
    {
      rol: "admin",
      titulo: "Administración",
      icono: "assets/images/icon/text-documents.svg",
      url: "/proyecto"
    }
    // {
    //   rol: "admin",
    //   titulo: "Salir",
    //   icono: "assets/images/icon/exit.svg",
    //   url: "/usuarios"
    // }
  ];

  constructor() {}
}
