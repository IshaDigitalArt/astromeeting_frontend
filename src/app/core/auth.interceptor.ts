import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageConstants } from '@mean/utils';
//Importa los elementos HttpEvent, HttpHandler, HttpInterceptor, y HttpRequest desde el módulo @angular/common/http.
//Importa el decorador Injectable desde el módulo @angular/core. Importa el tipo Observable desde la biblioteca rxjs.
//Importa las constantes SessionStorageConstants desde el módulo @mean/utils.

//Define el interceptor AuthInterceptor como un proveedor de servicios que se proporciona en el nivel de raíz de la aplicación.
@Injectable({ providedIn: 'root' })
//Define la clase AuthInterceptor que implementa la interfaz HttpInterceptor.
export class AuthInterceptor implements HttpInterceptor {
  intercept( //Define el método intercept que se llama para cada solicitud HTTP que se realiza en la aplicación.
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem(SessionStorageConstants.USER_TOKEN); //Obtiene el token de autenticación desde el almacenamiento de sesión.
    if (token) { // Verifica si el token es válido.
      // if (!req.url.toString().includes('refresh')) {
        req = req.clone({ //Agrega el token de autenticación a la solicitud HTTP como un encabezado Authorization.
          setHeaders: {
            Authorization: 'Bearer ' + token
          },
        });
      // }
    }
    // Procesa la solicitud HTTP con el token de autenticación agregado.
    return next.handle(req);
  }
}
