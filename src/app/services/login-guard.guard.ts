import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
constructor(public _usuario: UsuarioService) {}

  canActivate() {
    if ( this._usuario.estaLogueado() ) {
      console.log('TIENES PERMISO');
      return true;
    } else {
      console.log('NO TIENES ACCESO PINCHE PENDEJO');
      return false;
    }
  }
}
