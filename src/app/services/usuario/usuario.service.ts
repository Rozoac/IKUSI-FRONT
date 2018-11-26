import { Injectable } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.router.navigate(["/login"]);
      this.token = "";
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.token = token;
    this.usuario = usuario;
  }

  logout() {
    this.usuario = null;
    this.token = "";

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    this.router.navigate(['/login']);
  }

  // ==============================================================
  // Login  -->
  // ==============================================================
  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Login correcto', `Bienvenido ${resp.usuario.nombre}`, 'success');
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }),
      catchError( err => {
        swal('Login incorrecto', err.error.mensaje , 'error');
        return throwError(err);
      })
    );
  }

  // ==============================================================
  // Crear Usuario  -->
  // ==============================================================

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        swal('Usuario creado', usuario.email, 'success');
      })
    );
  }

  // ==============================================================
  // Actualizar Usuario  -->
  // ==============================================================

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + this.usuario._id;
    url += '?token=' + this.token;
    console.log(usuario);
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }

  cambiarImagen(file: File, id: string) {
    this._subirArchivoService
      .subirArchivo(file, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?token=' + this.token;

    return this.http.get(url);
  }

  buscarUsuarios(termino: string) { 
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(
      map((resp: any) => resp.usuarios)
    );
  }
}
