import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { AuthModel } from '../models/core/auth.model';
//Importa el decorador Injectable desde el módulo @angular/core. Importa la clase Socket desde la biblioteca ngx-socket-io.
//Importa el operador map desde la biblioteca rxjs. Importa el modelo AuthModel desde el módulo ../models/core/auth.model.

//Define un tipo Message que representa un mensaje de chat
export type Message = {
  id: number; //El ID del mensaje etc.
  userId: number;
  content: string;
  date: string;
  firstName: string;
  lastName: string;
}

//Define el servicio ChatService como un proveedor de servicios que se proporciona en el nivel de raíz de la aplicación.
@Injectable({
  providedIn: 'root'
})

//Define la clase ChatService.
export class ChatService {

  //Define el constructor del servicio que recibe una instancia de la clase Socket como parámetro.
  constructor(
    private readonly socket: Socket
  ) { }

  //Define un método que envía un evento de "typing" al servidor con el usuario que está escribiendo o false si no hay nadie escribiendo.
  sendTyping(msg: AuthModel.User | false) {
    this.socket.emit('typing', msg); //Emite el evento "typing" con el mensaje especificado.
  }

  //Define un método que devuelve un observable que emite los mensajes de chat recibidos del servidor
  getMessage() {
    console.log('mensajes') //Imprime un mensaje de depuración en la consola.
    console.log(this.socket.fromEvent<Message[]>('messages').pipe(map((data) => data))) //Imprime el resultado del observable en la consola.
    return this.socket.fromEvent<Message[]>('messages').pipe(map((data) => data)); //Devuelve el observable que emite los mensajes de chat.
  }

  //Define un método que devuelve un observable que emite el usuario que está escuchando o false si no hay nadie escuchando
  userListening() {
    return this.socket.fromEvent<AuthModel.User | false>('listening').pipe(map((data) => data)); //Devuelve el observable que emite el usuario que está escuchando.
  }

}
