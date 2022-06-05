import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor() { }

  setUsuario(token :any, rol:any,usuario:any){
    localStorage.setItem("accessToken", token);
    localStorage.setItem("rol", rol);
    localStorage.setItem("usuario", usuario);
    console.log('Se activo la seguridad')
  }
  
  getToken(){
    return localStorage.getItem("accessToken");
  }

  getRol(){
    return localStorage.getItem("rol");
  }

  getUsuario(){
    return localStorage.getItem("usuario");
  }

  logout(){
    console.log('Cerrando sesion...')
    localStorage.removeItem("accessToken");
    localStorage.removeItem("rol");
    localStorage.removeItem("usuario");
  }

}
