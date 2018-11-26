import { UsuarioService } from "../services/usuario/usuario.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;
  recuerdame: boolean = false;

  constructor(public _servicioUsuario: UsuarioService, public router: Router) {
   
  }

  ngOnInit() {
    this.formulario = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales("password", "password2") }
    );
  }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  registrarUsuario() {
    if (this.formulario.invalid) {
      return;
    }
    if (!this.formulario.value.condiciones) {
     return  swal({
        title: "Error!",
        text: "Debes aceptar las condiciones",
        type: "error",
        confirmButtonText: "ok"
      });
    }

    let usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password
    );

    this._servicioUsuario.crearUsuario(usuario).subscribe((res: any) => {
      
        
        this.router.navigate(['/login']);
        console.log(res);
      })
  }
}
