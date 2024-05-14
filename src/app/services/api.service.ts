import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiModel } from '@mean/models';
//Importa el decorador Injectable desde el módulo @angular/core. Importa los símbolos HttpClient y HttpErrorResponse desde el módulo @angular/common/http.
//Importa los símbolos Observable y throwError desde la biblioteca rxjs. Importa los operadores catchError y map desde la biblioteca rxjs.
//Importa el modelo ApiModel desde el módulo @mean/models.

//Define el servicio ApiService como un proveedor de servicios que se proporciona en el nivel de raíz de la aplicación.
@Injectable({
  providedIn: 'root',
})

//Define la clase ApiService que es un servicio que proporciona métodos para realizar peticiones HTTP a una API.
export class ApiService<GET = {}, POST = {}, PUT = {}, PATCH = {}, DELETE = {}> {
  constructor(private http: HttpClient) {}

  /** Para realizar las peticiones GET */
  //Define un método que realiza una petición GET a la API y devuelve un observable que emite la respuesta.
  getService(reqParams: ApiModel.ReqParams): Observable< ApiModel.ResponseParams<GET>> {
    const options = {
      params: reqParams.params ? reqParams.params : {},
    };
    return this.http.get<ApiModel.ResponseParams<GET>>(reqParams.url, options).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  //Define un método que realiza una petición GET a la API y devuelve un observable que emite la respuesta.
  getListService(reqParams: ApiModel.ReqParams): Observable< ApiModel.ResponseParams<GET[]>> {
    const options = {
      params: reqParams.params ? reqParams.params : {},
    };
    return this.http.get<ApiModel.ResponseParams<GET[]>>(reqParams.url, options).pipe(
      map((res) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }


  /** Para realizar las peticiones POST */
  //Define un método que realiza una petición POST a la API y devuelve un observable que emite la respuesta.
  postService(reqParams: ApiModel.ReqParams): Observable<ApiModel.ResponseParams<POST>> {
    const options = {
      params: reqParams.params ? reqParams.params : {},
    };
    return this.http.post<ApiModel.ResponseParams<POST>>(reqParams.url, reqParams.data, options ).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  /** Para realizar las peticiones DELETE*/
  //Define un método que realiza una petición DELETE a la API y devuelve un observable que emite la respuesta.
  deleteService(reqParams: ApiModel.ReqParams): Observable<ApiModel.ResponseParams<DELETE>> {
    const options = {
      body: reqParams.data,
      params: reqParams.params,
    };
    return this.http.delete<ApiModel.ResponseParams<DELETE>>(reqParams.url, options).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  // Define un método que se utiliza para manejar errores que ocurren durante las peticiones HTTP. Devuelve un observable que emite un error personalizado.
  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error.response || 'Ocurrió un error');
  }

}
