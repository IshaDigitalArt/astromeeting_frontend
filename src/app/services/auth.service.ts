import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthModel } from '../models/core/auth.model';
//Importa el decorador Injectable desde el módulo @angular/core. Importa la función jwtDecode desde la biblioteca jwt-decode.
//Importa el modelo AuthModel desde el módulo ../models/core/auth.model.

//Define el servicio AuthService como un proveedor de servicios que se proporciona en el nivel de raíz de la aplicación.
@Injectable({
  providedIn: 'root'
})

//Define la clase AuthService.
export class AuthService {

  //Define un método que guarda un valor en el almacenamiento de sesión
  saveToSession(key: string, value:string){
    sessionStorage.setItem(key,value); //Guarda el valor en el almacenamiento de sesión con la clave especificada.
  }

  //Define un método que lee un valor desde el almacenamiento de sesión y devuelve un objeto AuthModel.UserTokenData.
  readFromSesion(key: string): AuthModel.UserTokenData{
    return this.getTokenData(sessionStorage.getItem(key) || ''); //Lee el valor desde el almacenamiento de sesión y lo pasa al método getTokenData para procesarlo.
  }

  //Define un método privado que procesa un token y devuelve un objeto AuthModel.UserTokenData.
  private getTokenData(token: string): AuthModel.UserTokenData{
    return token ? jwtDecode(token): AuthModel.userTokenData //Si el token es válido, lo decodifica utilizando jwtDecode y devuelve el objeto AuthModel.UserTokenData. Si el token es nulo o vacío, devuelve el objeto AuthModel.userTokenData por defecto.
  }
}
