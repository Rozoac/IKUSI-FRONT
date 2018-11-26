import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../services/service.index";
import { Usuario } from "../../models/usuario.model";

declare function plugins();

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame:boolean = false;
  cargar:boolean = false 

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    plugins();
    this.email = localStorage.getItem("email") || "";
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    this.cargar = true;
    const usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password
    );
    this._usuarioService
      .login(usuario, formulario.value.recuerdame)
      .subscribe(resp => {
        this.cargar = false;
        this.router.navigate(["/dashboard"]);
      }, error => {
        this.cargar = false;
      });
  }

  // dashboard(){
  //   this.router.
  // }
}
