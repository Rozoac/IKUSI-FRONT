import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios:any;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this._usuarioService.cargarUsuarios().subscribe( (resp:any)=>{
      console.log(resp);
      this.usuarios = resp.usuarios;
    });
  }

  perfil(id){
    console.log(id);
  }

}
