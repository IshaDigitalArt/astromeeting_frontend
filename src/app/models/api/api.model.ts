//Define un namespace ApiModel que contiene dos interfaces: ReqParams y ResponseParams.
export namespace ApiModel {
  export interface ReqParams { //Define la interfaz ReqParams que representa los parámetros de una solicitud HTTP.
    params?: any;
    url: string,
    data?: any,
    //Un objeto que contiene parámetros adicionales para la solicitud.
    //La URL de la solicitud.
    //Los datos que se envían en el cuerpo de la solicitud.
  }

  // Define la interfaz ResponseParams que representa la respuesta de una solicitud HTTP.
  export interface ResponseParams<T> {
    response: T
    //El objeto que contiene la respuesta de la solicitud, donde T es el tipo de datos que se espera recibir.
  }

}
