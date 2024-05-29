import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionStorageConstants } from '../utils/session.storage';
//Importa el decorador Injectable desde el módulo @angular/core. Importa el servicio Router desde el módulo @angular/router.
//Importa el servicio AuthService desde el módulo ../services/auth.service. Importa las constantes SessionStorageConstants desde el módulo ../utils/session.storage.

//Define el guard AdminGuard como un proveedor de servicios que se proporciona en el nivel de raíz de la aplicación.
@Injectable({
  providedIn: 'root'
})

//Define la clase AdminGuard.
export class AdminGuard {
  constructor( //Define el constructor del guard que recibe dos parámetros
    private readonly router: Router,
    private auth: AuthService
    //El servicio Router que se utiliza para navegar entre rutas.
    //El servicio AuthService que se utiliza para autenticar usuarios.
  ){}

  //Define el método canActivate que se llama antes de que se active la ruta protegida por este guard.
  canActivate(): boolean{
    const checkSession= this.auth.readFromSesion(SessionStorageConstants.USER_TOKEN) //Obtiene la sesión del usuario desde el almacenamiento de sesión.
    if(checkSession.user.roleId === 1){ //Verifica si el usuario ya está autenticado y cumple el rol de Admin (roleId === 1).
      return true; //Devuelve true para indicar que la ruta se puede activar.
    }
    this.router.navigate(['/login']); //Si el usuario no está autenticado, navega a la ruta de login.
    return false; //Devuelve false para indicar que la ruta no se puede activar.
  }
}
