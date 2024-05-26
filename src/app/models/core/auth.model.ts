//Define un namespace AuthModel que contiene tres interfaces: UserTokenData, User, y una constante userTokenData.
export namespace AuthModel {
  export interface UserTokenData { //Define la interfaz UserTokenData que representa los datos de un token de autenticación.
    tokenType: 'refresh' | 'token' | ''; //El tipo de token (refresh o token).
    iat: number; //La fecha de emisión del token (en segundos).
    exp: number; //La fecha de expiración del token (en segundos).
    user: User; //El objeto que contiene la información del usuario autenticado.
  }

  //Define la interfaz User que representa la información de un usuario
  export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    fecha_nacimiento:Date;
    descripcion:string;
    img?: string; //La URL de la imagen del usuario (opcional).
    role: 'admin' | 'user' | '';
    active: boolean;
    id_compatibilidad:number;//Un booleano que indica si el usuario está activo.
  }

  //Define una constante userTokenData que contiene los datos de un token de autenticación por defecto.
  export const userTokenData: UserTokenData = {
    tokenType: '', // El tipo de token (vacío).
    user: { // El objeto que contiene la información del usuario autenticado (con valores por defecto).
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      fecha_nacimiento:new Date(),
      descripcion:'',
      role: '',
      active: false,
      id_compatibilidad:0,
    },
    iat: 0, //La fecha de emisión del token (0).
    exp: 0 //La fecha de expiración del token (0).
  }
}
